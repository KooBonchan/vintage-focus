package com.dodream.vintageFocus.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("product") @Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Product {
  @Id
  private Long id;

  @Column("code")
  private String code;

  @Column("model_name")
  private String modelName;

  @Column("product_name")
  private String productName;

  @Column("company")
  private String company;

  @Column("country")
  private String country;

  @Column("category_1")
  private String category1;

  @Column("category_2")
  private String category2;

  @Column("category_3")
  private String category3;

  @Column("condition")
  private Short condition;

  @Column("stock")
  private Integer stock;

  @Column("consumer_price")
  private Integer consumerPrice;

  @Column("selling_price")
  private Integer sellingPrice;

  @Column("rental_price")
  private Integer rentalPrice;

  @Column("review_count")
  private Integer reviewCount;

  @Column("like_count")
  private Integer likeCount;

  @Column("view_count")
  private Integer viewCount;

}

