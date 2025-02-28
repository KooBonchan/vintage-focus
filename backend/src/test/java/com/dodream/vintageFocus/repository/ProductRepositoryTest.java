package com.dodream.vintageFocus.repository;

import com.dodream.vintageFocus.support.factory.ProductTestFactory;
import com.dodream.vintageFocus.vo.Product;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import reactor.test.StepVerifier;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class ProductRepositoryTest extends AbstractRepositoryTest<Product, Long, ProductRepository>{
  @Autowired
  private ProductTestFactory testFactory;

  @Override
  Product getTestEntity() {
    return testFactory.createDefault();
  }

  @Override
  Long getId(Product entity) {
    return entity.getId();
  }

  @Override
  boolean verifyEntityMatchesDefault(Product found) {
    assertThat(found.getCode()).isEqualTo("TEST-001");
    assertThat(found.getModelName()).isEqualTo("Default Model");
    return true;
  }





  @Test
  void shouldFindAllProducts() {
    // Given
    List<Product> testProducts = testFactory.createProductBatch(2);
    // When
    repository.saveAll(testProducts)
      .thenMany(repository.findAll())
      .collectList()
      .as(StepVerifier::create)
    // Then
      .expectNextMatches(products -> {
        assertThat(products).hasSize(2);
        assertThat(products)
          .extracting(Product::getCode)
          .containsExactlyInAnyOrder("TEST-001", "TEST-002");
        return true;
      })
      .verifyComplete();
  }
}
