package com.dodream.junggo.repository;

import com.dodream.junggo.vo.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import reactor.core.publisher.SignalType;
import reactor.test.StepVerifier;

import java.util.logging.Level;

@SpringBootTest
public class ProductRepositoryTest {
  @Autowired private ProductRepository repository;

  @Test
  public void selectTest(){
    repository.findAll()
      .collectList()
      .log(this.getClass().getName(), Level.INFO, SignalType.ON_NEXT, SignalType.ON_ERROR)
      .as(StepVerifier::create)
      .expectNextMatches(ls -> !ls.isEmpty())
      .verifyComplete();
  }

}
