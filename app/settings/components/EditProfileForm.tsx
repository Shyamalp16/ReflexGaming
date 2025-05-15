import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext'; 
import { getUserProfile, updateUserProfile, UserProfile } from '@/lib/supabase/db'; 
import { uploadProfileAvatar } from '@/lib/supabase/storage'; // Added for avatar uploads
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2, UserCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // Corrected import path
import { z } from "zod";
import { format } from "date-fns";

interface CountryName {
  common: string;
  official: string;
}

interface RestCountryNameOnly {
  name: CountryName;
}

interface EditProfileFormProps {
  // Add props if needed, e.g., initial data
}

const EditProfileForm: React.FC<EditProfileFormProps> = () => {
  const { user } = useAuth(); 
  const { toast } = useToast(); // Initialize toast function
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
  const [avatarFile, setAvatarFile] = useState<File | null>(null); // State for the actual avatar file
  const [countries, setCountries] = useState<{ code: string; name: string }[]>([]);
  const [isCountriesLoading, setIsCountriesLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(true); 
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission loading

  useEffect(() => {
    const loadUserProfile = async () => {
      if (user?.id) {
        setIsProfileLoading(true);
        try {
          const profileData = await getUserProfile(user.id);
          if (profileData) {
            setFormData({
              firstName: profileData.first_name || '',
              lastName: profileData.last_name || '',
              username: profileData.username || '',
              dateOfBirth: profileData.date_of_birth || '',
              country: profileData.country || '',
              mobileNumber: profileData.mobile_number || '',
              bio: profileData.bio || '',
              avatarUrl: profileData.avatar_url || '',
            });
            if (profileData.date_of_birth) {
              setDateInputType('date');
            }
          }
        } catch (error) {
          console.error("Failed to load user profile:", error);
          toast({ title: "Error", description: "Failed to load profile.", variant: "destructive" });
        } finally {
          setIsProfileLoading(false);
        }
      } else {
        setIsProfileLoading(false);
      }
    };
    loadUserProfile();
  }, [user, toast]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsCountriesLoading(true);
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result: RestCountryNameOnly[] = await response.json();
        const loadedCountries = result.map(country => ({
          code: country.name.common, 
          name: country.name.common
        })).sort((a, b) => a.name.localeCompare(b.name)); 
        setCountries(loadedCountries);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
        toast({ title: "Error", description: "Failed to load countries list.", variant: "destructive" });
      } finally {
        setIsCountriesLoading(false);
      }
    };
    fetchCountries();
  }, [toast]);

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
      setAvatarFile(file); // Store the file object
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
    setIsSubmitting(true);

    let newAvatarUrl = formData.avatarUrl; // Keep existing if no new upload

    try {
      if (avatarFile) {
        const uploadedUrl = await uploadProfileAvatar(user.id, avatarFile);
        if (uploadedUrl) {
          newAvatarUrl = uploadedUrl;
        } else {
          throw new Error('Avatar upload failed.');
        }
      }

      const profileUpdates: Partial<UserProfile> = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        username: formData.username,
        date_of_birth: formData.dateOfBirth || null, // Ensure empty string becomes null
        country: formData.country,
        mobile_number: formData.mobileNumber || null,
        bio: formData.bio || null,
        avatar_url: newAvatarUrl, 
      };
      
      Object.keys(profileUpdates).forEach(key => {
        const k = key as keyof Partial<UserProfile>;
        if (profileUpdates[k] === undefined) {
          delete profileUpdates[k];
        }
      });

      const { data: updatedProfile, error: updateError } = await updateUserProfile(user.id, profileUpdates);

      if (updateError) {
        throw updateError;
      }

      if (updatedProfile) {
        setFormData({
            firstName: updatedProfile.first_name || '',
            lastName: updatedProfile.last_name || '',
            username: updatedProfile.username || '',
            dateOfBirth: updatedProfile.date_of_birth || '',
            country: updatedProfile.country || '',
            mobileNumber: updatedProfile.mobile_number || '',
            bio: updatedProfile.bio || '',
            avatarUrl: updatedProfile.avatar_url || '',
        });
        setAvatarFile(null); // Clear the selected file
        setAvatarPreview(null); // Clear the preview for the uploaded file
        toast({ title: "Success!", description: "Profile updated successfully!" });
      }

    } catch (error: any) {
      console.error("Failed to update profile:", error);
      toast({ title: "Update Failed", description: error.message || "Could not update profile. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayAvatarSrc = avatarPreview || formData.avatarUrl;

  if (isProfileLoading) {
    return (
      <div className="p-6 space-y-6 rounded-lg bg-card shadow-sm text-center">
        <p>Loading profile...</p>
      </div>
    );
  }

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
                disabled={isCountriesLoading}
                className="block w-full rounded-md border border-border bg-input px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none"
              >
                {isCountriesLoading ? (
                  <option value="" disabled>Loading countries...</option>
                ) : (
                  <>
                    <option value="" disabled={formData.country !== ''}>Select Country</option>
                    {countries.map(country => (
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
            disabled={isProfileLoading || isCountriesLoading || isSubmitting}
          >
            {isSubmitting ? 'Saving...' : (isProfileLoading ? 'Loading...' : 'Save Changes')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm; 