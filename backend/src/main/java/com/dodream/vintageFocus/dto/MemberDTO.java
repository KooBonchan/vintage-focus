package com.dodream.vintageFocus.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDTO {
  private Long id;
  private String oauthProvider;
  private String oauthId;
  private String username;
  private String profileImage;
  private String phone;
  private String address;
  private String detailAddress;
  private String zipcode;

  private String role;
  private Boolean isRegistered;
  private String refreshToken;

}