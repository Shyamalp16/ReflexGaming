-- Supabase Trigger and Function to create a public user profile on new auth user sign up.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public -- Important for security and to find the public."Users" table
AS $$
DECLARE
  meta_full_name TEXT;
  derived_first_name TEXT;
  derived_last_name TEXT;
  space_position INT;
BEGIN
  -- Extract full_name from metadata if available
  meta_full_name := NEW.raw_user_meta_data->>'full_name';

  -- Split full_name into first_name and last_name
  IF meta_full_name IS NOT NULL AND meta_full_name <> '' THEN
    space_position := strpos(meta_full_name, ' ');
    IF space_position > 0 THEN
      derived_first_name := substr(meta_full_name, 1, space_position - 1);
      derived_last_name := substr(meta_full_name, space_position + 1);
      --  cases where last_name might be empty if there are trailing/multiple spaces
      IF derived_last_name = '' THEN
        derived_last_name := NULL;
      END IF;
    ELSE
      derived_first_name := meta_full_name; -- If no space, all is first_name
      derived_last_name := NULL;
    END IF;
  ELSE
    derived_first_name := NULL;
    derived_last_name := NULL;
  END IF;

  INSERT INTO public."Users" (user_id, email_address, username, first_name, last_name, created_at)
  VALUES (
    NEW.id,  
    NEW.email,
    NEW.raw_user_meta_data->>'username',
    derived_first_name,
    derived_last_name,
    NEW.created_at
  );
  RETURN NEW;
END;
$$;

-- This trigger will fire after each new user is successfully created in the authentication system.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function and Trigger to update public.Users.email_verified_at when auth.users.email_confirmed_at is set

CREATE OR REPLACE FUNCTION public.handle_user_email_verification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Check if the email_confirmed_at was NULL and is now NOT NULL
  IF OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL THEN
    UPDATE public."Users"
    SET email_verified_at = NEW.email_confirmed_at
    WHERE user_id = NEW.id; -- Match based on the user_id
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_email_verified ON auth.users;
CREATE TRIGGER on_auth_user_email_verified
  AFTER UPDATE OF email_confirmed_at ON auth.users
  FOR EACH ROW
  WHEN (OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL) -- Condition to run only on first verification
  EXECUTE FUNCTION public.handle_user_email_verification();

CREATE OR REPLACE FUNCTION public.handle_user_login()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Check if last_sign_in_at has actually changed and is not NULL
  IF NEW.last_sign_in_at IS NOT NULL AND NEW.last_sign_in_at IS DISTINCT FROM OLD.last_sign_in_at THEN
    UPDATE public."Users"
    SET last_login_at = NEW.last_sign_in_at
    WHERE user_id = NEW.id; -- Match based on the user_id
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_login ON auth.users;
CREATE TRIGGER on_auth_user_login
  AFTER UPDATE OF last_sign_in_at ON auth.users
  FOR EACH ROW
  WHEN (NEW.last_sign_in_at IS NOT NULL AND NEW.last_sign_in_at IS DISTINCT FROM OLD.last_sign_in_at)
  EXECUTE FUNCTION public.handle_user_login();