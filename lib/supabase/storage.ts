import { supabase } from './client'; // Assuming your Supabase client

export const uploadProfileAvatar = async (userId: string, file: File): Promise<string | null> => {
  if (!userId || !file) {
    console.error('uploadProfileAvatar: userId and file are required');
    return null;
  }

  const fileExtension = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExtension}`;
  const filePath = `public/${userId}/${fileName}`; // Store in a user-specific public folder

  try {
    // Ensure the bucket is named 'avatars' or change as needed
    const { error: uploadError } = await supabase.storage
      .from('avatars') 
      .upload(filePath, file, { 
        cacheControl: '3600',
        upsert: true, // true to overwrite existing file with the same name, false to throw error
      });

    if (uploadError) {
      console.error('Error uploading avatar:', uploadError.message);
      throw uploadError;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    if (!urlData || !urlData.publicUrl) {
        console.error('Error getting public URL for avatar after upload.');
        throw new Error('Could not retrieve public URL for uploaded avatar.')
    }
    
    return urlData.publicUrl;

  } catch (error) {
    // console.error('An unexpected error occurred during avatar upload:', error);
    return null;
  }
}; 