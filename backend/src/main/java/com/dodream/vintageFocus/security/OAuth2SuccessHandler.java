package com.dodream.vintageFocus.security;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.server.WebFilterExchange;
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.net.URI;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements ServerAuthenticationSuccessHandler {
  private final JwtTokenProvider jwtTokenProvider;

  @Override
  public Mono<Void> onAuthenticationSuccess(WebFilterExchange webFilterExchange, Authentication authentication) {
    ServerWebExchange exchange = webFilterExchange.getExchange();

    if(authentication != null){
      return jwtTokenProvider.generateToken(authentication)
        .flatMap(jwt -> {
          UriComponentsBuilder redirectUrlBuilder = UriComponentsBuilder
            .fromUriString("http://localhost:3000/oauth2/redirect")
            .queryParam("access_token", jwt);
          ServerHttpResponse response= exchange.getResponse();
          response.setStatusCode(HttpStatus.FOUND);
          response.getHeaders().setLocation(
            URI.create(redirectUrlBuilder.toUriString())
          );
          return response.setComplete();
        });
    }
    return Mono.empty();
  }
}
