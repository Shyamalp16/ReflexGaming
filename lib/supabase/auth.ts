import { supabase } from "./client";
import { type SignUpWithPasswordCredentials, type SignInWithPasswordCredentials } from "@supabase/supabase-js";

export async function signUpNewUser(credentials: SignUpWithPasswordCredentials & { email?: string, password?: string }) {
    const signUpPayload = {
        email: credentials.email!,
        password: credentials.password!,
        options: {
            ...(credentials.options || {}),
            emailRedirectTo: 'https://reflexgaming.vercel.app/auth/confirmed',
        }
    };

    const { data, error } = await supabase.auth.signUp(signUpPayload);
    return { data, error };
}

export async function signInUser(credentials: SignInWithPasswordCredentials){
    const {data, error} = await supabase.auth.signInWithPassword(credentials)
    return {data, error}
}
