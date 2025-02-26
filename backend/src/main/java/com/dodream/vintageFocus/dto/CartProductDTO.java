package com.dodream.vintageFocus.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartProductDTO {
  private ProductDTO product;
  private Integer quantity;
  private Integer price;
  private Integer subtotal;
}
