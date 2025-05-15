import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext'; 
import { updateUserProfile, UserProfile } from '@/lib/supabase/db'; 
import { uploadProfileAvatar } from '@/lib/supabase/storage';
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2, UserCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { format } from "date-fns";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; // Import query hooks

interface CountryName {
  common: string;
  official: string;
}

interface RestCountryNameOnly {
  name: CountryName;
}

// Fetcher function for countries
const fetchCountriesList = async (): Promise<{ code: string; name: string }[]> => {
  const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const result: RestCountryNameOnly[] = await response.json();
  return result.map(country => ({
    code: country.name.common, 
    name: country.name.common
  })).sort((a, b) => a.name.localeCompare(b.name));
};

interface EditProfileFormProps {
  userProfile: UserProfile | null;      // Prop for pre-fetched profile from parent (SettingsPage)
  isLoadingProfile: boolean;         // Prop for loading state from parent
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ userProfile: initialUserProfile, isLoadingProfile: parentIsLoadingProfile }) => {
  const { user } = useAuth(); 
  const { toast } = useToast();
  const queryClient = useQueryClient(); // For cache invalidation

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: '', 
    mobileNumber: '',
    username: '',
    bio: '',
    avatarUrl: '', 
  });
  const [dateInputType, setDateInputType] = useState<'text' | 'date'>('text');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null); 
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Fetch countries using useQuery
  const { data: countries, isLoading: isCountriesLoading, error: countriesError } = useQuery< { code: string; name: string }[], Error >({
    queryKey: ['countriesList'],
    queryFn: fetchCountriesList,
    staleTime: Infinity, // Countries list is very static, keep it fresh indefinitely
    gcTime: Infinity,    // Keep in cache indefinitely
  });

  // Handle countries fetch error
  useEffect(() => {
    if (countriesError) {
      console.error("Failed to fetch countries:", countriesError);
      toast({ title: "Error", description: "Failed to load countries list. " + countriesError.message, variant: "destructive" });
    }
  }, [countriesError, toast]);

  // Populate form data when initialUserProfile (from props) is available or changes
  useEffect(() => {
    if (!parentIsLoadingProfile && initialUserProfile) {
      setFormData({
        firstName: initialUserProfile.first_name || '',
        lastName: initialUserProfile.last_name || '',
        username: initialUserProfile.username || '',
        dateOfBirth: initialUserProfile.date_of_birth || '',
        country: initialUserProfile.country || '',
        mobileNumber: initialUserProfile.mobile_number || '',
        bio: initialUserProfile.bio || '',
        avatarUrl: initialUserProfile.avatar_url || '',
      });
      if (initialUserProfile.date_of_birth) {
        setDateInputType('date');
      }
    }
  }, [initialUserProfile, parentIsLoadingProfile]);

  // Mutation for updating profile
  const profileUpdateMutation = useMutation({
    mutationFn: async (profileUpdates: Partial<UserProfile>) => {
      if (!user?.id) throw new Error("User not authenticated for profile update.");
      let newAvatarUrlToUpdate = profileUpdates.avatar_url;
      if (avatarFile) {
        const uploadedUrl = await uploadProfileAvatar(user.id, avatarFile);
        if (uploadedUrl) {
          newAvatarUrlToUpdate = uploadedUrl;
        } else {
          throw new Error('Avatar upload failed during mutation.');
        }
      }
      // Ensure avatar_url is correctly set in the updates object for updateUserProfile
      const finalUpdates = { ...profileUpdates, avatar_url: newAvatarUrlToUpdate };
      return updateUserProfile(user.id, finalUpdates);
    },
    onSuccess: (data) => {
      // data from updateUserProfile is { data: updatedProfile, error }, so access data.data
      const updatedProfile = data?.data;
      if (updatedProfile) {
         setFormData({ // Update local form state from the successful mutation response
            firstName: updatedProfile.first_name || '',
            lastName: updatedProfile.last_name || '',
            username: updatedProfile.username || '',
            dateOfBirth: updatedProfile.date_of_birth || '',
            country: updatedProfile.country || '',
            mobileNumber: updatedProfile.mobile_number || '',
            bio: updatedProfile.bio || '',
            avatarUrl: updatedProfile.avatar_url || '',
        });
        setAvatarFile(null);
        setAvatarPreview(null);
      }
      toast({ title: "Success!", description: "Profile updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ['userProfile', user?.id] }); // Invalidate to refetch profile elsewhere
    },
    onError: (error: Error) => {
      console.error("Failed to update profile:", error);
      toast({ title: "Update Failed", description: error.message || "Could not update profile. Please try again.", variant: "destructive" });
    },
  });

  useEffect(() => {
    return () => {
      if (avatarPreview && avatarPreview.startsWith('blob:')) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (avatarPreview && avatarPreview.startsWith('blob:')) {
      URL.revokeObjectURL(avatarPreview); 
    }
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setAvatarFile(null);
      setAvatarPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      toast({ title: "Error", description: "User not authenticated.", variant: "destructive" });
      return;
    }
    
    const updates: Partial<UserProfile> = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      username: formData.username,
      date_of_birth: formData.dateOfBirth || null,
      country: formData.country,
      mobile_number: formData.mobileNumber || null,
      bio: formData.bio || null,
      avatar_url: formData.avatarUrl, // Initial avatar_url, mutation will handle new upload
    };

    // Clean undefined fields (optional, Supabase might handle it)
    Object.keys(updates).forEach(key => {
        const k = key as keyof Partial<UserProfile>;
        if (updates[k] === undefined) {
          delete updates[k];
        }
      });

    profileUpdateMutation.mutate(updates);
  };

  const displayAvatarSrc = avatarPreview || formData.avatarUrl;

  if (parentIsLoadingProfile) { // Show loading if parent is loading the profile
    return (
      <div className="p-6 space-y-6 rounded-lg bg-card shadow-sm text-center">
        <p>Loading profile form...</p>
      </div>
    );
  }
  // Note: No longer using isFormLoading state, relying on parentIsLoadingProfile for profile
  // and isCountriesLoading for countries. The submit button will handle combined loading states.

  return (
    <div className="p-6 space-y-6 rounded-lg bg-card shadow-sm">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="p-4 border border-border rounded-md space-y-4">
          <h3 className="text-lg font-medium leading-6 text-foreground">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-muted-foreground mb-1">First Name</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="block w-full rounded-md border border-border bg-input px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-muted-foreground mb-1">Last Name</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="block w-full rounded-md border border-border bg-input px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none" />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-muted-foreground mb-1">Username</label>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="block w-full rounded-md border border-border bg-input px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none" required />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-muted-foreground mb-1">Date of Birth</label>
              <input 
                type={dateInputType}
                id="dateOfBirth" 
                name="dateOfBirth" 
                value={formData.dateOfBirth} 
                onChange={handleChange} 
                onFocus={() => setDateInputType('date')}
                onBlur={() => {
                  if (!formData.dateOfBirth) {
                    setDateInputType('text');
                  }
                }}
                placeholder="Date of Birth"
                className="block w-full rounded-md border border-border bg-input px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none md:w-auto" />
            </div>
          </div>
        </div>

        <div className="p-4 border border-border rounded-md space-y-4">
          <h3 className="text-lg font-medium leading-6 text-foreground">Contact & Location</h3>
          <div className="space-y-4">
            <div className="md:w-1/2">
              <label htmlFor="country" className="block text-sm font-medium text-muted-foreground mb-1">Country</label>
              <select 
                id="country" 
                name="country" 
                value={formData.country} 
                onChange={handleChange} 
                required 
                disabled={isCountriesLoading || !countries} // Disable if loading or no countries data
                className="block w-full rounded-md border border-border bg-input px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none"
              >
                {isCountriesLoading ? (
                  <option value="" disabled>Loading countries...</option>
                ) : countriesError ? (
                  <option value="" disabled>Error loading countries</option>
                ) : (
                  <>
                    <option value="" disabled={formData.country !== ''}>Select Country</option>
                    {countries?.map(country => (
                      <option key={country.code} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
            <div className="md:w-1/2">
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-muted-foreground mb-1">Mobile Number</label>
              <input type="tel" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="block w-full rounded-md border border-border bg-input px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="p-4 border border-border rounded-md space-y-4">
          <h3 className="text-lg font-medium leading-6 text-foreground">Profile Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 items-start">
            <div className="md:col-span-2 space-y-4">
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-muted-foreground mb-1">Bio</label>
                <textarea 
                  id="bio" 
                  name="bio" 
                  rows={3} 
                  value={formData.bio} 
                  onChange={handleChange} 
                  className="block w-full md:w-4/5 rounded-md border border-border bg-input px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="avatar" className="block text-sm font-medium text-muted-foreground mb-1">Avatar</label>
                <input 
                  type="file" 
                  id="avatar" 
                  name="avatar" 
                  accept="image/*"
                  onChange={handleAvatarChange} 
                  className="block w-full md:w-4/5 text-sm text-muted-foreground file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start md:pl-2">
              <label className="block text-sm font-medium text-muted-foreground mb-1 text-center md:text-left">Preview</label>
              {displayAvatarSrc ? (
                <img src={displayAvatarSrc} alt="Avatar Preview" className="h-24 w-24 md:h-28 md:w-28 rounded-full object-cover border border-border shadow-sm" />
              ) : (
                <div className="h-24 w-24 md:h-28 md:w-28 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground text-xs shadow-sm">
                  No Image
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
            disabled={parentIsLoadingProfile || isCountriesLoading || profileUpdateMutation.isPending}
          >
            {profileUpdateMutation.isPending ? 'Saving...' : (parentIsLoadingProfile || isCountriesLoading ? 'Loading Data...' : 'Save Changes')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm; 