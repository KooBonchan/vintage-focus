-- Insert data into product table
INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 1, 'CAM-00001', '후지필름 X-S10 바디', 'X-S10 바디', '후지필름', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 4, 20, 1400000, 1120000, 420000, 15, 200, 1000
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 1);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 2, 'CAM-00002', '니콘 Z 50 바디', 'Z 50 바디', '니콘', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 3, 30, 683000, 546000, 204000, 25, 150, 2000
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 2);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 3, 'CAM-00003', '라이카 SL2 바디 블랙', 'SL2 바디 블랙', '라이카', 'Germany', 'Electronics', 'Cameras', 'Mirrorless Cameras', 5, 10, 4466000, 4466000, 1339000, 50, 500, 1500
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 3);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 4, 'CAM-00004', '니콘 Z 50 바디', 'Z 50 바디', '니콘', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 3, 25, 683000, 478000, 204000, 30, 180, 2200
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 4);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 5, 'CAM-00005', '니콘 Z 6 바디', 'Z 6 바디', '니콘', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 4, 15, 990000, 792000, 297000, 40, 300, 3000
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 5);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 6, 'CAM-00006', '소니 α7III 바디', 'α7III 바디', '소니', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 4, 18, 1472000, 1177000, 441000, 60, 400, 3500
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 6);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 7, 'CAM-00007', '올림푸스 OM-D E-M5 바디 블랙', 'OM-D E-M5 바디 블랙', '올림푸스', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 2, 35, 293000, 205000, 87000, 20, 100, 1500
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 7);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 8, 'CAM-00008', '키야노 EOS M6 Mark II 바디 실버', 'EOS M6 Mark II 바디 실버', '키야노', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 4, 22, 1022000, 1022000, 306000, 45, 250, 2800
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 8);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 9, 'CAM-00009', '후지필름 X-T3 바디 블랙', 'X-T3 바디 블랙', '후지필름', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 5, 12, 1343000, 1074000, 402000, 55, 450, 4000
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 9);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 10, 'CAM-00010', '후지필름 X-T2 바디 블랙', 'X-T2 바디 블랙', '후지필름', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 3, 28, 943000, 754000, 282000, 35, 200, 2500
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 10);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 11, 'CAM-00011', '니콘 Z fc 바디 실버', 'Z fc 바디 실버', '니콘', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 4, 20, 1113000, 890000, 333000, 50, 300, 3200
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 11);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 12, 'CAM-00012', '파나소닉 LUMIX DC-S9-K 바디 제트블랙', 'LUMIX DC-S9-K 바디 제트블랙', '파나소닉', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 5, 15, 1609000, 1609000, 482000, 70, 400, 4500
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 12);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 13, 'CAM-00013', '라이카 M11-P 바디 블랙페인트', 'M11-P 바디 블랙페인트', '라이카', 'Germany', 'Electronics', 'Cameras', 'Mirrorless Cameras', 5, 8, 12890000, 10312000, 3867000, 80, 500, 5000
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 13);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 14, 'CAM-00014', '키야노 EOS R7 바디', 'EOS R7 바디', '키야노', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 4, 18, 1513000, 1210000, 453000, 60, 350, 3800
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 14);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 15, 'CAM-00015', '니콘 Z 50 바디', 'Z 50 바디', '니콘', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 3, 32, 723000, 506000, 216000, 25, 150, 2000
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 15);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 16, 'CAM-00016', '라이카 M11 바디 실버크롬', 'M11 바디 실버크롬', '라이카', 'Germany', 'Electronics', 'Cameras', 'Mirrorless Cameras', 5, 10, 11550000, 11550000, 3465000, 90, 500, 4800
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 16);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 17, 'CAM-00017', '파나소닉 LUMIX DC-GH5S-K 바디 블랙', 'LUMIX DC-GH5S-K 바디 블랙', '파나소닉', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 4, 20, 1118000, 894000, 335000, 50, 300, 3200
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 17);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 18, 'CAM-00018', '소니 VLOGCAM ZV-E10 II 바디 블랙', 'VLOGCAM ZV-E10 II 바디 블랙', '소니', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 4, 25, 1263000, 1010000, 378000, 60, 350, 3800
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 18);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 19, 'CAM-00019', '키야노 EOS R3 바디', 'EOS R3 바디', '키야노', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 5, 12, 5263000, 4210000, 1578000, 70, 400, 4500
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 19);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 20, 'CAM-00020', '키야노 EOS R3 바디', 'EOS R3 바디', '키야노', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 5, 10, 5263000, 3684000, 1578000, 65, 380, 4200
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 20);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 21, 'CAM-00021', '니콘 Z 50 바디', 'Z 50 바디', '니콘', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 3, 28, 753000, 602000, 225000, 30, 180, 2200
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 21);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 22, 'CAM-00022', '후지필름 GFX 50S II 바디', 'GFX 50S II 바디', '후지필름', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 4, 15, 3488000, 2790000, 1046000, 55, 350, 3800
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 22);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 23, 'CAM-00023', '키야노 EOS Kiss M2 바디 블랙', 'EOS Kiss M2 바디 블랙', '키야노', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 3, 32, 753000, 527000, 225000, 25, 150, 2000
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 23);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 24, 'CAM-00024', '소니 α6000 바디 블랙', 'α6000 바디 블랙', '소니', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 2, 40, 457000, 365000, 137000, 20, 100, 1500
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 24);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 25, 'CAM-00025', '소니 α6500 바디', 'α6500 바디', '소니', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 3, 28, 761000, 532000, 228000, 35, 200, 2500
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 25);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 26, 'CAM-00026', '키야노 EOS Kiss M 바디 블랙', 'EOS Kiss M 바디 블랙', '키야노', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 3, 30, 603000, 482000, 180000, 30, 180, 2200
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 26);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 27, 'CAM-00027', '소니 α6000 바디 실버', 'α6000 바디 실버', '소니', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 2, 35, 593000, 415000, 177000, 25, 150, 2000
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 27);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 28, 'CAM-00028', '파나소닉 LUMIX DC-S1H-K 바디 블랙', 'LUMIX DC-S1H-K 바디 블랙', '파나소닉', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 4, 18, 2367000, 1893000, 710000, 60, 400, 3500
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 28);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 29, 'CAM-00029', '키야노 EOS R3 바디', 'EOS R3 바디', '키야노', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 5, 10, 4270000, 3416000, 1281000, 70, 400, 4500
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 29);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 30, 'CAM-00030', '키야노 EOS R5 바디', 'EOS R5 바디', '키야노', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 4, 15, 2943000, 2354000, 882000, 55, 350, 3800
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 30);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 31, 'CAM-00031', 'OM SYSTEM OM-1 Mark II 바디', 'OM-1 Mark II 바디', 'OM SYSTEM', 'UK', 'Electronics', 'Cameras', 'Mirrorless Cameras', 4, 20, 2239000, 1791000, 671000, 60, 400, 3500
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 31);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 32, 'CAM-00032', '라이카 M11 바디 실버크롬', 'M11 바디 실버크롬', '라이카', 'Germany', 'Electronics', 'Cameras', 'Mirrorless Cameras', 5, 10, 9594000, 7675000, 2878000, 80, 500, 5000
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 32);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 33, 'CAM-00033', '니콘 Z 50 바디', 'Z 50 바디', '니콘', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 3, 30, 708000, 496000, 212000, 25, 150, 2000
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 33);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 34, 'CAM-00034', '키야노 EOS R5 바디', 'EOS R5 바디', '키야노', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 4, 15, 2866000, 2292000, 859000, 55, 350, 3800
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 34);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 35, 'CAM-00035', '라이카 SL2-S 바디', 'SL2-S 바디', '라이카', 'Germany', 'Electronics', 'Cameras', 'Mirrorless Cameras', 4, 12, 3888000, 3110000, 1166000, 70, 400, 4500
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 35);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 36, 'CAM-00036', '라이카 SL2 바디 블랙', 'SL2 바디 블랙', '라이카', 'Germany', 'Electronics', 'Cameras', 'Mirrorless Cameras', 5, 10, 4435000, 3548000, 1330000, 80, 500, 5000
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 36);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 37, 'CAM-00037', '라이카 SL2-S Reporter 바디', 'SL2-S Reporter 바디', '라이카', 'Germany', 'Electronics', 'Cameras', 'Mirrorless Cameras', 5, 8, 7489000, 5991000, 2246000, 90, 500, 4800
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 37);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 38, 'CAM-00038', '라이카 M10 모노크롬 Leitz Wetzlar 바디', 'M10 모노크롬 Leitz Wetzlar 바디', '라이카', 'Germany', 'Electronics', 'Cameras', 'Mirrorless Cameras', 5, 10, 11193000, 8954000, 3357000, 80, 500, 5000
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 38);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 39, 'CAM-00039', '니콘 Z 50 바디', 'Z 50 바디', '니콘', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 3, 30, 671000, 536000, 201000, 25, 150, 2000
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 39);

