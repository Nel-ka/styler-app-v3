import { type PostgrestError } from '@supabase/postgrest-js';

export function handleSupabaseError(error: unknown): string {
  // Handle Supabase database errors
  if (typeof error === 'object' && error !== null && 'code' in error && 'message' in error) {
    const pgError = error as PostgrestError;
    return pgError.message;
  }
  
  // Handle standard errors
  if (error instanceof Error) {
    return error.message;
  }
  
  // Fallback error message
  return 'An unexpected error occurred';
}