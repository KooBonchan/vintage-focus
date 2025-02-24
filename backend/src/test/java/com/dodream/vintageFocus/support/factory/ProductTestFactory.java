package com.dodream.vintageFocus.support.factory;

import com.dodream.vintageFocus.vo.Product;
import lombok.Builder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
public class ProductTestFactory {
  private static final String DEFAULT_COMPANY = "TestCompany";
  private static final String DEFAULT_COUNTRY = "TestCountry";
  private static final String DEFAULT_CODE = "TEST-001";
  private static final String DEFAULT_MODEL_NAME = "Default Model";
  private static final String DEFAULT_PRODUCT_NAME = "Default Product";
  private static final String DEFAULT_CATEGORY1 = "Electronics";
  private static final String DEFAULT_CATEGORY2 = "Computers";
  private static final String DEFAULT_CATEGORY3 = "Laptops";
  private static final Short DEFAULT_CONDITION = 1;
  private static final Integer DEFAULT_STOCK = 100;
  private static final Integer DEFAULT_CONSUMER_PRICE = 1000000;
  private static final Integer DEFAULT_SELLING_PRICE = 900000;
  private static final Integer DEFAULT_RENTAL_PRICE = 50000;
  private static final Integer DEFAULT_REVIEW_COUNT = 0;
  private static final Integer DEFAULT_LIKE_COUNT = 0;
  private static final Integer DEFAULT_VIEW_COUNT = 0;

  @Builder
  public static class ProductTestData {
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
  }

  public Product createDefault() {
    return createProduct(ProductTestData.builder().build());  // Empty builder will trigger all defaults
  }

  public Product createProduct(ProductTestData data) {
    return Product.builder()
      .code(data.code != null ? data.code : DEFAULT_CODE)
      .modelName(data.modelName != null ? data.modelName : DEFAULT_MODEL_NAME)
      .productName(data.productName != null ? data.productName : DEFAULT_PRODUCT_NAME)
      .company(data.company != null ? data.company : DEFAULT_COMPANY)
      .country(data.country != null ? data.country : DEFAULT_COUNTRY)
      .category1(data.category1 != null ? data.category1 : DEFAULT_CATEGORY1)
      .category2(data.category2 != null ? data.category2 : DEFAULT_CATEGORY2)
      .category3(data.category3 != null ? data.category3 : DEFAULT_CATEGORY3)
      .condition(data.condition != null ? data.condition : DEFAULT_CONDITION)
      .stock(data.stock != null ? data.stock : DEFAULT_STOCK)
      .consumerPrice(data.consumerPrice != null ? data.consumerPrice : DEFAULT_CONSUMER_PRICE)
      .sellingPrice(data.sellingPrice != null ? data.sellingPrice : DEFAULT_SELLING_PRICE)
      .rentalPrice(data.rentalPrice != null ? data.rentalPrice : DEFAULT_RENTAL_PRICE)
      .reviewCount(data.reviewCount != null ? data.reviewCount : DEFAULT_REVIEW_COUNT)
      .likeCount(data.likeCount != null ? data.likeCount : DEFAULT_LIKE_COUNT)
      .viewCount(data.viewCount != null ? data.viewCount : DEFAULT_VIEW_COUNT)
      .build();
  }

  public List<Product> createProductBatch(int count) {
    return IntStream.range(0, count)
      .mapToObj(i -> createProduct(ProductTestData.builder()
        .code("TEST-" + String.format("%03d", i + 1))
        .modelName("Test Model " + (i + 1))
        .productName("Test Product " + (i + 1))
        .build()))  // All other fields will use defaults
      .collect(Collectors.toList());
  }
}