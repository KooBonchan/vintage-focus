package com.dodream.vintageFocus.repository;

import com.dodream.vintageFocus.vo.Member;

import static org.assertj.core.api.Assertions.assertThat;

public class MemberRepositoryTest extends AbstractRepositoryTest<Member, Long, MemberRepository>{

  @Override
  Member getTestEntity() {
    Member member = Member.builder()
      .username("TESTER")
      .password("TEST PASSWORD NOT ENCRYPTED")
      .address("Seoul Hanbok-Fan")
      .detailAddress("Dosim Han-Gaunde")
      .phone("1231234545")
      .zipcode("13131")
      .role("user")
      .build();
    return member;
  }

  @Override
  Long getId(Member entity) {
    return entity.getId();
  }

  @Override
  boolean verifyEntityMatchesDefault(Member found) {
    assertThat(found.getUsername()).isEqualTo("TESTER");
    return true;
  }
}
