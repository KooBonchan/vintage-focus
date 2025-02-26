package com.dodream.vintageFocus.repository;

import com.dodream.vintageFocus.vo.Member;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

public interface MemberRepository extends ReactiveCrudRepository<Member, Long> {
  Mono<Member> findByUsername(String username);
}
