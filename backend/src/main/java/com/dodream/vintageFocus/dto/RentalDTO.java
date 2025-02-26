package com.dodream.vintageFocus.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RentalDTO {
  private MemberDTO memberDTO;
  private ProductDTO productDTO;

  private Integer rentalFee;
  private Integer totalPrice;
  private Instant paymentTimestamp;
  private Instant rentalTimestamp;
  private Instant returnTimestamp;

  private Boolean isDelayed;

}
