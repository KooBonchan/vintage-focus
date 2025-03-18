package com.dodream.vintageFocus.controller;

import com.dodream.vintageFocus.JwtAuthenticationToken;
import com.dodream.vintageFocus.dto.MemberDTO;
import com.dodream.vintageFocus.security.ProviderTokenHandler;
import com.dodream.vintageFocus.security.TokenRequest;
import com.dodream.vintageFocus.service.AuthService;
import com.dodream.vintageFocus.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

  @Value("${client-uri}")
  private String clientUri;

  @PostMapping("signin")
  public Mono<ResponseEntity<MemberDTO>> signIn(@RequestBody TokenRequest request) {
    String provider = request.provider();

    return providerTokenHandler.exchange(request)
      .flatMap(response -> providerTokenHandler.extractUserInfo(provider, response))
      .flatMap(authService::findMemberOrSave)
      .flatMap(memberDTO ->
        jwtUtil.generateAccessToken(memberDTO)
          .zipWith(authService.generateRefreshToken(memberDTO)
          )
          .map(tokens -> {
            memberDTO.setRefreshToken(tokens.getT2());
            return ResponseEntity.ok()
              .header(HttpHeaders.AUTHORIZATION, tokens.getT1())
              .body(memberDTO);
          })
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

  public static record RefreshTokenDTO(String token){}

  @PostMapping("refresh")
  public Mono<ResponseEntity<Void>> refreshToken(RefreshTokenDTO token){

    if(token == null || token.token().isEmpty()) return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());

    return authService.validateRefreshToken(token.token())
      .flatMap(jwtUtil::generateAccessToken)
      .map(accessToken -> ResponseEntity.ok()
        .header(HttpHeaders.AUTHORIZATION, accessToken)
        .<Void>build())
      .onErrorResume(e -> Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()));
  }

}
