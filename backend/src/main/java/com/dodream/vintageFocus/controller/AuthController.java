package com.dodream.vintageFocus.controller;

import com.dodream.vintageFocus.dto.MemberDTO;
import com.dodream.vintageFocus.security.ProviderTokenHandler;
import com.dodream.vintageFocus.security.TokenRequest;
import com.dodream.vintageFocus.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.security.Principal;

@Slf4j
@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {
  private final ProviderTokenHandler providerTokenHandler;
  private final AuthService authService;

  @PostMapping("/signin")
  public Mono<ResponseEntity<MemberDTO>> signIn(@RequestBody TokenRequest request) {
    String provider = request.provider();

    return providerTokenHandler.exchange(request)
      .flatMap(response -> providerTokenHandler.extractUserInfo(provider, response))
      .flatMap(authService::findMember)
      .flatMap(memberDTO ->
        authService.generateAccessToken(memberDTO)
//          .zipWith(authService.generateRefreshToken(memberDTO))
//          .map(tuple -> {
//            String accessToken = tuple.getT1();
//            String refreshToken = tuple.getT2().getToken();
//
//          })
        .map(jwt ->
          ResponseEntity.ok()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwt)
            .body(memberDTO)
        ))
      .onErrorResume(Mono::error);
  }

//  @GetMapping()
//  public Mono<MemberDTO> memberInfo(@AuthenticationPrincipal Principal principal){
//  }

}



