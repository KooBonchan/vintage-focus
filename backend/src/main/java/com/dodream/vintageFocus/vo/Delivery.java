package com.dodream.vintageFocus.vo;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table("Delivery")
public class Delivery {
  @Id
  private UUID id;
  private Long memberId;
  private String status;
  private Instant orderDate;
  private String address;
  private String detailAddress;
  private String zipcode;
  private String recipientName;
  private String recipientPhone;

}