/*
  # Update Security Policies

  1. Security Updates
    - Verify and update RLS policies for all tables
    - Add missing policies
    - Ensure proper authentication checks

  2. Changes
    - Enable RLS on all tables
    - Add comprehensive CRUD policies
    - Update existing policies with better security
*/

-- Verify RLS is enabled on all tables
DO $$ 
BEGIN
  -- Enable RLS on tables if not already enabled
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'profiles' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'products' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE IF EXISTS public.products ENABLE ROW LEVEL SECURITY;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'wishlists' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE IF EXISTS public.wishlists ENABLE ROW LEVEL SECURITY;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'reviews' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE IF EXISTS public.reviews ENABLE ROW LEVEL SECURITY;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'cart_items' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE IF EXISTS public.cart_items ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Safely drop and recreate policies
DO $$ 
BEGIN
  -- Profiles policies
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Profiles select policy') THEN
    DROP POLICY "Profiles select policy" ON public.profiles;
  END IF;
  CREATE POLICY "Profiles select policy" ON public.profiles
    FOR SELECT TO authenticated
    USING (auth.uid() = id);

  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Profiles insert policy') THEN
    DROP POLICY "Profiles insert policy" ON public.profiles;
  END IF;
  CREATE POLICY "Profiles insert policy" ON public.profiles
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = id);

  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Profiles update policy') THEN
    DROP POLICY "Profiles update policy" ON public.profiles;
  END IF;
  CREATE POLICY "Profiles update policy" ON public.profiles
    FOR UPDATE TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

  -- Products policies
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Products select policy') THEN
    DROP POLICY "Products select policy" ON public.products;
  END IF;
  CREATE POLICY "Products select policy" ON public.products
    FOR SELECT TO authenticated
    USING (true);

  -- Wishlists policies
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Wishlists select policy') THEN
    DROP POLICY "Wishlists select policy" ON public.wishlists;
  END IF;
  CREATE POLICY "Wishlists select policy" ON public.wishlists
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Wishlists insert policy') THEN
    DROP POLICY "Wishlists insert policy" ON public.wishlists;
  END IF;
  CREATE POLICY "Wishlists insert policy" ON public.wishlists
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Wishlists delete policy') THEN
    DROP POLICY "Wishlists delete policy" ON public.wishlists;
  END IF;
  CREATE POLICY "Wishlists delete policy" ON public.wishlists
    FOR DELETE TO authenticated
    USING (auth.uid() = user_id);

  -- Reviews policies
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Reviews select policy') THEN
    DROP POLICY "Reviews select policy" ON public.reviews;
  END IF;
  CREATE POLICY "Reviews select policy" ON public.reviews
    FOR SELECT TO authenticated
    USING (true);

  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Reviews insert policy') THEN
    DROP POLICY "Reviews insert policy" ON public.reviews;
  END IF;
  CREATE POLICY "Reviews insert policy" ON public.reviews
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Reviews update policy') THEN
    DROP POLICY "Reviews update policy" ON public.reviews;
  END IF;
  CREATE POLICY "Reviews update policy" ON public.reviews
    FOR UPDATE TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Reviews delete policy') THEN
    DROP POLICY "Reviews delete policy" ON public.reviews;
  END IF;
  CREATE POLICY "Reviews delete policy" ON public.reviews
    FOR DELETE TO authenticated
    USING (auth.uid() = user_id);

  -- Cart items policies
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Cart items select policy') THEN
    DROP POLICY "Cart items select policy" ON public.cart_items;
  END IF;
  CREATE POLICY "Cart items select policy" ON public.cart_items
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Cart items insert policy') THEN
    DROP POLICY "Cart items insert policy" ON public.cart_items;
  END IF;
  CREATE POLICY "Cart items insert policy" ON public.cart_items
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Cart items update policy') THEN
    DROP POLICY "Cart items update policy" ON public.cart_items;
  END IF;
  CREATE POLICY "Cart items update policy" ON public.cart_items
    FOR UPDATE TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Cart items delete policy') THEN
    DROP POLICY "Cart items delete policy" ON public.cart_items;
  END IF;
  CREATE POLICY "Cart items delete policy" ON public.cart_items
    FOR DELETE TO authenticated
    USING (auth.uid() = user_id);
END $$;