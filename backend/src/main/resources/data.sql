INSERT INTO product (id, name, price)
SELECT 1, '연습용 Dame 4현', 123456
WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 1);

INSERT INTO product (id, name, price)
SELECT 2, '실전용 Fender 5현', 1234567
WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2);