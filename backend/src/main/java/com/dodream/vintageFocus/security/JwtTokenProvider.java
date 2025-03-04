package com.dodream.vintageFocus.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Component
public class JwtTokenProvider {


  private long EXPIRATION_TIME;
  private SecretKey SECRET_KEY;

  public JwtTokenProvider(
    @Value("${jwt.secret-key}") String STRING_SECRET_KEY,
    @Value("${jwt.expiration-time}") long EXPIRATION_TIME) {
    this.EXPIRATION_TIME = EXPIRATION_TIME;
    this.SECRET_KEY = Keys.hmacShaKeyFor(Decoders.BASE64.decode(STRING_SECRET_KEY));
  }

  public Mono<Authentication> getAuthentication(String token){
    try{
      var claims = Jwts.parser()
        .verifyWith(SECRET_KEY)
        .build()
        .parseSignedClaims(token)
        .getPayload();

      String subject = claims.getSubject();

      List<SimpleGrantedAuthority> authorities = Collections.emptyList();
      Authentication authentication = new UsernamePasswordAuthenticationToken(subject, token, authorities);
      return Mono.just(authentication);
    } catch(Exception e){
      return Mono.empty();
    }
  }

}
