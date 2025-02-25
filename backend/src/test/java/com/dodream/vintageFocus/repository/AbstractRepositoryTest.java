package com.dodream.vintageFocus.repository;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.test.StepVerifier;

@SpringBootTest
abstract class AbstractRepositoryTest<T, I, R extends ReactiveCrudRepository<T, I>> {
  @Autowired protected R repository;

  protected final Logger log = LoggerFactory.getLogger(getClass());

  @BeforeEach
  void cleanup() {
    repository.deleteAll().block();
  }

  @Test
  void shouldSaveAndFindById() {
    T entity = getTestEntity();

    repository.save(entity)
      .flatMap(saved -> repository.findById(getId(saved)))
      .as(StepVerifier::create)
      .expectNextMatches(this::verifyEntityMatchesDefault)
      .verifyComplete();
  }

  abstract T getTestEntity();
  abstract I getId(T entity);
  abstract boolean verifyEntityMatchesDefault(T found);
}
