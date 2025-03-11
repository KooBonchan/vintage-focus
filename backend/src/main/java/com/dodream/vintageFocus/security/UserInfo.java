package com.dodream.vintageFocus.security;

public record UserInfo(
  String provider,
  String oauthId,
  String username,
  String profileImageUrl
) {
}
