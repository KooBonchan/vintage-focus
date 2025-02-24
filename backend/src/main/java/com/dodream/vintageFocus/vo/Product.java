package com.dodream.vintageFocus.vo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.*;
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

  @NotBlank(message = "Product code is required")
  @Size(max = 63, message = "Code cannot exceed 63 characters")
  @Column("code")
  private String code;

  @Size(max = 63, message = "Model name cannot exceed 63 characters")
  @Column("model_name")
  private String modelName;

  @NotBlank(message = "Product name is required")
  @Size(max = 255, message = "Product name cannot exceed 255 characters")
  @Column("product_name")
  private String productName;

  @Size(max = 63, message = "Company name cannot exceed 63 characters")
  @Column("company")
  private String company;

  @Size(max = 63, message = "Country name cannot exceed 63 characters")
  @Column("country")
  private String country;

  @Size(max = 63, message = "Category cannot exceed 63 characters")
  @Column("category_1")
  private String category1;

  @Size(max = 63, message = "Category cannot exceed 63 characters")
  @Column("category_2")
  private String category2;

  @Size(max = 63, message = "Category cannot exceed 63 characters")
  @Column("category_3")
  private String category3;

  @NotNull(message = "Product condition is required")
  @Column("condition")
  private ProductCondition condition;

  @PositiveOrZero(message = "Stock cannot be negative")
  @Column("stock")
  private Integer stock;

  @PositiveOrZero(message = "Consumer price cannot be negative")
  @Column("consumer_price")
  private Integer consumerPrice;

  @PositiveOrZero(message = "Selling price cannot be negative")
  @Column("selling_price")
  private Integer sellingPrice;

  @PositiveOrZero(message = "Rental price cannot be negative")
  @Column("rental_price")
  private Integer rentalPrice;

  @PositiveOrZero(message = "Review count cannot be negative")
  @Column("review_count")
  private Integer reviewCount;

  @PositiveOrZero(message = "Like count cannot be negative")
  @Column("like_count")
  private Integer likeCount;

  @PositiveOrZero(message = "View count cannot be negative")
  @Column("view_count")
  private Integer viewCount;

  @AllArgsConstructor
  @Getter
  public enum ProductCondition{
    MINT(5, "New or like new condition"),
    EXCELLENT(4, "Minor wear, fully functional"),
    GOOD(3, "Normal wear, fully functional"),
    FAIR(2, "Significant wear, works properly"),
    POOR(1, "Heavy wear, may need repair");

    private final int value;
    private final String description;

    public static ProductCondition fromValue(int value) {
      for (ProductCondition condition : ProductCondition.values()) {
        if (condition.value == value) {
          return condition;
        }
      }
      throw new IllegalArgumentException("Invalid product condition value: " + value);
    }
  }
}

