package com.dodream.vintageFocus.security;

public record TokenRequest(
  String provider,
  String code,
  String codeVerifier
) {}