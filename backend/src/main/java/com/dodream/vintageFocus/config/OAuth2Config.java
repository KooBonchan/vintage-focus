package com.dodream.vintageFocus.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "oauth2")
public record OAuth2Config (
  Provider google,
  Provider kakao,
  Provider github,
  String redirectUri
) {
  public record Provider(
    String clientId,
    String clientSecret,
    String tokenUrl,
    UserInfo userInfo
  ) {
    public record UserInfo(
      String url,
      String columnUsername,
      String columnProfile
    ) {}
  }

  public Provider getProvider(String provider){
    return switch(provider) {
      case "google" -> google;
      case "kakao" -> kakao;
      case "github" -> github;
      default -> null;
    };
  }
}