package com.dodream.vintageFocus.service;

import com.dodream.vintageFocus.dto.MemberDTO;
import com.dodream.vintageFocus.mapper.MemberMapper;
import com.dodream.vintageFocus.repository.MemberRepository;
import com.dodream.vintageFocus.repository.RefreshTokenRepository;
import com.dodream.vintageFocus.security.UserInfo;
import com.dodream.vintageFocus.vo.Member;
import com.dodream.vintageFocus.vo.RefreshToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
  private final MemberRepository memberRepository;
  private final RefreshTokenRepository refreshTokenRepository;
  private final MemberMapper memberMapper;

  public Mono<MemberDTO> findMemberOrSave(UserInfo userInfo){
    return findMember(userInfo.provider(), userInfo.oauthId())
      .switchIfEmpty(Mono.defer(() -> {
        Member newMember = memberMapper.toMember(userInfo);
        return memberRepository.save(newMember)
          .map(memberMapper::toMemberDTO);
      }))
      .onErrorResume(e -> Mono.empty());
  }

  public Mono<MemberDTO> findMember(String provider, String oAuthId){
    return memberRepository.findByOauthProviderAndOauthId(provider, oAuthId)
      .map(memberMapper::toMemberDTO)
      .doOnSuccess(memberDTO -> log.info("Extracted user info for provider {}: {}", provider, memberDTO))
      .doOnError(e -> log.error("Error extracting user info for provider {}: {}", provider, e.getMessage()))
      .onErrorResume(e -> Mono.empty());
  }


  public Mono<String> generateRefreshToken(MemberDTO memberDTO) {
    return Mono.fromCallable(() -> {
      Instant now = Instant.now();
      Instant expiration = now.plusSeconds(604800); // 7 days

      String token = UUID.randomUUID().toString(); // Generate a random refresh token
      RefreshToken refreshToken = new RefreshToken();
      refreshToken.setToken(token);
      refreshToken.setMemberId(memberDTO.getId());
      refreshToken.setIssuedAt(now);
      refreshToken.setExpiresAt(expiration);
      return refreshToken;
    }).flatMap(refreshTokenRepository::save)
      .map(RefreshToken::getToken);
  }

  public Mono<MemberDTO> validateRefreshToken(String refreshToken){
    return refreshTokenRepository.findByToken(refreshToken)
      .map(RefreshToken::getId)
      .flatMap(memberRepository::findById)
      .map(memberMapper::toMemberDTO);
  }

}
