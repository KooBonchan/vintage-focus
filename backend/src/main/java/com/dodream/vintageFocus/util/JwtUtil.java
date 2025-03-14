package com.dodream.vintageFocus.util;

import com.dodream.vintageFocus.dto.MemberDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;

@Component
@Slf4j
public class JwtUtil {
  @Value("${JWT_SECRET_KEY}")
  private String STRING_SECRET_KEY;
  @Value("${jwt.expiration-time}")
  private long EXPIRATION_TIME;

  private SecretKey getSecretKey() {
    return Keys.hmacShaKeyFor(Base64.getDecoder().decode(STRING_SECRET_KEY));
  }

  public Mono<String> generateAccessToken(MemberDTO memberDTO){
    SecretKey SECRET_KEY = Keys.hmacShaKeyFor(Decoders.BASE64.decode(STRING_SECRET_KEY));
    Instant now = Instant.now();
    Instant expiration = now.plusSeconds(EXPIRATION_TIME);

    return Mono.fromCallable(() -> Jwts.builder()
      .subject(memberDTO.getOauthId())
      .claim("provider", memberDTO.getOauthProvider())
      .claim("username", memberDTO.getUsername())
      .claim("role", memberDTO.getRole())
      .claim("isRegistered", memberDTO.getIsRegistered())
      .issuedAt(Date.from(now))
      .expiration(Date.from(expiration))
      .signWith(SECRET_KEY)
      .compact());
  }

  public Mono<Claims> extractClaims(String token) {
    return Mono.fromSupplier(() -> {
      try{
        return Jwts.parser()
          .verifyWith(getSecretKey())
          .build()
          .parseSignedClaims(token)
          .getPayload();
      } catch (ExpiredJwtException e) {
        throw new RuntimeException("JWT token has expired", e);
      } catch (JwtException e) {
        throw new RuntimeException("Invalid JWT token", e);
      } catch (Exception e) {
        log.error("Error validating JWT token: {}", e.getMessage());
        throw new SecurityException("Token validation error");
      }
    });
  }

  public Mono<String> getSubject(String token) {
    return extractClaims(token)
      .map(Claims::getSubject);
  }
  public Mono<Object> getClaim(String token, String claimName) {
    return extractClaims(token)
      .map(claims -> claims.get(claimName));
  }
}
