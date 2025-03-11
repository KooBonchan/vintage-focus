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
@Table("member")
public class Member {
  @Id
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

  private Instant createdAt;
  private Instant updatedAt;
}