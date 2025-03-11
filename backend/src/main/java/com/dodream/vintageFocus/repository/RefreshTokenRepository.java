package com.dodream.vintageFocus.repository;

import com.dodream.vintageFocus.vo.RefreshToken;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

public interface RefreshTokenRepository extends ReactiveCrudRepository<RefreshToken, Long> {
  Mono<RefreshToken> findByToken(String token);
  Mono<Void> deleteByToken(String token);
}