INSERT INTO product (id, code, product_name, model_name, company, country, category_1, category_2, category_3, `condition`, stock, consumer_price, selling_price, rental_price, review_count, like_count, view_count)
SELECT 40, 'CAM-00040', '키야노 EOS R5 바디', 'EOS R5 바디', '키야노', 'Japan', 'Electronics', 'Cameras', 'Mirrorless Cameras', 4, 15, 2933000, 2346000, 879000, 55, 350, 3800
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = 40);

-- Insert data into product_image table
INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 1, '2148711259015-1-2.jpg', '/', '2148711259015-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 1
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 1);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 2, '2119341009608-1-2.jpg', '/', '2119341009608-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 2
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 2);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 3, '2119340881885-1-2.jpg', '/', '2119340881885-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 3
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 3);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 4, '2119341014787-1-2.jpg', '/', '2119341014787-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 4
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 4);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 5, '2449740025375-1-2.jpg', '/', '2449740025375-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 5
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 5);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 6, '2119341013377-1-2.jpg', '/', '2119341013377-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 6
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 6);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 7, '2119340985705-1-2.jpg', '/', '2119340985705-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 7
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 7);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 8, '2103280251730-1-2.jpg', '/', '2103280251730-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 8
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 8);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 9, '2103280236522-1-2.jpg', '/', '2103280236522-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 9
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 9);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 10, '2103280237376-1-2.jpg', '/', '2103280237376-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 10
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 10);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 11, '2447550025066-1-2.jpg', '/', '2447550025066-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 11
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 11);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 12, '2119340954206-1-2.jpg', '/', '2119340954206-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 12
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 12);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 13, '2442610042717-1-2.jpg', '/', '2442610042717-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 13
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 13);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 14, '2119340986542-1-2.jpg', '/', '2119340986542-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 14
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 14);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 15, '2441860013805-1-2.jpg', '/', '2441860013805-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 15
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 15);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 16, '2147025851496-1-2.jpg', '/', '2147025851496-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 16
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 16);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 17, '2119340979100-1-2.jpg', '/', '2119340979100-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 17
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 17);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 18, '2119340978776-1-2.jpg', '/', '2119340978776-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 18
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 18);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 19, '2119340985521-1-2.jpg', '/', '2119340985521-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 19
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 19);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 20, '2119340985538-1-2.jpg', '/', '2119340985538-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 20
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 20);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 21, '2119340985064-1-2.jpg', '/', '2119340985064-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 21
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 21);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 22, '2119340969811-1-2.jpg', '/', '2119340969811-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 22
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 22);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 23, '2143591775204-1-2.jpg', '/', '2143591775204-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 23
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 23);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 24, '2443801242817-1-2.jpg', '/', '2443801242817-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 24
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 24);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 25, '2449420050673-1-2.jpg', '/', '2449420050673-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 25
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 25);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 26, '2445130046463-1-2.jpg', '/', '2445130046463-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 26
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 26);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 27, '2443801263195-1-2.jpg', '/', '2443801263195-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 27
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 27);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 28, '2119340961105-1-2.jpg', '/', '2119340961105-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 28
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 28);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 29, '2119340933089-1-2.jpg', '/', '2119340933089-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 29
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 29);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 30, '2448780030967-1-2.jpg', '/', '2448780030967-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 30
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 30);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 31, '2119340963307-1-2.jpg', '/', '2119340963307-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 31
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 31);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 32, '2119340794277-1-2.jpg', '/', '2119340794277-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 32
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 32);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 33, '2119340969149-1-2.jpg', '/', '2119340969149-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 33
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 33);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 34, '2444300011331-1-2.jpg', '/', '2444300011331-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 34
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 34);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 35, '2119340956460-1-2.jpg', '/', '2119340956460-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 35
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 35);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 36, '2119340955807-1-2.jpg', '/', '2119340955807-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 36
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 36);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 37, '2119340960702-1-2.jpg', '/', '2119340960702-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 37
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 37);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 38, '2119340954817-1-2.jpg', '/', '2119340954817-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 38
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 38);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 39, '2448510005784-1-2.jpg', '/', '2448510005784-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 39
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 39);

