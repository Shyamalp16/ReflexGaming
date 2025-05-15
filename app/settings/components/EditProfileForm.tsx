import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext'; 
import { updateUserProfile, UserProfile } from '@/lib/supabase/db'; 
import { uploadProfileAvatar } from '@/lib/supabase/storage';
import { CalendarIcon, Loader2, UserCircle, CropIcon, MinusIcon, PlusIcon, RotateCcwIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Imports for cropping
import Cropper, { Area } from 'react-easy-crop';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider"; // For zoom control
import getCroppedImg from '@/lib/imageUtils';

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

  // State for image cropping
  const [imageToCropUri, setImageToCropUri] = useState<string | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0); // Optional: for rotation control
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropping, setIsCropping] = useState(false);

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
      if (initialUserProfile.avatar_url) setAvatarPreview(initialUserProfile.avatar_url);
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
      const updatedProfileResponse = data?.data;
      if (updatedProfileResponse) {
         setFormData({ // Update local form state from the successful mutation response
            firstName: updatedProfileResponse.first_name || '',
            lastName: updatedProfileResponse.last_name || '',
            username: updatedProfileResponse.username || '',
            dateOfBirth: updatedProfileResponse.date_of_birth || '',
            country: updatedProfileResponse.country || '',
            mobileNumber: updatedProfileResponse.mobile_number || '',
            bio: updatedProfileResponse.bio || '',
            avatarUrl: updatedProfileResponse.avatar_url || '',
        });
        setAvatarFile(null);
        // setAvatarPreview(null); // Keep current avatarPreview which should be the new image (blob or final URL)

        // Optimistically update the query cache for Navbar and other components
        queryClient.setQueryData(['userProfile', user?.id], (oldData: UserProfile | null | undefined) => {
          // If there's old data, merge with new, otherwise use new response directly
          const baseData = oldData || {}; 
          return {
            ...baseData,
            ...updatedProfileResponse, // Spread the full response to update all changed fields
          };
        });
      }
      toast({ title: "Success!", description: "Profile updated successfully!" });
      // Still invalidate to ensure data is refetched from the server for ultimate consistency
      queryClient.invalidateQueries({ queryKey: ['userProfile', user?.id] }); 
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
      if (imageToCropUri) {
        URL.revokeObjectURL(imageToCropUri);
      }
    };
  }, [avatarPreview, imageToCropUri]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (imageToCropUri) URL.revokeObjectURL(imageToCropUri); // Revoke previous if any
      setImageToCropUri(URL.createObjectURL(file));
      setCropModalOpen(true);
      // Clear the input field value so the same file can be selected again if modal is cancelled
      e.target.value = "";
    } else {
      // This case might not be hit if a file is always selected, but good for safety
      if (imageToCropUri) URL.revokeObjectURL(imageToCropUri);
      setImageToCropUri(null);
    }
  };

  const onCropComplete = useCallback((_croppedArea: Area, currentCroppedAreaPixels: Area) => {
    setCroppedAreaPixels(currentCroppedAreaPixels);
  }, []);

  const handleCropConfirm = async () => {
    if (!imageToCropUri || !croppedAreaPixels) {
      toast({ title: "Error", description: "Could not crop image. Please try again.", variant: "destructive" });
      return;
    }
    setIsCropping(true);
    try {
      const croppedImageResult = await getCroppedImg(imageToCropUri, croppedAreaPixels, rotation);
      if (croppedImageResult) {
        if (avatarPreview && avatarPreview.startsWith('blob:')) {
          URL.revokeObjectURL(avatarPreview); // Revoke old blob preview
        }
        setAvatarFile(croppedImageResult.file);
        setAvatarPreview(croppedImageResult.url); // This is a new blob URL
        setFormData(prev => ({ ...prev, avatarUrl: croppedImageResult.url })); // Update formData for immediate display if needed, though avatarPreview is primary for display
      }
    } catch (e: any) { // Use any for error type from catch
      console.error("Cropping failed", e);
      toast({ title: "Cropping Failed", description: e.message || "Could not process the image.", variant: "destructive" });
    } finally {
      setIsCropping(false);
      setCropModalOpen(false);
      if (imageToCropUri) URL.revokeObjectURL(imageToCropUri); // Clean up the source image URI
      setImageToCropUri(null);
      setZoom(1); // Reset zoom and crop for next time
      setCrop({x:0, y:0});
      setRotation(0);
    }
  };

  const handleModalClose = (isOpen: boolean) => {
    if (!isOpen && imageToCropUri && !isCropping) { // If modal is closed without confirming crop
        URL.revokeObjectURL(imageToCropUri);
        setImageToCropUri(null);
        setZoom(1);
        setCrop({x:0, y:0});
        setRotation(0);
    }
    setCropModalOpen(isOpen);
  }

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

  // Display avatar source prioritizes new blob preview, then existing (potentially uploaded) avatarUrl
  const displayAvatarSrc = avatarPreview || formData.avatarUrl || initialUserProfile?.avatar_url;

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
      {/* Cropping Modal */}
      {imageToCropUri && (
        <Dialog open={cropModalOpen} onOpenChange={handleModalClose}>
          <DialogContent className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-0">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle>Crop Your Avatar</DialogTitle>
            </DialogHeader>
            <div className="relative h-[125px] sm:h-[150px] md:h-[175px] bg-muted/50 overflow-hidden">
              <Cropper
                image={imageToCropUri}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1} // For square/circular crop
                cropShape="round" // For circular crop shape hint
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onRotationChange={setRotation} // If rotation control is added
                onCropComplete={onCropComplete}
                showGrid={false}
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="zoom" className="text-sm font-medium">Zoom</label>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={() => setZoom(Math.max(1, zoom - 0.1))} disabled={zoom <= 1}><MinusIcon className="h-4 w-4"/></Button>
                  <Slider id="zoom" min={1} max={3} step={0.01} value={[zoom]} onValueChange={(val) => setZoom(val[0])} />
                  <Button variant="outline" size="icon" onClick={() => setZoom(Math.min(3, zoom + 0.1))} disabled={zoom >= 3}><PlusIcon className="h-4 w-4"/></Button>
                </div>
              </div>
              <div className="space-y-2">
                 <label htmlFor="rotation" className="text-sm font-medium">Rotate</label>
                 <div className="flex items-center space-x-2">
                   <Button variant="outline" size="icon" onClick={() => setRotation(rotation - 90)}><RotateCcwIcon className="h-4 w-4 transform scale-x-[-1]"/></Button>
                   <Slider id="rotation" min={0} max={360} step={1} value={[rotation]} onValueChange={(val) => setRotation(val[0])} />
                   <Button variant="outline" size="icon" onClick={() => setRotation(rotation + 90)}><RotateCcwIcon className="h-4 w-4"/></Button>
                 </div>
              </div>
            </div>
            <DialogFooter className="p-6 pt-0">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleCropConfirm} disabled={isCropping}>
                {isCropping ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cropping...</> : "Confirm Crop"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

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
                 <p className="mt-1 text-xs text-muted-foreground">Select an image to crop and set as your avatar.</p>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start md:pl-2">
              <label className="block text-sm font-medium text-muted-foreground mb-1 text-center md:text-left">Preview</label>
              {displayAvatarSrc ? (
                <img src={displayAvatarSrc} alt="Avatar Preview" className="h-24 w-24 md:h-28 md:w-28 rounded-full object-cover border border-border shadow-sm" />
              ) : (
                <div className="h-24 w-24 md:h-28 md:w-28 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground text-xs shadow-sm">
                  <UserCircle className="w-12 h-12 text-muted-foreground/50" />
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
            {profileUpdateMutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : (parentIsLoadingProfile || isCountriesLoading ? 'Loading Data...' : 'Save Changes')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm; 