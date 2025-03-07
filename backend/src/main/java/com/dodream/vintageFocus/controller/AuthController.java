package com.dodream.vintageFocus.controller;

import com.dodream.vintageFocus.config.OAuth2Config;
import com.dodream.vintageFocus.security.ProviderTokenHandler;
import com.dodream.vintageFocus.security.TokenRequest;
import com.dodream.vintageFocus.security.TokenResponse;
import com.dodream.vintageFocus.security.UserInfo;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class AuthController {
  private final ProviderTokenHandler providerTokenHandler;

  @PostMapping("/signin")
  public Mono<UserInfo> signIn(@RequestBody TokenRequest request) {
    String provider = request.provider();

    return providerTokenHandler.exchange(request)
      .flatMap(response -> providerTokenHandler.extractUserInfo(provider, response));
  }

}