INSERT INTO product_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 40, '2442470022379-1-2.jpg', '/', '2442470022379-1-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 40
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_image WHERE id = 40);

-- Insert data into product_detail_image table (using mock images)
INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 1, 'default-image-1.jpg', '/', 'default-image-1.jpg', TIMESTAMP '2023-10-01 10:00:00', 1
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 1);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 2, 'default-image-2.jpg', '/', 'default-image-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 2
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 2);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 3, 'default-image-3.jpg', '/', 'default-image-3.jpg', TIMESTAMP '2023-10-01 10:00:00', 3
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 3);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 4, 'default-image-4.jpg', '/', 'default-image-4.jpg', TIMESTAMP '2023-10-01 10:00:00', 4
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 4);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 5, 'default-image-5.jpg', '/', 'default-image-5.jpg', TIMESTAMP '2023-10-01 10:00:00', 5
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 5);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 6, 'default-image-1.jpg', '/', 'default-image-1.jpg', TIMESTAMP '2023-10-01 10:00:00', 6
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 6);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 7, 'default-image-2.jpg', '/', 'default-image-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 7
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 7);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 8, 'default-image-3.jpg', '/', 'default-image-3.jpg', TIMESTAMP '2023-10-01 10:00:00', 8
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 8);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 9, 'default-image-4.jpg', '/', 'default-image-4.jpg', TIMESTAMP '2023-10-01 10:00:00', 9
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 9);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 10, 'default-image-5.jpg', '/', 'default-image-5.jpg', TIMESTAMP '2023-10-01 10:00:00', 10
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 10);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 11, 'default-image-1.jpg', '/', 'default-image-1.jpg', TIMESTAMP '2023-10-01 10:00:00', 11
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 11);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 12, 'default-image-2.jpg', '/', 'default-image-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 12
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 12);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 13, 'default-image-3.jpg', '/', 'default-image-3.jpg', TIMESTAMP '2023-10-01 10:00:00', 13
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 13);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 14, 'default-image-4.jpg', '/', 'default-image-4.jpg', TIMESTAMP '2023-10-01 10:00:00', 14
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 14);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 15, 'default-image-5.jpg', '/', 'default-image-5.jpg', TIMESTAMP '2023-10-01 10:00:00', 15
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 15);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 16, 'default-image-1.jpg', '/', 'default-image-1.jpg', TIMESTAMP '2023-10-01 10:00:00', 16
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 16);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 17, 'default-image-2.jpg', '/', 'default-image-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 17
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 17);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 18, 'default-image-3.jpg', '/', 'default-image-3.jpg', TIMESTAMP '2023-10-01 10:00:00', 18
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 18);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 19, 'default-image-4.jpg', '/', 'default-image-4.jpg', TIMESTAMP '2023-10-01 10:00:00', 19
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 19);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 20, 'default-image-5.jpg', '/', 'default-image-5.jpg', TIMESTAMP '2023-10-01 10:00:00', 20
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 20);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 21, 'default-image-1.jpg', '/', 'default-image-1.jpg', TIMESTAMP '2023-10-01 10:00:00', 21
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 21);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 22, 'default-image-2.jpg', '/', 'default-image-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 22
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 22);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 23, 'default-image-3.jpg', '/', 'default-image-3.jpg', TIMESTAMP '2023-10-01 10:00:00', 23
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 23);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 24, 'default-image-4.jpg', '/', 'default-image-4.jpg', TIMESTAMP '2023-10-01 10:00:00', 24
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 24);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 25, 'default-image-5.jpg', '/', 'default-image-5.jpg', TIMESTAMP '2023-10-01 10:00:00', 25
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 25);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 26, 'default-image-1.jpg', '/', 'default-image-1.jpg', TIMESTAMP '2023-10-01 10:00:00', 26
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 26);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 27, 'default-image-2.jpg', '/', 'default-image-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 27
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 27);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 28, 'default-image-3.jpg', '/', 'default-image-3.jpg', TIMESTAMP '2023-10-01 10:00:00', 28
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 28);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 29, 'default-image-4.jpg', '/', 'default-image-4.jpg', TIMESTAMP '2023-10-01 10:00:00', 29
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 29);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 30, 'default-image-5.jpg', '/', 'default-image-5.jpg', TIMESTAMP '2023-10-01 10:00:00', 30
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 30);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 31, 'default-image-1.jpg', '/', 'default-image-1.jpg', TIMESTAMP '2023-10-01 10:00:00', 31
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 31);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 32, 'default-image-2.jpg', '/', 'default-image-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 32
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 32);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 33, 'default-image-3.jpg', '/', 'default-image-3.jpg', TIMESTAMP '2023-10-01 10:00:00', 33
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 33);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 34, 'default-image-4.jpg', '/', 'default-image-4.jpg', TIMESTAMP '2023-10-01 10:00:00', 34
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 34);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 35, 'default-image-5.jpg', '/', 'default-image-5.jpg', TIMESTAMP '2023-10-01 10:00:00', 35
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 35);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 36, 'default-image-1.jpg', '/', 'default-image-1.jpg', TIMESTAMP '2023-10-01 10:00:00', 36
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 36);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 37, 'default-image-2.jpg', '/', 'default-image-2.jpg', TIMESTAMP '2023-10-01 10:00:00', 37
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 37);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 38, 'default-image-3.jpg', '/', 'default-image-3.jpg', TIMESTAMP '2023-10-01 10:00:00', 38
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 38);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 39, 'default-image-4.jpg', '/', 'default-image-4.jpg', TIMESTAMP '2023-10-01 10:00:00', 39
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 39);

INSERT INTO product_detail_image (id, original_image_name, path, saved_image_name, upload_timestamp, product_id)
SELECT 40, 'default-image-5.jpg', '/', 'default-image-5.jpg', TIMESTAMP '2023-10-01 10:00:00', 40
FROM dual WHERE NOT EXISTS (SELECT 1 FROM product_detail_image WHERE id = 40);


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
