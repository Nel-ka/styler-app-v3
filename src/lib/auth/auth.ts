import { AuthError } from '@supabase/supabase-js';
import { supabase } from '../supabase';
import { SignUpData, LoginData, AuthResponse } from './types';
import { validateSignUpData } from './validation';
import { createUserProfile } from './profiles';

export const signUp = async (data: SignUpData): Promise<AuthResponse> => {
  try {
    // Validate input data
    const validationError = validateSignUpData(data);
    if (validationError) {
      return { error: validationError };
    }

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', data.email)
      .single();

    if (existingUser) {
      return { error: 'An account with this email already exists' };
    }

    // Create auth user
    const { error: signUpError, data: authData } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName
        }
      }
    });

    if (signUpError) throw signUpError;
    if (!authData.user) throw new Error('No user data returned');

    // Create user profile
    const { error: profileError } = await createUserProfile(authData.user.id, data);
    if (profileError) throw profileError;

    return { error: null, success: true };
  } catch (err) {
    console.error('Signup error:', err);
    if (err instanceof AuthError && err.message.includes('already registered')) {
      return { error: 'An account with this email already exists' };
    }
    return { 
      error: err instanceof Error ? err.message : 'An error occurred during signup'
    };
  }
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) throw error;
    return { error: null, success: true };
  } catch (err) {
    console.error('Login error:', err);
    return { 
      error: err instanceof AuthError 
        ? 'Invalid email or password' 
        : 'An error occurred during login'
    };
  }
};