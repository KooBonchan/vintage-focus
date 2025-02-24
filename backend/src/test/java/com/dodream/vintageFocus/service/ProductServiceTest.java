package com.dodream.vintageFocus.service;

import com.dodream.vintageFocus.repository.ProductRepository;
import com.dodream.vintageFocus.vo.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import reactor.core.publisher.Flux;
import reactor.test.StepVerifier;

import javax.xml.validation.Validator;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;

@WebFluxTest(ProductService.class)
@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

  @MockitoBean
  private ProductRepository productRepository;

  @MockitoBean
  private Validator validator;

  @InjectMocks
  private ProductService productService;

  private Product validProduct;
  private Product invalidProduct;

  @BeforeEach
  void setUp() {
    validProduct = Product.builder()
      .code("TEST0101")
      .productName("Test Product")
      .modelName("Test Model")
      .company("Test Company")
      .condition(Product.ProductCondition.MINT)
      .stock(10)
      .consumerPrice(10000)
      .sellingPrice(12000)
      .rentalPrice(1000)
      .build();

    invalidProduct = Product.builder()
      .code(null)
      .productName("")
      .consumerPrice(-1000)
      .build();
  }

  @Test
  void getAllProducts_Success() {
    List<Product> products = Arrays.asList(
      validProduct
    );

    when(productRepository.findAll()).thenReturn(Flux.fromIterable(products));

    StepVerifier.create(productService.getAllProducts())
      .expectNextCount(2)
      .verifyComplete();
  }
}
