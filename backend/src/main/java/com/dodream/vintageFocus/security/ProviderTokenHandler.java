package com.dodream.vintageFocus.security;

import com.dodream.vintageFocus.config.OAuth2Config;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Collections;
import java.util.Map;

@Service
@Slf4j
public class ProviderTokenHandler {
  private final WebClient webClient;
  private final OAuth2Config config;

  public ProviderTokenHandler(WebClient.Builder webClientBuilder, OAuth2Config config) {
    this.webClient = webClientBuilder.build();
    this.config = config;
  }

  public Mono<TokenResponse> exchange(TokenRequest request){
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

  public Mono<UserInfo> extractUserInfo(String provider, TokenResponse tokenResponse) {
    if(provider.equals("google")) return decodeGoogleIdToken(tokenResponse.id_token());
    return fetchUserInfo(provider, tokenResponse.access_token());
  }

  private Mono<UserInfo> decodeGoogleIdToken(String idToken){
    return Mono.fromCallable(() -> {
      GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
        .setAudience(Collections.singletonList(config.getProvider("google").clientId()))
        .build();
      GoogleIdToken googleIdToken = verifier.verify(idToken);
      if(googleIdToken == null) {
        throw new IllegalArgumentException("Invalid Google ID Token");
      }

      GoogleIdToken.Payload payload = googleIdToken.getPayload();

      String userId = payload.getSubject();
      String username = (String) payload.get("name");
      String profilePicture = (String) payload.get("picture");

      return new UserInfo("google", userId, username, profilePicture);
    }).doOnError(e -> log.error("Error decoding Google ID token", e))
      .onErrorResume(IllegalArgumentException.class, e -> Mono.empty());
  }

  private Mono<UserInfo> fetchUserInfo(String provider, String accessToken){
    if(provider.equals("google")) return Mono.empty();
    OAuth2Config.Provider providerConfig = config.getProvider(provider);
    if(providerConfig == null) return Mono.empty();
    OAuth2Config.Provider.UserInfo infoConfig = providerConfig.userInfo();
    return webClient.get()
      .uri(infoConfig.url())
      .header("Authorization", "Bearer " + accessToken)
      .retrieve()
      .bodyToMono(Map.class)
      .map(response -> new UserInfo(provider,
        response.get("id").toString(),
        extractNestedField(response, infoConfig.columnUsername()),
        extractNestedField(response, infoConfig.columnProfile())
      ))
      .doOnSuccess(userInfo -> log.warn("{}: {}",provider, userInfo));
  }

  private String extractNestedField(Map<String, Object> response, String fieldPath) {
    if (fieldPath == null || fieldPath.isEmpty()) {
      return null;
    }

    String[] parts = fieldPath.split("\\.");
    Object current = response;
    for (String part : parts) {
      if (current instanceof Map) {
        current = ((Map<?, ?>) current).get(part);
        if (current == null) {
          return null;
        }
      } else {
        return null;
      }
    }
    return current != null ? current.toString() : null;
  }
}
