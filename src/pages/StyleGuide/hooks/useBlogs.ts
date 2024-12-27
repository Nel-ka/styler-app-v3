import { useState, useEffect } from 'react';
import { Blog } from '../../../types';
import { supabase } from '../../../lib/supabase';

interface UseBlogsOptions {
  featured?: boolean;
  limit?: number;
}

export function useBlogs(options: UseBlogsOptions = {}) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        let query = supabase
          .from('blogs')
          .select('*')
          .order('published_at', { ascending: false });

        if (options.featured) {
          query = query.eq('featured', true);
        }

        if (options.limit) {
          query = query.limit(options.limit);
        }

        const { data, error: supabaseError } = await query;

        if (supabaseError) throw supabaseError;
        setBlogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [options.featured, options.limit]);

  return { blogs, loading, error };
}