package com.dodream.vintageFocus.dto;

import com.dodream.vintageFocus.vo.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {
  private UUID id; // 주문번호
  private Long memberId;

  private Integer sumProduct;
  private Integer deliveryFee;
  private Integer totalPrice;
  private String expireDate;

  private List<CartProductDTO> products;
}
