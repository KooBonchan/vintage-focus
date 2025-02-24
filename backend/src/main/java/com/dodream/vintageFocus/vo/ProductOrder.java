package com.dodream.vintageFocus.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table("product_order")
public class ProductOrder {
  @Id
  private Long id;
  private Long productId;
  private UUID orderId;
  private Integer quantity;
  private Integer price;
  private Integer sum;
}