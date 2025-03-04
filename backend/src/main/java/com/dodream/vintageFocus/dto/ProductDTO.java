package com.dodream.vintageFocus.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
  private Long id;

  // 상품명
  private String code;
  private String modelName;
  private String productName;

  // 상품분류
  private String company;
  private String country;
  private String category1;
  private String category2;
  private String category3;

  // 상품상세
  private String condition; // "POOR";"FAIR";"GOOD";"EXCELLENT";"MINT";

  private Integer stock;    // if necessary, else -1
  private Integer consumerPrice;
  private Integer sellingPrice;
  private Integer rentalPrice;
  private List<String> productImages; // 제품 이미지
  private List<String> detailImages; // 제품 이미지

  private Integer reviewCount;
  private Integer likeCount;
  private Integer viewCount;
}
