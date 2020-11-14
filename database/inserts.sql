/*
 * * INSERT BRANDS
 */
INSERT INTO public.brand (id, created_at, updated_at, deleted_at, "name", "imageUrl") VALUES('fa872165-b9be-4e57-be18-aba604bc5a37', now(), now(), null, 'Kvix', 'src/product/uploads/0f9169db-cecd-4360-90ae-6b1d632f12f7.png');
INSERT INTO public.brand (id, created_at, updated_at, deleted_at, "name", "imageUrl") VALUES('c3ecb0c5-04f6-44c6-977e-2f3d16dfa1af', now(), now(), null, 'Prada', 'src/product/uploads/0f9169db-cecd-4360-90ae-6b1d632f12f7.png');
INSERT INTO public.brand (id, created_at, updated_at, deleted_at, "name", "imageUrl") VALUES('da0d5cc9-fa3b-4cb5-af67-997f09a7410f', now(), now(), null, 'Fendi', 'src/product/uploads/0f9169db-cecd-4360-90ae-6b1d632f12f7.png');
INSERT INTO public.brand (id, created_at, updated_at, deleted_at, "name", "imageUrl") VALUES('8cdd63ee-646b-4b17-9581-c98c4fe3f143', now(), now(), null, 'Louis Vuitton', 'src/product/uploads/0f9169db-cecd-4360-90ae-6b1d632f12f7.png');

/*
 * * INSERT CATEGORIES
 */
INSERT INTO public.category (id, created_at, updated_at, deleted_at, "name", "imageUrl") VALUES('269372cf-33ea-49b1-a28b-4badbeb64c64', now(), now(), null, 'Mochilas', 'src/product/uploads/0f9169db-cecd-4360-90ae-6b1d632f12f7.png');
INSERT INTO public.category (id, created_at, updated_at, deleted_at, "name", "imageUrl") VALUES('994f24da-50b5-4129-9610-fab733f6b833', now(), now(), null, 'Acessórios', 'src/product/uploads/0f9169db-cecd-4360-90ae-6b1d632f12f7.png');
INSERT INTO public.category (id, created_at, updated_at, deleted_at, "name", "imageUrl") VALUES('88362ac2-e4ba-412b-89f3-91d0de98a961', now(), now(), null, 'Pulseiras', 'src/product/uploads/0f9169db-cecd-4360-90ae-6b1d632f12f7.png');
INSERT INTO public.category (id, created_at, updated_at, deleted_at, "name", "imageUrl") VALUES('4992a3f5-a414-44e6-9ff0-abedbd286453', now(), now(), null, 'Bolsas', 'src/product/uploads/0f9169db-cecd-4360-90ae-6b1d632f12f7.png');


/*
 * * INSERT PRODUCTS
 */
INSERT INTO public.product (id, created_at, updated_at, deleted_at, "name", description, price, brand_id, category_id) VALUES('be844506-9839-4c3a-8be6-3f6d5f72cd19', now(), now(), null, 'Mochila olho grego', 'Linda mochila olho grego', 35.90, 'fa872165-b9be-4e57-be18-aba604bc5a37', '269372cf-33ea-49b1-a28b-4badbeb64c64');
INSERT INTO public.product (id, created_at, updated_at, deleted_at, "name", description, price, brand_id, category_id) VALUES('b5ac10ee-3b21-45e2-80ef-9188089b883b', now(), now(), null, 'Mochila de coquinho', 'Mochila coquinho é demais',  35.90, 'fa872165-b9be-4e57-be18-aba604bc5a37', '269372cf-33ea-49b1-a28b-4badbeb64c64');
INSERT INTO public.product (id, created_at, updated_at, deleted_at, "name", description, price, brand_id, category_id) VALUES('0b92c1e2-a242-411f-92d4-2f7c8cddfe92', now(), now(), null, 'Mochila colorida', 'Bem colorida para você que gosta de cor', 35.90, 'fa872165-b9be-4e57-be18-aba604bc5a37', '269372cf-33ea-49b1-a28b-4badbeb64c64');
INSERT INTO public.product (id, created_at, updated_at, deleted_at, "name", description, price, brand_id, category_id) VALUES('79f73967-89da-4150-8d1d-ac3279e20a64', now(), now(), null, 'Scrunchie Coqueiro', 'Você vai arrasar com uma dessas', 5.00, 'fa872165-b9be-4e57-be18-aba604bc5a37', '994f24da-50b5-4129-9610-fab733f6b833');
INSERT INTO public.product (id, created_at, updated_at, deleted_at, "name", description, price, brand_id, category_id) VALUES('594a9776-b336-41ae-a09e-eedcd769e50f', now(), now(), null, 'Scrunchie Olho grego', 'Você vai arrasar com uma dessas', 5.00, 'fa872165-b9be-4e57-be18-aba604bc5a37', '994f24da-50b5-4129-9610-fab733f6b833');
INSERT INTO public.product (id, created_at, updated_at, deleted_at, "name", description, price, brand_id, category_id) VALUES('68c1fbeb-8969-490c-bf2f-e34e793698ac', now(), now(), null,'Mochilinha Olho de gato','Linda mochila', 35.9,'fa872165-b9be-4e57-be18-aba604bc5a37','269372cf-33ea-49b1-a28b-4badbeb64c64')


