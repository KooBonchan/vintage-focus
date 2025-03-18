package com.dodream.vintageFocus.security;

import com.dodream.vintageFocus.JwtAuthenticationToken;
import com.dodream.vintageFocus.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter implements WebFilter {
  @Autowired
  private JwtUtil jwtUtil;

  @Override
  public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
    String token = getTokenFromRequest(exchange);
    if(token == null) return chain.filter(exchange);

    return jwtUtil.extractClaims(token)
      .flatMap(claims -> {
        String oauthId = claims.getSubject();
        String provider = claims.get("provider", String.class);
        String username = claims.get("username", String.class);
        String role = claims.get("role", String.class);
        boolean isRegistered = claims.get("isRegistered", Boolean.class);

        JwtAuthenticationToken authToken = new JwtAuthenticationToken(
          oauthId, provider, username, role, isRegistered
        );

        return chain.filter(exchange)
          .contextWrite(ReactiveSecurityContextHolder.withAuthentication(authToken));
      })
      .onErrorResume(SecurityException.class, e -> {
        return chain.filter(exchange);
      });


  }

  private String getTokenFromRequest(ServerWebExchange exchange) {
    String token = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
    if(token == null || !token.startsWith("Bearer ")) return null;
    return token.substring(7);
  }
}
