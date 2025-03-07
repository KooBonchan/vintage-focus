package com.dodream.vintageFocus.security;

import com.dodream.vintageFocus.config.OAuth2Config;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

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
    OAuth2Config.Provider providerConfig = config.getProvider(provider);
    if(provider.equals("google")) return decodeGoogleIdToken(tokenResponse.id_token());
    return fetchUserInfo(tokenResponse.access_token(), provider);
  }

  private Mono<UserInfo> decodeGoogleIdToken(String idToken){
    return Mono.just(new UserInfo("google", "12345", "IAM", "about:blank"));
  }

  private Mono<UserInfo> fetchUserInfo(String accessToken, String provider){
    if(provider.equals("google")) return Mono.empty();
    log.warn(accessToken);
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
        (String) response.get(infoConfig.columnUsername()),
        (String) response.get(infoConfig.columnProfile())
      ))
      .doOnSuccess(userInfo -> log.info("{}: {}",provider, userInfo));
  }

}
