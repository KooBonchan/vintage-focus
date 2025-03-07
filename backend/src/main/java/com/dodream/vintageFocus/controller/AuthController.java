package com.dodream.vintageFocus.controller;

import com.dodream.vintageFocus.config.OAuth2Config;
import com.dodream.vintageFocus.security.TokenRequest;
import com.dodream.vintageFocus.security.TokenResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequestMapping("api/auth")
public class AuthController {
  private final WebClient webClient;
  private final OAuth2Config config;

  public AuthController(WebClient.Builder webClientBuilder, OAuth2Config config) {
    this.webClient = webClientBuilder.build();
    this.config = config;
  }

  @PostMapping("/exchange")
  public Mono<TokenResponse> exchangeCodeForTokens(@RequestBody TokenRequest request) {

    String provider = request.provider();
    OAuth2Config.Provider providerConfig = config.getProvider(provider);

    if(providerConfig == null){
      return Mono.error(new IllegalArgumentException("Unknown provider: " + provider));
    }

    String requestBody = new StringBuilder()
      .append("client_id=").append(providerConfig.clientId())
      .append("&client_secret=").append(providerConfig.clientSecret())
      .append("&code=").append(request.code())
      .append("&redirect_uri=").append(config.redirectUri())
      .append("&code_verifier=").append(request.codeVerifier())
      .append("&grant_type=authorization_code")
      .toString();

    return webClient.post()
      .uri(providerConfig.tokenUrl())
      .contentType(MediaType.APPLICATION_FORM_URLENCODED)
      .header("Accept", "application/json;charset=utf-8")
      .bodyValue(requestBody)
      .retrieve()
      .onStatus(HttpStatusCode::is4xxClientError, clientResponse ->
        clientResponse.bodyToMono(String.class)
          .flatMap(errorBody -> Mono.error(new RuntimeException("Token exchange failed for " + provider + ": " + errorBody))))
      .bodyToMono(TokenResponse.class);
  }

}



