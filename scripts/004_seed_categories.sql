-- Seed initial categories for Misiobot B2B catalog
INSERT INTO public.categories (name, slug, description, display_order) VALUES
  ('Electrónica', 'electronica', 'Productos electrónicos y tecnología', 1),
  ('Oficina', 'oficina', 'Suministros y equipos de oficina', 2),
  ('Herramientas', 'herramientas', 'Herramientas y equipos industriales', 3),
  ('Limpieza', 'limpieza', 'Productos de limpieza y mantenimiento', 4),
  ('Seguridad', 'seguridad', 'Equipos de seguridad industrial', 5)
ON CONFLICT (slug) DO NOTHING;
