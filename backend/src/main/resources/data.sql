INSERT INTO product (id, product_name, model_name, company, country, category_1, category_2, category_3, condition, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 1, '연습용 Dame 4현', 'Dame 4', 'Dame', 'Korea', 'Musical Instruments', 'Electric Guitar', 'Electric Bass', 3, 20, 123456, 100000, 5000, 15, 200, 1000
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 1);

INSERT INTO product (id, product_name, model_name, company, country, category_1, category_2, category_3, condition, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 2, '실전용 Fender 5현', 'Fender Jazz V', 'Fender', 'USA', 'Musical Instruments', 'Electric Guitar', 'Electric Bass', 4, 10, 1234567, 1500000, 10000, 50, 500, 1500
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2);

INSERT INTO product (id, product_name, model_name, company, country, category_1, category_2, category_3, condition, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 3, '학생용 Ibanez 4현', 'Ibanez GSRM20', 'Ibanez', 'Japan', 'Musical Instruments', 'Electric Guitar', 'Electric Bass', 2, 30, 789000, 600000, 3000, 25, 150, 2000
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 3);

INSERT INTO product (id, product_name, model_name, company, country, category_1, category_2, category_3, condition, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 4, '클래식 Squier 6현', 'Squier Classic Vibe 70s', 'Squier', 'China', 'Musical Instruments', 'Electric Guitar', 'Electric Guitar', 5, 50, 299000, 250000, 10000, 40, 350, 5000
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 4);

INSERT INTO product (id, product_name, model_name, company, country, category_1, category_2, category_3, condition, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 5, '재즈용 Yamaha 5현', 'Yamaha TRBX505', 'Yamaha', 'Japan', 'Musical Instruments', 'Electric Guitar', 'Electric Bass', 4, 15, 1549999, 1200000, 7000, 60, 450, 8000
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 5);