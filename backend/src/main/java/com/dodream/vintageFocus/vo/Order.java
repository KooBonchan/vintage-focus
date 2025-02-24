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
@Table("Order")
public class Order {
  @Id
  private UUID id;

  private Integer sumProduct;
  private Integer deliveryFee;
  private Integer totalPrice;
  private String expireDate;
  private Long memberId;

  // Custom method to format total price for display
  public String getFormattedTotalPrice() {
    if (totalPrice == null) {
      return "0";
    }
    return String.format("%,d", totalPrice);
  }
}