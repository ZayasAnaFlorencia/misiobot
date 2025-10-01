-- Seed sample products for Misiobot B2B catalog
INSERT INTO public.products (
  category_id,
  name,
  slug,
  description,
  short_description,
  price,
  compare_at_price,
  sku,
  stock_quantity,
  is_featured,
  is_active
)
SELECT
  c.id,
  'Laptop HP ProBook 450 G9',
  'laptop-hp-probook-450-g9',
  'Laptop empresarial con procesador Intel Core i5, 8GB RAM, 256GB SSD. Ideal para trabajo profesional y productividad.',
  'Laptop empresarial Intel Core i5, 8GB RAM',
  899.99,
  1099.99,
  'LAP-HP-001',
  15,
  true,
  true
FROM public.categories c WHERE c.slug = 'electronica'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  category_id,
  name,
  slug,
  description,
  short_description,
  price,
  sku,
  stock_quantity,
  is_featured,
  is_active
)
SELECT
  c.id,
  'Silla Ergonómica Oficina',
  'silla-ergonomica-oficina',
  'Silla ergonómica con soporte lumbar ajustable, reposabrazos y base giratoria. Perfecta para largas jornadas de trabajo.',
  'Silla ergonómica con soporte lumbar',
  249.99,
  'SIL-ERG-001',
  30,
  true,
  true
FROM public.categories c WHERE c.slug = 'oficina'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  category_id,
  name,
  slug,
  description,
  short_description,
  price,
  sku,
  stock_quantity,
  is_active
)
SELECT
  c.id,
  'Taladro Inalámbrico Bosch',
  'taladro-inalambrico-bosch',
  'Taladro inalámbrico profesional 18V con batería de litio, 2 velocidades y maletín de transporte.',
  'Taladro inalámbrico 18V profesional',
  179.99,
  'HER-TAL-001',
  20,
  true
FROM public.categories c WHERE c.slug = 'herramientas'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  category_id,
  name,
  slug,
  description,
  short_description,
  price,
  sku,
  stock_quantity,
  is_active
)
SELECT
  c.id,
  'Kit Limpieza Industrial',
  'kit-limpieza-industrial',
  'Kit completo de limpieza industrial incluye detergentes, desinfectantes y accesorios de limpieza profesional.',
  'Kit completo de limpieza profesional',
  89.99,
  'LIM-KIT-001',
  50,
  true
FROM public.categories c WHERE c.slug = 'limpieza'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  category_id,
  name,
  slug,
  description,
  short_description,
  price,
  sku,
  stock_quantity,
  is_featured,
  is_active
)
SELECT
  c.id,
  'Casco de Seguridad Industrial',
  'casco-seguridad-industrial',
  'Casco de seguridad certificado con ajuste de suspensión y ventilación. Cumple con normas internacionales.',
  'Casco de seguridad certificado',
  24.99,
  'SEG-CAS-001',
  100,
  false,
  true
FROM public.categories c WHERE c.slug = 'seguridad'
ON CONFLICT (slug) DO NOTHING;
