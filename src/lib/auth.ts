import { AuthError } from '@supabase/supabase-js';
import { supabase } from './supabase';

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  age: string;
  skinTone: string;
  height: string;
  weight: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const signUp = async (data: SignUpData): Promise<{ error: string | null }> => {
  try {
    // First attempt to sign up the user
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

    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          full_name: data.fullName,
          email: data.email,
          measurements: {
            height: parseInt(data.height),
            weight: parseInt(data.weight),
            age: parseInt(data.age)
          },
          skin_tone: data.skinTone,
        });

      if (profileError) throw profileError;
    }

    return { error: null };
  } catch (err) {
    console.error('Signup error:', err);
    if (err instanceof AuthError && err.message.includes('already registered')) {
      return { error: 'An account with this email already exists' };
    }
    return { 
      error: err instanceof AuthError 
        ? err.message 
        : 'An error occurred during signup'
    };
  }
};

export const login = async (data: LoginData): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw error;
    return { error: null };
  } catch (err) {
    console.error('Login error:', err);
    return { 
      error: err instanceof AuthError 
        ? 'Invalid email or password' 
        : 'An error occurred during login'
    };
  }
};