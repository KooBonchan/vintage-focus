package com.dodream.vintageFocus.vo;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.time.Instant;

@Data
public class RefreshToken {
  @Id
  private Long id;
  private String token;
  private Long memberId;
  private Instant issuedAt;
  private Instant expiresAt;
}
