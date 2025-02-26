package com.dodream.vintageFocus.vo;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table("product_payment")
public class ProductPayment {
  @Id
  private Long id;
  private Long productId;
  private UUID paymentId;
  private Integer quantity;
  private Integer price;
  private Integer subtotal;

}