package com.dodream.vintageFocus.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter implements WebFilter {
  private final JwtTokenProvider jwtTokenProvider;

  @Override
  public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
    String token = getTokenFromRequest(exchange);

    if(token != null){
      return Mono.just(token)
        .flatMap(jwtTokenProvider::getAuthentication)
        .flatMap(auth ->
          chain.filter(exchange)
            .contextWrite(ReactiveSecurityContextHolder
              .withAuthentication(auth)))
        .switchIfEmpty(chain.filter(exchange));
    }
    return chain.filter(exchange);
  }

  private String getTokenFromRequest(ServerWebExchange exchange) {
    String bearerToken = exchange.getRequest().getHeaders().getFirst("Authorization");
    if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7); // Remove "Bearer " prefix
    }
    return null;
  }
}
