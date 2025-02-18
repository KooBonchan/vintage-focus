package com.dodream.vintageFocus.controller;

import com.dodream.vintageFocus.config.SecurityConfig;
import com.dodream.vintageFocus.service.ProductService;
import com.dodream.vintageFocus.vo.Product;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Flux;

import static org.mockito.Mockito.*;

@WebFluxTest(ProductController.class)
@Import(SecurityConfig.class)
class ProductControllerTest {
  @Autowired private WebTestClient webTestClient;

  @MockitoBean
  private ProductService productService;


  @Test
  void getAllProducts_shouldReturnProducts(){
    Product product1 = new Product(1L, "Product 1", 100);
    Product product2 = new Product(2L, "Product 2", 200);

    when(productService.getAllProduct())
      .thenReturn(Flux.just(product1, product2));

    webTestClient.get().uri("/product")
      .exchange()
      .expectStatus().isOk()
      .expectBodyList(Product.class)
      .hasSize(2)
      .contains(product1, product2);
  }

  @Test
  void getAllProducts_WhenError_ShouldReturn500(){
    when(productService.getAllProduct())
      .thenReturn(Flux.error(new RuntimeException("DB Error")));

    webTestClient.get().uri("/product")
      .exchange()
      .expectStatus()
      .is5xxServerError();
  }

}