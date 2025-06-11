import { supabase } from './client'; // Assuming your Supabase client is exported from here
import { supabasePublic } from './public-client'
import { PostgrestError } from '@supabase/supabase-js';

export interface UserProfile {
  user_id: string;
  username?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  date_of_birth?: string | null; // Expected format: YYYY-MM-DD
  country?: string | null;
  mobile_number?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  email_address?: string | null; // Added based on typical User table needs
  created_at?: string | null;
  updated_at?: string | null;
  status?: string | null;
  // Add any other fields from your public."Users" table that you might need
}

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  if (!userId) {
    console.error('getUserProfile: userId is required');
    return null;
  }

  const { data, error } = await supabase
    .from('Users') 
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') { // "Row not found"
      console.log('No profile found for user:', userId, 'A new one can be created.');
      return null; 
    }
    console.error('Error fetching user profile:', error.message);
    return null;
  }
  return data as UserProfile;
};

// Placeholder for updating the profile, to be implemented when form submission is handled
export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>): Promise<{ data: UserProfile | null; error: PostgrestError | null }> => {
  if (!userId) {
    console.error('updateUserProfile: userId is required');
    return { data: null, error: { message: 'User ID is required', details: '', hint: '', code: '400' } as PostgrestError };
  }
  
  const { data, error } = await supabase
    .from('Users')
    .update({ ...updates, updated_at: new Date().toISOString() }) // Ensure updated_at is handled
    .eq('user_id', userId)
    .select() 
    .single();

  if (error) {
    console.error('Error updating user profile:', error.message);
  }
  
  return { data: data as UserProfile | null, error };
};

// Add this interface for wishlist entries
export interface WishlistEntry {
  id?: string;
  created_at?: string;
  full_name: string;
  email: string;
  occupation: string | null;
  favourite_games: string | null;
  additional_message: string | null;
}

// Add this function to create wishlist entries
export async function createWishlistEntry(entry: Omit<WishlistEntry, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('wishlist')
    .insert([entry])
    .select()
    .single();

  if (error) {
    console.error('Supabase error:', error);
    throw new Error(error.message);
  }

  return { data, error: null };
} 