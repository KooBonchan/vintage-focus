CREATE TABLE IF NOT EXISTS `member` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `oauth_provider` VARCHAR(50) NOT NULL,
    `oauth_id` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `profile_image` VARCHAR(511) NULL,
    `phone` VARCHAR(20) NULL,
    `address` VARCHAR(255) NULL,
    `detail_address` VARCHAR(255) NULL,
    `zipcode` CHAR(5) NULL,
    `role` VARCHAR(20) NULL DEFAULT 'USER',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `product` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `code` VARCHAR(63) NULL,
    `model_name` VARCHAR(63) NULL,
    `product_name` VARCHAR(255) NULL,
    `company` VARCHAR(63) NULL,
    `country` VARCHAR(63) NULL,
    `category_1` VARCHAR(63) NULL,
    `category_2` VARCHAR(63) NULL,
    `category_3` VARCHAR(63) NULL,
    `condition` TINYINT NOT NULL default 3
       COMMENT 'Enum(1-POOR, 2-FAIR, 3-GOOD, 4-EXCELLENT, 5-MINT)',

    `stock` INT NULL,
    `consumer_price` INT NULL,
    `selling_price` INT NULL,
    `rental_price` INT NULL,
    `review_count` INT NULL,
    `like_count` INT NULL,
    `view_count` INT NULL
);

CREATE TABLE IF NOT EXISTS `rental` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `member_id` BIGINT NULL,
    `rental_fee` Int NULL,
    `delivery_fee` Int NULL,
    `total_price` Int NULL,
    `payment_timestamp` Timestamp NULL,
    `rental_timestamp` Timestamp NULL,
    `return_timestamp` Timestamp NULL,
    `is_delayed` Boolean NULL,
    `product_id` BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS `board` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `category` VARCHAR(63) NULL,
    `write_date` Date NULL,
    `update_date` Date NULL,
    `secured` Boolean NULL,
    `content` TEXT NULL,
    `title` VARCHAR(255) NULL,
    `member_id` BIGINT NOT NULL,
    `writer` VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS `Review` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `content` TEXT NULL,
    `write_date` Date NULL,
    `update_date` Date NULL,
    `secured` Boolean NULL,
    `title` VARCHAR(255) NULL,
    `member_id` BIGINT NOT NULL,
    `product_id` BIGINT NOT NULL,
    `writer` VARCHAR(255) NULL
);


CREATE TABLE IF NOT EXISTS `product_image` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `original_image_name` VARCHAR(255) NULL,
    `path` VARCHAR(255) NULL,
    `saved_image_name` VARCHAR(255) NULL,
    `upload_timestamp` Timestamp NULL,
    `product_id` BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS `product_detail_image` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `original_image_name` VARCHAR(255) NULL,
    `path` VARCHAR(255) NULL,
    `saved_image_name` VARCHAR(255) NULL,
    `upload_timestamp` Timestamp NULL,
    `product_id` BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS `board_image` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `original_image_name` VARCHAR(255) NULL,
    `path` VARCHAR(255) NULL,
    `saved_image_name` VARCHAR(255) NULL,
    `upload_timestamp` Timestamp NULL,
    `board_id` BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS `review_image` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `original_image_name` VARCHAR(255) NULL,
    `path` VARCHAR(255) NULL,
    `saved_image_name` VARCHAR(255) NULL,
    `upload_timestamp` Timestamp NULL,
    `review_id` BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS `Payment` (
    `id` BINARY(16) NOT NULL PRIMARY KEY,
    `delivery_id` BINARY(16) NOT NULL,
    `sum_product` Int NULL,
    `delivery_fee` Int NULL,
    `total_price` Int NULL,
    `is_canceled` Boolean NULL,
    `payment_date` Timestamp NULL,
    `member_id` BIGINT NOT NULL
);
CREATE TABLE IF NOT EXISTS `Delivery` (
    `id` BINARY(16) NOT NULL PRIMARY KEY,
    `member_id` BIGINT NOT NULL,
    `status` VARCHAR(50) NULL COMMENT 'pending, shipped, delivered',
    `order_date` Timestamp NULL,
    `address` VARCHAR(255) NULL,
    `detail_address` VARCHAR(255) NULL,
    `zipcode` VARCHAR(10) NULL,
    `recipient_name` VARCHAR(100) NULL,
    `recipient_phone` VARCHAR(20) NULL
);

