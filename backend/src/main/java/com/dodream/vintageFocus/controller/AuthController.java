package com.dodream.vintageFocus.controller;

import com.dodream.vintageFocus.JwtAuthenticationToken;
import com.dodream.vintageFocus.dto.MemberDTO;
import com.dodream.vintageFocus.security.ProviderTokenHandler;
import com.dodream.vintageFocus.security.TokenRequest;
import com.dodream.vintageFocus.service.AuthService;
import com.dodream.vintageFocus.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {
  private final ProviderTokenHandler providerTokenHandler;
  private final AuthService authService;
  private final JwtUtil jwtUtil;

  @PostMapping("/signin")
  public Mono<ResponseEntity<MemberDTO>> signIn(@RequestBody TokenRequest request) {
    String provider = request.provider();

    return providerTokenHandler.exchange(request)
      .flatMap(response -> providerTokenHandler.extractUserInfo(provider, response))
      .flatMap(authService::findMemberOrSave)
      .flatMap(authService::appendRefreshToken)
      .flatMap(memberDTO ->
        jwtUtil.generateAccessToken(memberDTO)
          .map(accessToken -> ResponseEntity.ok()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
            .body(memberDTO)))
      .onErrorResume(Mono::error);
  }

  @GetMapping("/user")
  public Mono<MemberDTO> getUserDetails() {
    return ReactiveSecurityContextHolder.getContext()
      .map(SecurityContext::getAuthentication)
      .flatMap(authentication -> {
        JwtAuthenticationToken authToken = (JwtAuthenticationToken) authentication;

        return authService.findMember((String) authToken.getDetails(), (String) authToken.getPrincipal());
      });
  }

}