/*
 * * INSERT PRODUCTS IMAGES
 */
INSERT INTO public.product_images (id, created_at, updated_at, deleted_at, filename, mimetype, "encoding", "path", product_id) VALUES('6a078035-96eb-4254-99e6-ff3b6e5c31ae', now(), now(), null, '94aaf4a2-c825-4cec-87c1-36366c2b29cb.png', 'image/png', '7bit', 'src/product/uploads/94aaf4a2-c825-4cec-87c1-36366c2b29cb.png', 'be844506-9839-4c3a-8be6-3f6d5f72cd19');
INSERT INTO public.product_images (id, created_at, updated_at, deleted_at, filename, mimetype, "encoding", "path", product_id) VALUES('5bc54bbb-4678-42d3-b9fa-25863efaa2a7', now(), now(), null, '94aaf4a2-c825-4cec-87c1-36366c2b29cb.png', 'image/png', '7bit', 'src/product/uploads/94aaf4a2-c825-4cec-87c1-36366c2b29cb.png', 'b5ac10ee-3b21-45e2-80ef-9188089b883b');
INSERT INTO public.product_images (id, created_at, updated_at, deleted_at, filename, mimetype, "encoding", "path", product_id) VALUES('715fc93a-244c-4694-a10b-f5f7381f6043', now(), now(), null, '94aaf4a2-c825-4cec-87c1-36366c2b29cb.png', 'image/png', '7bit', 'src/product/uploads/94aaf4a2-c825-4cec-87c1-36366c2b29cb.png', '0b92c1e2-a242-411f-92d4-2f7c8cddfe92');
INSERT INTO public.product_images (id, created_at, updated_at, deleted_at, filename, mimetype, "encoding", "path", product_id) VALUES('11f46731-afac-4394-a668-d0765689bddc', now(), now(), null, '94aaf4a2-c825-4cec-87c1-36366c2b29cb.png', 'image/png', '7bit', 'src/product/uploads/94aaf4a2-c825-4cec-87c1-36366c2b29cb.png', '79f73967-89da-4150-8d1d-ac3279e20a64');
INSERT INTO public.product_images (id, created_at, updated_at, deleted_at, filename, mimetype, "encoding", "path", product_id) VALUES('8de23462-f211-41de-b2b0-cf0dc5f4846c', now(), now(), null, '94aaf4a2-c825-4cec-87c1-36366c2b29cb.png', 'image/png', '7bit', 'src/product/uploads/94aaf4a2-c825-4cec-87c1-36366c2b29cb.png', '594a9776-b336-41ae-a09e-eedcd769e50f');
INSERT INTO public.product_images (id, created_at, updated_at, deleted_at, filename, mimetype, "encoding", "path", product_id) VALUES('3317a978-1f01-481d-881d-2571bd59450a', now(), now(), null, '94aaf4a2-c825-4cec-87c1-36366c2b29cb.png', 'image/png', '7bit', 'src/product/uploads/94aaf4a2-c825-4cec-87c1-36366c2b29cb.png', '68c1fbeb-8969-490c-bf2f-e34e793698ac');

