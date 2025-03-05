package com.dodream.vintageFocus.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import javax.crypto.SecretKey;
import java.util.*;
import java.util.stream.Collectors;

@Component
@Slf4j
public class JwtTokenProvider {

  private String STRING_SECRET_KEY;
  private long EXPIRATION_TIME;
  private SecretKey SECRET_KEY;

  public JwtTokenProvider(
    @Value("${jwt.secret-key}") String STRING_SECRET_KEY,
    @Value("${jwt.expiration-time}") long EXPIRATION_TIME) {
    this.STRING_SECRET_KEY = STRING_SECRET_KEY;
    this.EXPIRATION_TIME = EXPIRATION_TIME;
    this.SECRET_KEY = Keys.hmacShaKeyFor(Decoders.BASE64.decode(STRING_SECRET_KEY));
  }

  public String getSecretKeyBase64() {
    return STRING_SECRET_KEY;
  }

  public Mono<String> generateToken(Authentication authentication) {
    return Mono.fromSupplier(() -> {
      if (authentication != null) {
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        Map<String, Object> claims = new HashMap<>();

        // Extract user details from OAuth2 principal
        Map<String, Object> attributes = oauthToken.getPrincipal().getAttributes();

        claims.put("sub", attributes.get("email")); // Using email as subject
        claims.put("name", attributes.get("name"));
        claims.put("picture", attributes.get("picture"));

        // Add roles/authorities if available
        claims.put("roles", authentication.getAuthorities().stream()
          .map(GrantedAuthority::getAuthority)
          .collect(Collectors.toList()));

        return Jwts.builder()
          .setClaims(claims)
          .setIssuedAt(new Date())
          .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
          .signWith(SECRET_KEY)
          .compact();
      }
      throw new IllegalArgumentException("Unsupported authentication type");
    });
  }

  public Mono<Claims> extractClaims(String token) {
    return Mono.fromSupplier(() -> {
      try{
        return Jwts.parser()
          .verifyWith(SECRET_KEY)
          .build()
          .parseSignedClaims(token)
          .getPayload();
      } catch (ExpiredJwtException e) {
        // Token is expired
        throw new RuntimeException("JWT token has expired", e);
      } catch (JwtException e) {
        // Other JWT-related exceptions (signature invalid, malformed, etc.)
        throw new RuntimeException("Invalid JWT token", e);
      }

    });
  }

  public Mono<Boolean> validateToken(String token) {
    return extractClaims(token)
      .map(claims -> {
        // Check if token is expired
        Date expiration = claims.getExpiration();
        return expiration != null && expiration.after(new Date());
      })
      .onErrorResume(error -> {
        // Log validation errors
        log.error("Token validation failed", error);
        return Mono.just(false);
      });
  }

  public Mono<Authentication> getAuthentication(String token){
    return extractClaims(token)
      .map(claims -> {
        String subject = claims.getSubject();

        List<SimpleGrantedAuthority> authorities = Collections.emptyList();
        return (Authentication) new UsernamePasswordAuthenticationToken(subject, token, authorities);
      })
      .onErrorResume(error -> {
        // Log validation errors
        log.error("Token validation failed", error);
        return Mono.empty();
      });
  }
}
