package com.dodream.vintageFocus.service;

import com.dodream.vintageFocus.config.OAuth2Config;
import com.dodream.vintageFocus.dto.MemberDTO;
import com.dodream.vintageFocus.mapper.MemberMapper;
import com.dodream.vintageFocus.repository.MemberRepository;
import com.dodream.vintageFocus.repository.RefreshTokenRepository;
import com.dodream.vintageFocus.security.UserInfo;
import com.dodream.vintageFocus.vo.Member;
import com.dodream.vintageFocus.vo.RefreshToken;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
  private final MemberRepository memberRepository;
  private final RefreshTokenRepository refreshTokenRepository;
  private final OAuth2Config config;
  private final MemberMapper memberMapper;

  @Value("${jwt.secret-key}")
  private String STRING_SECRET_KEY;
  @Value("${jwt.expiration-time}")
  private long EXPIRATION_TIME;



  public Mono<MemberDTO> findMember(UserInfo userInfo){
    String provider = userInfo.provider();
    return memberRepository.findByOauthProviderAndOauthId(provider, userInfo.oauthId())
      .map(memberMapper::toMemberDTO)
      .switchIfEmpty(Mono.defer(() -> {
        Member newMember = memberMapper.toMember(userInfo);
        return memberRepository.save(newMember)
          .map(memberMapper::toMemberDTO);
      }))
      .doOnSuccess(memberDTO -> log.info("Extracted user info for provider {}: {}", provider, memberDTO))
      .doOnError(e -> log.error("Error extracting user info for provider {}: {}", provider, e.getMessage()))
      .onErrorResume(e -> Mono.empty());
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
      .claim("isRegistered", memberDTO.isRegistered())
      .issuedAt(Date.from(now))
      .expiration(Date.from(expiration))
      .signWith(SECRET_KEY)
      .compact());
  }
  public Mono<RefreshToken> generateRefreshToken(MemberDTO memberDTO) {
    return Mono.fromCallable(() -> {
      Instant now = Instant.now();
      Instant expiration = now.plusSeconds(604800); // 7 days

      String token = UUID.randomUUID().toString(); // Generate a random refresh token
      RefreshToken refreshToken = new RefreshToken();
      refreshToken.setToken(token);
      refreshToken.setMemberId(memberDTO.getId());
      refreshToken.setIssuedAt(now);
      refreshToken.setExpiresAt(expiration);
      return refreshToken;
    }).flatMap(refreshTokenRepository::save);
  }


  public Mono<Claims> extractClaims(String token) {
    SecretKey SECRET_KEY = Keys.hmacShaKeyFor(Decoders.BASE64.decode(STRING_SECRET_KEY));

    return Mono.fromSupplier(() -> {
      try{
        return Jwts.parser()
          .verifyWith(SECRET_KEY)
          .build()
          .parseSignedClaims(token)
          .getPayload();
      } catch (ExpiredJwtException e) {
        throw new RuntimeException("JWT token has expired", e);
      } catch (JwtException e) {
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
