package com.dodream.vintageFocus.vo.joinedTables;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter @Setter
public class ProductWithFirstImage {
  private Long productId;
  private String code;
  private String modelName;
  private String productName;
  private String company;
  private String country;
  private String category1;
  private String category2;
  private String category3;
  private Short condition;
  private Integer stock;
  private Integer consumerPrice;
  private Integer sellingPrice;
  private Integer rentalPrice;
  private Integer reviewCount;
  private Integer likeCount;
  private Integer viewCount;
  private Long imageId;
  private String originalImageName;
  private String path;
  private String savedImageName;
  private Instant uploadTimestamp;
}