CREATE TABLE IF NOT EXISTS `Cart` (
    `id` BINARY(16) NOT NULL PRIMARY KEY,
    `sum_product` Int NULL,
    `delivery_fee` Int NULL,
    `total_price` Int NULL,
    `expire_date` VARCHAR(255) NULL,
    `member_id` BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS `product_cart` (
  `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `product_id` BIGINT NOT NULL,
  `cart_id` BINARY(16) NOT NULL,
  `quantity` Int NULL,
  `price` Int NULL,
  `subtotal` Int NULL
);

CREATE TABLE IF NOT EXISTS `rental_payment` (
  `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `rental_id` BIGINT NOT NULL,
  `payment_id` BINARY(16) NOT NULL,
  `quantity` Int NULL,
  `price` int NULL,
  `subtotal` int NULL
);

CREATE TABLE IF NOT EXISTS `product_payment` (
  `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `product_id` BIGINT NOT NULL,
  `payment_id` BINARY(16) NOT NULL,
  `quantity` Int NULL,
  `price` int NULL,
  `subtotal` int NULL
);

CREATE TABLE IF NOT EXISTS `rental_cart` (
  `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `rental_id` BIGINT NOT NULL,
  `cart_id` BINARY(16) NOT NULL,
  `quantity` Int NULL,
  `price` int NULL,
  `subtotal` int NULL
);

CREATE TABLE IF NOT EXISTS `refresh_token` (
  `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `token` varchar(255) NOT NULL,
  `member_id` BIGINT NOT NULL,
  `issued_at` Timestamp NULL,
  `expires_at` Timestamp NULL
);

ALTER TABLE `product_cart` ADD INDEX `idx_cart_id` (`cart_id`);

ALTER TABLE `rental_cart` ADD CONSTRAINT `PK_RENTAL_CART` UNIQUE KEY (`rental_id`, `cart_id`);
ALTER TABLE `product_cart` ADD CONSTRAINT `PK_PRODUCT_CART` UNIQUE KEY (`product_id`, `cart_id`);
ALTER TABLE `rental_payment` ADD CONSTRAINT `PK_RENTAL_PAYMENT` UNIQUE KEY (`rental_id`, `payment_id`);
ALTER TABLE `product_payment` ADD CONSTRAINT `PK_PRODUCT_PAYMENT` UNIQUE KEY (`product_id`, `payment_id`);

ALTER TABLE `rental` ADD CONSTRAINT `FK_product_TO_rental_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);
ALTER TABLE `product_image` ADD CONSTRAINT `FK_product_TO_product_image_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);
ALTER TABLE `product_cart` ADD CONSTRAINT `FK_product_TO_product_cart_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);
ALTER TABLE `product_cart` ADD CONSTRAINT `FK_Cart_TO_product_cart_1` FOREIGN KEY (`cart_id`) REFERENCES `Cart` (`id`);
ALTER TABLE `rental_payment` ADD CONSTRAINT `FK_rental_TO_rental_payment_1` FOREIGN KEY (`rental_id`) REFERENCES `rental` (`id`);
ALTER TABLE `rental_payment` ADD CONSTRAINT `FK_Payment_TO_rental_payment_1` FOREIGN KEY (`payment_id`) REFERENCES `Payment` (`id`);
ALTER TABLE `product_payment` ADD CONSTRAINT `FK_product_TO_product_payment_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);
ALTER TABLE `product_payment` ADD CONSTRAINT `FK_Payment_TO_product_payment_1` FOREIGN KEY (`payment_id`) REFERENCES `Payment` (`id`);
ALTER TABLE `board_image` ADD CONSTRAINT `FK_board_TO_board_image_1` FOREIGN KEY (`board_id`) REFERENCES `board` (`id`);
ALTER TABLE `rental_cart` ADD CONSTRAINT `FK_rental_TO_rental_cart_1` FOREIGN KEY (`rental_id`) REFERENCES `rental` (`id`);
ALTER TABLE `rental_cart` ADD CONSTRAINT `FK_Cart_TO_rental_cart_1` FOREIGN KEY (`cart_id`) REFERENCES `Cart` (`id`);
ALTER TABLE `product_detail_image` ADD CONSTRAINT `FK_product_TO_product_detail_image_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);
ALTER TABLE `Review` ADD CONSTRAINT `FK_member_TO_Review_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`);
ALTER TABLE `Review` ADD CONSTRAINT `FK_product_TO_Review_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);
ALTER TABLE `review_image` ADD CONSTRAINT `FK_Review_TO_review_image_1` FOREIGN KEY (`review_id`) REFERENCES `Review` (`id`);
ALTER TABLE `Payment` ADD CONSTRAINT `FK_member_TO_Payment_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`);
ALTER TABLE `Cart` ADD CONSTRAINT `FK_member_TO_Cart_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`);
ALTER TABLE `board` ADD CONSTRAINT `FK_member_TO_board_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`);