/*
  # Add blogs table and featured columns

  1. New Tables
    - `blogs` table with basic blog post structure
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `excerpt` (text)
      - `image` (text)
      - `author` (jsonb)
      - `published_at` (timestamptz)
      - `featured` (boolean)

  2. Changes
    - Add `featured` column to existing `products` table
    - Enable RLS on `blogs` table
    - Add policies for blog access
*/

-- Create blogs table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    image TEXT,
    author JSONB NOT NULL,
    published_at TIMESTAMPTZ DEFAULT now(),
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add featured column to products if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'featured'
  ) THEN
    ALTER TABLE products ADD COLUMN featured BOOLEAN DEFAULT false;
  END IF;
END $$;

-- Enable RLS on blogs table
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Create policies for blogs
CREATE POLICY "Anyone can view blogs"
  ON public.blogs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create blogs"
  ON public.blogs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own blogs"
  ON public.blogs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = (author->>'id')::uuid)
  WITH CHECK (auth.uid() = (author->>'id')::uuid);

CREATE POLICY "Users can delete their own blogs"
  ON public.blogs
  FOR DELETE
  TO authenticated
  USING (auth.uid() = (author->>'id')::uuid);