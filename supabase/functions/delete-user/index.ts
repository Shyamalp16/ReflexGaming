import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'

console.log('[delete-user] Function init');

async function deleteUserAuthData(supabaseAdmin: SupabaseClient, userId: string): Promise<void> {
  console.log(`[delete-user] Attempting to delete auth data for user: ${userId}`);
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
  if (error) {
    console.error(`[delete-user] Error deleting user auth data for ${userId}:`, error);
    throw new Error(`Failed to delete user authentication data: ${error.message}`);
  }
  console.log(`[delete-user] Successfully deleted auth data for user: ${userId}`);
}

async function deleteUserProfileData(supabaseAdmin: SupabaseClient, userId: string): Promise<void> {
  console.log(`[delete-user] Attempting to delete profile data for user: ${userId} from public.Users`);
  const { error } = await supabaseAdmin.from('Users').delete().eq('user_id', userId);
  if (error) {
    console.error(`[delete-user] Error deleting user profile data for ${userId} from public.Users:`, error);
  } else {
    console.log(`[delete-user] Successfully deleted profile data for user: ${userId} from public.Users (if exists).`);
  }
}

async function deleteUserStorageData(supabaseAdmin: SupabaseClient, userId: string): Promise<void> {
  const avatarBucket = 'avatars'; 
  const userFolderPath = `public/${userId}`;
  console.log(`[delete-user] Attempting to list files in storage for user: ${userId} in bucket '${avatarBucket}' at path '${userFolderPath}'`);

  const { data: files, error: listError } = await supabaseAdmin.storage
    .from(avatarBucket)
    .list(userFolderPath);

  if (listError) {
    console.error(`[delete-user] Error listing files for user ${userId} in bucket '${avatarBucket}':`, listError);
    return;
  }

  if (files && files.length > 0) {
    const filePathsToRemove = files.map((file: { name: string }) => `${userFolderPath}/${file.name}`);
    console.log(`[delete-user] Attempting to remove ${filePathsToRemove.length} file(s) from storage for user ${userId}:`, filePathsToRemove);
    const { error: removeError } = await supabaseAdmin.storage
      .from(avatarBucket)
      .remove(filePathsToRemove);

    if (removeError) {
      console.error(`[delete-user] Error removing files from storage for user ${userId}:`, removeError);
    } else {
      console.log(`[delete-user] Successfully removed files from storage for user ${userId}.`);
    }
  } else {
    console.log(`[delete-user] No files found in storage for user ${userId} at path '${userFolderPath}'.`);
  }
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' } });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.warn('[delete-user] Missing Authorization header');
      return new Response(JSON.stringify({ error: 'Missing Authorization header' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    // Create a Supabase client using the provided JWT to get the authenticated user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      console.error('[delete-user] JWT validation failed or no user found:', userError?.message);
      return new Response(JSON.stringify({ error: 'Authentication failed: ' + (userError?.message || 'Invalid token') }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    // Ensure the authenticated user is the one being deleted.
    const userIdToDelete = user.id;
    console.log(`[delete-user] Authenticated user ${userIdToDelete} initiated self-deletion request.`);

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // --- Deletion Steps --- 
    //Delete user from auth.users
    await deleteUserAuthData(supabaseAdmin, userIdToDelete);

    //Delete user data from public.Users table
    await deleteUserProfileData(supabaseAdmin, userIdToDelete);

    // Delete user files from storage
    await deleteUserStorageData(supabaseAdmin, userIdToDelete);

    // Add other cleanup steps here if necessary when we have more tables

    console.log(`[delete-user] All deletion steps completed for user: ${userIdToDelete}.`);
    return new Response(JSON.stringify({ message: 'User account and associated data deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, // Adjust CORS for your needs
    });

  } catch (error: unknown) { 
    let errorMessage = 'An unexpected error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('[delete-user] Critical function error:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete user: ' + errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}); 