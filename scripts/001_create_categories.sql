-- Create categories table for product organization
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Allow public read access to categories (B2B catalog is public)
CREATE POLICY "categories_public_read"
  ON public.categories FOR SELECT
  USING (true);

-- Only authenticated users can insert/update/delete (for admin panel)
CREATE POLICY "categories_admin_insert"
  ON public.categories FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "categories_admin_update"
  ON public.categories FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "categories_admin_delete"
  ON public.categories FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON public.categories(display_order);
