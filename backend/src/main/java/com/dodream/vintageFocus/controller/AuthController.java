package com.dodream.vintageFocus.controller;

import com.dodream.vintageFocus.JwtAuthenticationToken;
import com.dodream.vintageFocus.dto.MemberDTO;
import com.dodream.vintageFocus.security.ProviderTokenHandler;
import com.dodream.vintageFocus.security.TokenRequest;
import com.dodream.vintageFocus.service.AuthService;
import com.dodream.vintageFocus.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {
  private final ProviderTokenHandler providerTokenHandler;
  private final AuthService authService;
  private final JwtUtil jwtUtil;

  @PostMapping("signin")
  public Mono<ResponseEntity<MemberDTO>> signIn(@RequestBody TokenRequest request) {
    String provider = request.provider();

    return providerTokenHandler.exchange(request)
      .flatMap(response -> providerTokenHandler.extractUserInfo(provider, response))
      .flatMap(authService::findMemberOrSave)
      .flatMap(memberDTO ->
        jwtUtil.generateAccessToken(memberDTO)
          .map(this::publishAccessTokenCookie)
          .zipWith(
            authService.generateRefreshToken(memberDTO)
              .map(refreshToken -> ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(604800)
                .build()
                .toString()
              )
          )
          .map(cookies -> ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, cookies.getT1())
            .header(HttpHeaders.SET_COOKIE, cookies.getT2())
            .body(memberDTO))
      )
      .onErrorResume(Mono::error);
  }

  @PostMapping("register")
  public Mono<MemberDTO> register(@RequestBody MemberDTO memberDTO){
    return ReactiveSecurityContextHolder.getContext()
      .map(SecurityContext::getAuthentication)
      .map(authentication -> (JwtAuthenticationToken) authentication)
      .flatMap(token -> authService.updateMember(token, memberDTO))
      .onErrorResume(Mono::error);
  }

  @GetMapping("user")
  public Mono<MemberDTO> getUserDetails() {
    return ReactiveSecurityContextHolder.getContext()
      .map(SecurityContext::getAuthentication)
      .flatMap(authentication -> authService.findMember((JwtAuthenticationToken) authentication));
  }

  @PostMapping("refresh")
  public Mono<ResponseEntity<Void>> refreshToken(ServerWebExchange exchange){
    HttpCookie cookie = exchange.getRequest().getCookies().getFirst("refreshToken");
    if(cookie == null) return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());

    String token = cookie.getValue();
    return authService.validateRefreshToken(token)
      .flatMap(jwtUtil::generateAccessToken)
      .map(this::publishAccessTokenCookie)
      .map(_cookie -> ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, _cookie)
        .<Void>build())
      .onErrorResume(e -> Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()));
  }

  private String publishAccessTokenCookie(String accessToken){
    return ResponseCookie.from("accessToken", accessToken)
      .httpOnly(true)
      .secure(false)
      .sameSite("Lax")
      .path("/")
      .domain("localhost")
      .maxAge(3600)
      .build()
      .toString();
  }
}



