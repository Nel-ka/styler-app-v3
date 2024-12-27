import { supabase } from '../lib/supabase-admin';

export async function testDatabaseConnection(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id')
      .limit(1);

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: 'Database connection successful',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Database connection failed',
    };
  }
}