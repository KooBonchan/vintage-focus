package com.dodream.vintageFocus.repository;

import com.dodream.vintageFocus.vo.Cart;
import com.dodream.vintageFocus.vo.ProductCart;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

public class CartRepositoryTest extends AbstractRepositoryTest<Cart, UUID, CartRepository> {

  //TODO

  @BeforeEach @Override protected void setTestMember() { super.setTestMember(); }
  @BeforeEach @Override protected void setTestProducts() { super.setTestProducts(); }

  @Autowired ProductCartRepository productCartRepository;

  @Override
  Cart getTestEntity() {
    return Cart.builder()
      .deliveryFee(300)
      .memberId(TEST_MEMBER_ID)
      .sumProduct(3300)
      .build();
  }

  @Override
  UUID getId(Cart entity) {
    return entity.getId();
  }

  @Override
  boolean verifyEntityMatchesDefault(Cart found) {
    return false;
  }
}
