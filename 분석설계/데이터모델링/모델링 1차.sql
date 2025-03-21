﻿DROP TABLE IF EXISTS `lental`;
DROP TABLE IF EXISTS `product_image`;
DROP TABLE IF EXISTS `product-order`;
DROP TABLE IF EXISTS `lental-payment`;
DROP TABLE IF EXISTS `product_payment`;
DROP TABLE IF EXISTS `board_image`;
DROP TABLE IF EXISTS `lental-order`;
DROP TABLE IF EXISTS `member`;
DROP TABLE IF EXISTS `product`;
DROP TABLE IF EXISTS `product_detail_image`;
DROP TABLE IF EXISTS `Review`;
DROP TABLE IF EXISTS `review_image`;
DROP TABLE IF EXISTS `Payment`;
DROP TABLE IF EXISTS `Order`;
DROP TABLE IF EXISTS `board`;

CREATE TABLE `lental` (
	`id`	Long	NOT NULL,
	`member_id`	Long	NULL,
	`lental_fee`	Int	NULL,
	`delivery_fee`	Int	NULL,
	`total_price`	Int	NULL,
	`payment_timestamp`	Timestamp	NULL,
	`lental_timestamp`	Timestamp	NULL,
	`return_timestamp`	Timestamp	NULL,
	`is_delayed`	Boolean	NULL,
	`product_id`	Long	NOT NULL
);

CREATE TABLE `product_image` (
	`id`	Long	NOT NULL,
	`original_image_name`	VARCHAR(255)	NULL,
	`path`	VARCHAR(255)	NULL,
	`saved_image_name`	VARCHAR(255)	NULL,
	`upload_timestamp`	Timestamp	NULL,
	`product_id`	Long	NOT NULL
);

CREATE TABLE `product-order` (
	`product_id`	Long	NOT NULL,
	`order_id`	Byte(16)	NOT NULL,
	`quantity`	Int	NULL,
	`price`	int	NULL,
	`sum`	int	NULL
);

CREATE TABLE `lental-payment` (
	`lental_id`	Long	NOT NULL,
	`payment_id`	Byte(16)	NOT NULL,
	`quantity`	Int	NULL,
	`price`	int	NULL,
	`sum`	int	NULL
);

CREATE TABLE `product_payment` (
	`product_id`	Long	NOT NULL,
	`payment_id`	Byte(16)	NOT NULL,
	`quantity`	Int	NULL,
	`price`	int	NULL,
	`sum`	int	NULL
);

CREATE TABLE `board_image` (
	`id`	Long	NOT NULL,
	`original_image_name`	VARCHAR(255)	NULL,
	`path`	VARCHAR(255)	NULL,
	`saved_image_name`	VARCHAR(255)	NULL,
	`upload_timestamp`	Timestamp	NULL,
	`board_id`	Long	NOT NULL
);

CREATE TABLE `lental-order` (
	`lental_id`	Long	NOT NULL,
	`order_id`	Byte(16)	NOT NULL,
	`quantity`	Int	NULL,
	`price`	int	NULL,
	`sum`	int	NULL
);

CREATE TABLE `member` (
	`id`	Long	NOT NULL,
	`username`	VARCHAR(63)	NULL,
	`password`	VARCHAR(127)	NULL,
	`phone`	VARCHAR(20)	NULL,
	`address`	VARCHAR(255)	NULL,
	`detail_address`	VARCHAR(255)	NULL,
	`zipcode`	CHAR(5)	NULL,
	`role`	VARCHAR(20)	NULL
);

CREATE TABLE `product` (
	`id`	Long	NOT NULL,
	`code`	VARCHAR(63)	NULL,
	`model_name`	VARCHAR(63)	NULL,
	`product_name`	VARCHAR(255)	NULL,
	`company`	VARCHAR(63)	NULL,
	`country`	VARCHAR(63)	NULL,
	`category_1`	VARCHAR(63)	NULL,
	`category_2`	VARCHAR(63)	NULL,
	`category_3`	VARCHAR(63)	NULL,
	`condition`	SMALLINT	NULL	COMMENT 'Enum - 5단계',
	`stock`	INT	NULL,
	`Field`	INT	NULL,
	`Field2`	INT	NULL,
	`Field3`	INT	NULL,
	`review_count`	INT	NULL,
	`like_count`	INT	NULL,
	`view_count`	INT	NULL
);

