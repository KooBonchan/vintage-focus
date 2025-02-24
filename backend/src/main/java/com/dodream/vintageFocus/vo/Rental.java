package com.dodream.vintageFocus.vo;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table("rental")
public class Rental {
  @Id
  private Long id;

  private Long memberId;
  private Integer rentalFee;
  private Integer deliveryFee;
  private Integer totalPrice;
  private Instant paymentTimestamp;
  private Instant rentalTimestamp;
  private Instant returnTimestamp;
  private Boolean isDelayed;
  private Long productId;

  // Business Logic: if return timestamp has passed
  public boolean isCurrentlyDelayed() {
    if (returnTimestamp != null || rentalTimestamp == null || isDelayed == null) {
      return false;
    }
    return isDelayed;
  }
}