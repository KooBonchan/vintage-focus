package com.dodream.vintageFocus.repository;

import com.dodream.vintageFocus.vo.Board;
import org.junit.jupiter.api.BeforeEach;

import static org.assertj.core.api.Assertions.assertThat;

public class BoardRepositoryTest extends AbstractRepositoryTest<Board, Long, BoardRepository> {

  @BeforeEach
  @Override
  protected void setTestMember(){ super.setTestMember();}

  @Override
  Board getTestEntity() {
    return Board.builder()
      .title("TEST")
      .category("TEST CATEGORY")
      .writer("ADMINMIN")
      .memberId(TEST_MEMBER_ID)
      .content("Today's Test is good?")
      .build();
  }

  @Override
  Long getId(Board entity) { return entity.getId();}

  @Override
  boolean verifyEntityMatchesDefault(Board found) {
    assertThat(found.getTitle()).isEqualTo("TEST");
    assertThat(found.getWriter()).isEqualTo("ADMINMIN");
    return true;
  }
}