CREATE TABLE `product_detail_image` (
	`id`	Long	NOT NULL,
	`original_image_name`	VARCHAR(255)	NULL,
	`path`	VARCHAR(255)	NULL,
	`saved_image_name`	VARCHAR(255)	NULL,
	`upload_timestamp`	Timestamp	NULL,
	`product_id`	Long	NOT NULL
);

CREATE TABLE `Review` (
	`id`	Long	NOT NULL,
	`content`	VARCHAR(255)	NULL,
	`write_date`	Date	NULL,
	`update_date`	Date	NULL,
	`secured`	Boolean	NULL,
	`title`	VARCHAR(255)	NULL,
	`member_id`	Long	NOT NULL,
	`product_id`	Long	NOT NULL
);

CREATE TABLE `review_image` (
	`id`	Long	NOT NULL,
	`original_image_name`	VARCHAR(255)	NULL,
	`path`	VARCHAR(255)	NULL,
	`saved_image_name`	VARCHAR(255)	NULL,
	`upload_timestamp`	Timestamp	NULL,
	`review_id`	Long	NOT NULL
);

CREATE TABLE `Payment` (
	`id`	Byte(16)	NOT NULL,
	`sum_product`	Int	NULL,
	`delivery_fee`	Int	NULL,
	`total_price`	Int	NULL,
	`is_canceled`	Boolean	NULL,
	`payment_date`	Timestamp	NULL,
	`member_id`	Long	NOT NULL
);

CREATE TABLE `Order` (
	`id`	Byte(16)	NOT NULL,
	`sum_product`	Int	NULL,
	`delivery_fee`	Int	NULL,
	`total_price`	Int	NULL,
	`expire_date`	VARCHAR(255)	NULL,
	`member_id`	Long	NOT NULL
);

CREATE TABLE `board` (
	`id`	Long	NOT NULL,
	`category`	VARCHAR(63)	NULL,
	`writer_id`	Long	NULL,
	`write_date`	Date	NULL,
	`update_date`	Date	NULL,
	`secured`	Boolean	NULL,
	`content`	VARCHAR(255)	NULL,
	`title`	VARCHAR(255)	NULL,
	`member_id`	Long	NOT NULL
);

ALTER TABLE `lental` ADD CONSTRAINT `PK_LENTAL` PRIMARY KEY (
	`id`
);

ALTER TABLE `product_image` ADD CONSTRAINT `PK_PRODUCT_IMAGE` PRIMARY KEY (
	`id`
);

ALTER TABLE `product-order` ADD CONSTRAINT `PK_PRODUCT-ORDER` PRIMARY KEY (
	`product_id`,
	`order_id`
);

ALTER TABLE `lental-payment` ADD CONSTRAINT `PK_LENTAL-PAYMENT` PRIMARY KEY (
	`lental_id`,
	`payment_id`
);

ALTER TABLE `product_payment` ADD CONSTRAINT `PK_PRODUCT_PAYMENT` PRIMARY KEY (
	`product_id`,
	`payment_id`
);

ALTER TABLE `board_image` ADD CONSTRAINT `PK_BOARD_IMAGE` PRIMARY KEY (
	`id`
);

ALTER TABLE `lental-order` ADD CONSTRAINT `PK_LENTAL-ORDER` PRIMARY KEY (
	`lental_id`,
	`order_id`
);

ALTER TABLE `member` ADD CONSTRAINT `PK_MEMBER` PRIMARY KEY (
	`id`
);

ALTER TABLE `product` ADD CONSTRAINT `PK_PRODUCT` PRIMARY KEY (
	`id`
);

ALTER TABLE `product_detail_image` ADD CONSTRAINT `PK_PRODUCT_DETAIL_IMAGE` PRIMARY KEY (
	`id`
);

ALTER TABLE `Review` ADD CONSTRAINT `PK_REVIEW` PRIMARY KEY (
	`id`
);

