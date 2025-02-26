package com.dodream.vintageFocus.repository;

import com.dodream.vintageFocus.vo.Delivery;
import org.junit.jupiter.api.BeforeEach;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

public class DeliveryRepositoryTest extends AbstractRepositoryTest<Delivery, UUID, DeliveryRepository> {
  @BeforeEach
  @Override
  protected void setTestMember() {
    super.setTestMember();
  }


  @Override
  Delivery getTestEntity() {
    return Delivery.builder()
      .memberId(TEST_MEMBER_ID)
      .address("Seoul Hanbok-Fan")
      .detailAddress("Yeogi-ga Anin Eodinga")
      .zipcode("12345")
      .status("shipped")
      .recipientName("TESTER")
      .recipientPhone("01020304050")
      .build();
  }

  @Override
  UUID getId(Delivery entity) {
    return entity.getId();
  }

  @Override
  boolean verifyEntityMatchesDefault(Delivery found) {
    assertThat(found.getMemberId()).isEqualTo(TEST_MEMBER_ID);
    assertThat(found.getRecipientName()).isEqualTo("TESTER");
    assertThat(found.getStatus()).isEqualTo("shipped");
    return true;
  }
}
