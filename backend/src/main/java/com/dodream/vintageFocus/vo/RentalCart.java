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
@Table("rental_cart")
public class RentalCart {
  @Id
  private Long id;
  private Long rentalId;
  private UUID cartId;
  private Integer quantity;
  private Integer price;
  private Integer sum;

  // Custom method to format sum for display
  public String getFormattedSum() {
    if (sum == null) {
      return "0";
    }
    return String.format("%,d", sum);
  }
}