INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, condition, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 1, 'TEST-00101', '연습용 Dame 4현', 'Dame 4', 'Dame', 'Korea', 'Musical Instruments', 'Electric Guitar', 'Electric Bass', 3, 20, 123456, 100000, 5000, 15, 200, 1000
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 1);
INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, condition, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 2, 'TEST-00171', '실전용 Fender 5현', 'Fender Jazz V', 'Fender', 'USA', 'Musical Instruments', 'Electric Guitar', 'Electric Bass', 4, 10, 1234567, 1500000, 10000, 50, 500, 1500
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2);
INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, condition, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 3, 'TEST-00181', '학생용 Ibanez 4현', 'Ibanez GSRM20', 'Ibanez', 'Japan', 'Musical Instruments', 'Electric Guitar', 'Electric Bass', 2, 30, 789000, 600000, 3000, 25, 150, 2000
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 3);
INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, condition, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 4, 'TEST-03579', '클래식 Squier 6현', 'Squier Classic Vibe 70s', 'Squier', 'China', 'Musical Instruments', 'Electric Guitar', 'Electric Guitar', 5, 50, 299000, 250000, 10000, 40, 350, 5000
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 4);
INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, condition, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 5, 'TEST-46464', '재즈용 Yamaha 5현', 'Yamaha TRBX505', 'Yamaha', 'Japan', 'Musical Instruments', 'Electric Guitar', 'Electric Bass', 4, 15, 1549999, 1200000, 7000, 60, 450, 8000
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 5);


INSERT INTO member (`id`, `oauth_provider`, `oauth_id`, `profile_image`, `username`, `phone`, `address`, `detail_address`, `zipcode`, `role`)
select 1, 'google', 'google-sub-123', 'john.doe@gmail.com', 'john_doe', '123-456-7890', '123 Main St', 'Apt 4B', '12345', 'USER'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM member WHERE id = 1);
INSERT INTO member (`id`, `oauth_provider`, `oauth_id`, `profile_image`, `username`, `phone`, `address`, `detail_address`, `zipcode`, `role`)
select 2, 'google', 'google-sub-456', 'jane.smith@gmail.com', 'jane_smith', '987-654-3210', '456 Oak Ave', 'Suite 301', '67890', 'USER'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM member WHERE id = 2);
INSERT INTO member (`id`, `oauth_provider`, `oauth_id`, `profile_image`, `username`, `phone`, `address`, `detail_address`, `zipcode`, `role`)
select 3, 'google', 'google-sub-789', 'admin.user@gmail.com', 'admin_user', '555-555-5555', '789 Admin Rd', 'Floor 5', '11111', 'ADMIN'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM member WHERE id = 3);
INSERT INTO member (`id`, `oauth_provider`, `oauth_id`, `profile_image`, `username`, `phone`, `address`, `detail_address`, `zipcode`, `role`)
select 4, 'google', 'google-sub-012', 'mary.johnson@gmail.com', 'mary_johnson', '444-444-4444', '321 Pine Ln', 'Unit 2C', '22222', 'USER'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM member WHERE id = 4);
INSERT INTO member (`id`, `oauth_provider`, `oauth_id`, `profile_image`, `username`, `phone`, `address`, `detail_address`, `zipcode`, `role`)
select 5, 'google', 'google-sub-345', 'support.team@gmail.com', 'support_team', '666-666-6666', '159 Support Blvd', 'Room 100', '33333', 'SUPPORT'
FROM dual WHERE NOT EXISTS (SELECT 1 FROM member WHERE id = 5);
