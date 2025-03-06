package com.dodream.vintageFocus.controller;

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

  public AuthController(WebClient.Builder webClientBuilder) {
    this.webClient = webClientBuilder.build();
  }

  @Value("${oauth2.google.client-id}")
  private String googleClientId;
  @Value("${oauth2.kakao.client-id}")
  private String kakaoClientId;
  @Value("${oauth2.github.client-id}")
  private String githubClientId;

  @Value("${oauth2.google.client-secret}")
  private String googleClientSecret;


  @PostMapping("/exchange")
  public Mono<TokenResponse> exchangeCodeForTokens(@RequestBody TokenRequest request) {

    log.debug("Received token exchange request: provider={}, code={}, redirectUri={}, codeVerifier={}",
      request.provider(), request.code(), request.redirectUri(), request.codeVerifier());


    String provider = request.provider();
    String tokenUrl;
    String clientId;

    switch (provider) {
      case "google":
        tokenUrl = "https://oauth2.googleapis.com/token";
        clientId = googleClientId;
        break;
      case "kakao":
        tokenUrl = "https://kauth.kakao.com/oauth/token";
        clientId = kakaoClientId;
        break;
      case "github":
        tokenUrl = "https://github.com/login/oauth/access_token";
        clientId = githubClientId;
        break;
      default:
        return Mono.error(new IllegalArgumentException("Unknown provider: " + provider));
    }

    String requestBody = new StringBuilder()
      .append("client_id=").append(clientId)
      .append("&code=").append(request.code())
      .append("&redirect_uri=").append(request.redirectUri())
      .append("&code_verifier=").append(request.codeVerifier())
      .append("&grant_type=authorization_code")
      .toString();

    if(provider.equals("google")){
      requestBody = requestBody + "&client_secret=" + googleClientSecret;
    }

    log.debug("Sending token request to {} with body: {}", tokenUrl, requestBody);

    return webClient.post()
      .uri(tokenUrl)
      .contentType(MediaType.APPLICATION_FORM_URLENCODED)
      .bodyValue(requestBody)
      .retrieve()
      .onStatus(HttpStatusCode::is4xxClientError, clientResponse ->
        clientResponse.bodyToMono(String.class)
          .flatMap(errorBody -> {
            log.debug("Error response from {}: {}", provider, errorBody);
            return Mono.error(new RuntimeException("Token exchange failed: " + errorBody));
          }))
      .bodyToMono(TokenResponse.class)
      .doOnSuccess(response ->
        log.debug("Received successful response for {}: access_token={}, id_token={}, refresh_token={}, expires_in={}",
          provider, response.access_token(), response.id_token(), response.refresh_token(), response.expires_in()))
      .doOnError(error ->
        log.debug("Error during token exchange for {}: {}", provider, error.getMessage()));
  }

  record TokenRequest(
    String provider,
    String code,
    String codeVerifier,
    String redirectUri
  ) {}
  record TokenResponse(
    String access_token,
    String id_token,
    String refresh_token,
    Integer expires_in
  ) {}
}



