import { useState, useEffect } from 'react';
import { Blog } from '../../../types';
import { supabase } from '../../../lib/supabase';

export function useBlog(id: string | undefined) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Blog ID is required');
      setLoading(false);
      return;
    }

    async function fetchBlog() {
      try {
        const { data, error: supabaseError } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', id)
          .single();

        if (supabaseError) throw supabaseError;
        setBlog(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog post');
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  return { blog, loading, error };
}