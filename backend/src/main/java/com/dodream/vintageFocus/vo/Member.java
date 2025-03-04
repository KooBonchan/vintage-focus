package com.dodream.vintageFocus.vo;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table("member")
public class Member {
  @Id
  private Long id;

  private String oauthProvider;
  private String oauthId;
  private String email;
  private String username;

  private String phone;
  private String address;
  private String detailAddress;
  private String zipcode;
  private String role;

  // Custom validation method example
  public boolean isValidZipcode() {
    return zipcode != null && zipcode.matches("\\d{5}");
  }

  private String maskPhone(String phone) {
    if (phone == null || phone.length() < 8) return phone;
    return phone.substring(0, 3) + "****" + phone.substring(phone.length() - 4);
  }

}