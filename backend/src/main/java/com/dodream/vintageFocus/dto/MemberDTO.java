package com.dodream.vintageFocus.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {
  private String username;
  private String phone;
  private String address;
  private String detailAddress;
  private String zipcode;
}
