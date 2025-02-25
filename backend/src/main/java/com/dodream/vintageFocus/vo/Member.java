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

  private String username;
  private String password;
  private String phone;
  private String address;
  private String detailAddress;
  private String zipcode;
  private String role;

  // Custom validation method example
  public boolean isValidZipcode() {
    return zipcode != null && zipcode.matches("\\d{5}");
  }

  // Custom method to mask sensitive data for logging
  public Member maskSensitiveData() {
    return Member.builder()
      .id(this.id)
      .username(this.username)
      .password("*****")
      .phone(maskPhone(this.phone))
      .address(this.address)
      .detailAddress(this.detailAddress)
      .zipcode(this.zipcode)
      .role(this.role)
      .build();
  }

  private String maskPhone(String phone) {
    if (phone == null || phone.length() < 8) return phone;
    return phone.substring(0, 3) + "****" + phone.substring(phone.length() - 4);
  }

  // Factory method for creating a new member with default role
  public static Member createNewMember(String username, String password, String phone) {
    return Member.builder()
      .username(username)
      .password(password)
      .phone(phone)
      .role("USER")
      .build();
  }
}