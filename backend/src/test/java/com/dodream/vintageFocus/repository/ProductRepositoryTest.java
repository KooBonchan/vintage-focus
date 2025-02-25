package com.dodream.vintageFocus.repository;

import com.dodream.vintageFocus.support.factory.ProductTestFactory;
import com.dodream.vintageFocus.vo.Product;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import reactor.test.StepVerifier;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
class ProductRepositoryTest {
  @Autowired
  private ProductRepository repository;
  @Autowired
  private ProductTestFactory testFactory;

  @BeforeEach
  void cleanup() {
    repository.deleteAll().block();
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

  @Test
  void shouldSaveAndFindById() {
    // Given
    Product product = testFactory.createDefault();

    // When/Then
    repository.save(product)
      .flatMap(saved -> repository.findById(saved.getId()))
      .as(StepVerifier::create)
      .expectNextMatches(found -> {
        assertThat(found.getCode()).isEqualTo("TEST-001");
        assertThat(found.getModelName()).isEqualTo("Default Model");
        assertThat(found.getProductName()).isEqualTo("Default Product");
        return true;
      })
      .verifyComplete();
  }


  @Test
  void shouldFindByCustomAttributes() {
    // Given
    Product customProduct = testFactory.createProduct(
      ProductTestFactory.ProductTestData.builder()
        .code("CUSTOM-001")
        .company("CustomCompany")
        .category1("Custom Category")
        .build()
    );

    // When/Then
    repository.save(customProduct)
      .flatMap(saved -> repository.findById(saved.getId()))
      .as(StepVerifier::create)
      .expectNextMatches(found -> {
        assertThat(found.getCode()).isEqualTo("CUSTOM-001");
        assertThat(found.getCompany()).isEqualTo("CustomCompany");
        assertThat(found.getCategory1()).isEqualTo("Custom Category");
        // Default values from factory should still be present
        assertThat(found.getStock()).isEqualTo(100);
        return true;
      })
      .verifyComplete();
  }


  @Test
  void shouldSaveAndFindByModelName() {
    // Given
    Product product = testFactory.createDefault();

    // When/Then
    repository.save(product)
      .flatMap(saved -> repository.findByModelName(saved.getModelName()))
      .as(StepVerifier::create)
      .expectNextMatches(found -> {
        assertThat(found.getCode()).isEqualTo("TEST-001");
        return true;
      })
      .verifyComplete();
  }



}