ALTER TABLE `review_image` ADD CONSTRAINT `PK_REVIEW_IMAGE` PRIMARY KEY (
	`id`
);

ALTER TABLE `Payment` ADD CONSTRAINT `PK_PAYMENT` PRIMARY KEY (
	`id`
);

ALTER TABLE `Order` ADD CONSTRAINT `PK_ORDER` PRIMARY KEY (
	`id`
);

ALTER TABLE `board` ADD CONSTRAINT `PK_BOARD` PRIMARY KEY (
	`id`
);

ALTER TABLE `lental` ADD CONSTRAINT `FK_product_TO_lental_1` FOREIGN KEY (
	`product_id`
)
REFERENCES `product` (
	`id`
);

ALTER TABLE `product_image` ADD CONSTRAINT `FK_product_TO_product_image_1` FOREIGN KEY (
	`product_id`
)
REFERENCES `product` (
	`id`
);

ALTER TABLE `product-order` ADD CONSTRAINT `FK_product_TO_product-order_1` FOREIGN KEY (
	`product_id`
)
REFERENCES `product` (
	`id`
);

ALTER TABLE `product-order` ADD CONSTRAINT `FK_Order_TO_product-order_1` FOREIGN KEY (
	`order_id`
)
REFERENCES `Order` (
	`id`
);

ALTER TABLE `lental-payment` ADD CONSTRAINT `FK_lental_TO_lental-payment_1` FOREIGN KEY (
	`lental_id`
)
REFERENCES `lental` (
	`id`
);

ALTER TABLE `lental-payment` ADD CONSTRAINT `FK_Payment_TO_lental-payment_1` FOREIGN KEY (
	`payment_id`
)
REFERENCES `Payment` (
	`id`
);

ALTER TABLE `product_payment` ADD CONSTRAINT `FK_product_TO_product_payment_1` FOREIGN KEY (
	`product_id`
)
REFERENCES `product` (
	`id`
);

ALTER TABLE `product_payment` ADD CONSTRAINT `FK_Payment_TO_product_payment_1` FOREIGN KEY (
	`payment_id`
)
REFERENCES `Payment` (
	`id`
);

ALTER TABLE `board_image` ADD CONSTRAINT `FK_board_TO_board_image_1` FOREIGN KEY (
	`board_id`
)
REFERENCES `board` (
	`id`
);

ALTER TABLE `lental-order` ADD CONSTRAINT `FK_lental_TO_lental-order_1` FOREIGN KEY (
	`lental_id`
)
REFERENCES `lental` (
	`id`
);

ALTER TABLE `lental-order` ADD CONSTRAINT `FK_Order_TO_lental-order_1` FOREIGN KEY (
	`order_id`
)
REFERENCES `Order` (
	`id`
);

ALTER TABLE `product_detail_image` ADD CONSTRAINT `FK_product_TO_product_detail_image_1` FOREIGN KEY (
	`product_id`
)
REFERENCES `product` (
	`id`
);

ALTER TABLE `Review` ADD CONSTRAINT `FK_member_TO_Review_1` FOREIGN KEY (
	`member_id`
)
REFERENCES `member` (
	`id`
);

ALTER TABLE `Review` ADD CONSTRAINT `FK_product_TO_Review_1` FOREIGN KEY (
	`product_id`
)
REFERENCES `product` (
	`id`
);

ALTER TABLE `review_image` ADD CONSTRAINT `FK_Review_TO_review_image_1` FOREIGN KEY (
	`review_id`
)
REFERENCES `Review` (
	`id`
);

ALTER TABLE `Payment` ADD CONSTRAINT `FK_member_TO_Payment_1` FOREIGN KEY (
	`member_id`
)
REFERENCES `member` (
	`id`
);

ALTER TABLE `Order` ADD CONSTRAINT `FK_member_TO_Order_1` FOREIGN KEY (
	`member_id`
)
REFERENCES `member` (
	`id`
);

ALTER TABLE `board` ADD CONSTRAINT `FK_member_TO_board_1` FOREIGN KEY (
	`member_id`
)
REFERENCES `member` (
	`id`
);

