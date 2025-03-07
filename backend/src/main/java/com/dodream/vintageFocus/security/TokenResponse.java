package com.dodream.vintageFocus.security;

public record TokenResponse(
  String access_token,
  String id_token,
  String refresh_token,
  Integer expires_in
) {}