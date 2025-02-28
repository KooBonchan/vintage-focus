package com.dodream.vintageFocus.service;

import com.dodream.vintageFocus.dto.ProductDTO;
import com.dodream.vintageFocus.repository.ProductRepository;
import com.dodream.vintageFocus.vo.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.transaction.reactive.TransactionalOperator;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProductServiceImplTest {
  @Mock
  private ProductRepository productRepository;
  @Mock
  private TransactionalOperator transactionalOperator;

  @InjectMocks
  private ProductServiceImpl productService;


  private Product product;
  private ProductDTO productDTO;

  @BeforeEach
  void setup() {
    product = new Product();
    product.setId(1L);
    product.setModelName("Test Model");
    product.setViewCount(10);
    product.setLikeCount(5);
    // Add other fields as needed

    productDTO = new ProductDTO();
    productDTO.setId(1L);
    productDTO.setModelName("Test Model");
    productDTO.setViewCount(10);
    productDTO.setLikeCount(5);
  }


  @Test
  void getProductById_shouldReturnMappedDTO() {
    // Arrange
    when(productRepository.findById(anyLong())).thenReturn(Mono.just(product));

    // Act & Assert
    StepVerifier.create(productService.getProductById(1L))
      .expectNextMatches(dto ->
        dto.getId().equals(product.getId()) &&
          dto.getModelName().equals(product.getModelName()) &&
          dto.getViewCount().equals(product.getViewCount()) &&
          dto.getLikeCount().equals(product.getLikeCount())
      )
      .verifyComplete();

    verify(productRepository).findById(1L);
  }

  @Test
  void getProductByModelName_shouldReturnMappedDTO() {
    // Arrange
    when(productRepository.findByModelName(anyString())).thenReturn(Mono.just(product));

    // Act & Assert
    StepVerifier.create(productService.getProductByModelName("Test Model"))
      .expectNextMatches(dto ->
        dto.getModelName().equals(product.getModelName())
      )
      .verifyComplete();

    verify(productRepository).findByModelName("Test Model");
  }

  @Test
  void createProduct_shouldSaveAndReturnMappedDTO() {

    // Arrange
    when(productRepository.save(any(Product.class))).thenReturn(Mono.just(product));

    // Act & Assert
    StepVerifier.create(productService.createProduct(productDTO))
      .expectNextMatches(dto ->
        dto.getId().equals(product.getId())
      )
      .verifyComplete();

    verify(productRepository).save(any(Product.class));
  }

  @Test
  void updateProduct_shouldUpdateAndReturnMappedDTO() {
    // should run transactional
    when(transactionalOperator.transactional(any(Mono.class)))
      .thenAnswer(invocation -> invocation.getArgument(0));


    // Arrange
    when(productRepository.findById(anyLong())).thenReturn(Mono.just(product));
    when(productRepository.save(any(Product.class))).thenReturn(Mono.just(product));

    // Act & Assert
    StepVerifier.create(productService.updateProduct(productDTO))
      .expectNextMatches(dto ->
        dto.getId().equals(product.getId())
      )
      .verifyComplete();

    verify(productRepository).findById(productDTO.getId());
    verify(productRepository).save(any(Product.class));
    verify(transactionalOperator).transactional(any(Mono.class));
  }

  @Test
  void deleteProduct_shouldDeleteAndReturnVoid() {

    // Arrange
    when(productRepository.deleteById(anyLong())).thenReturn(Mono.empty());

    // Act & Assert
    StepVerifier.create(productService.deleteProduct(1L))
      .verifyComplete();

    verify(productRepository).deleteById(1L);
  }

  @Test
  void incrementViewCount_shouldIncrementAndReturnUpdatedDTO() {
    // should run transactional
    when(transactionalOperator.transactional(any(Mono.class)))
      .thenAnswer(invocation -> invocation.getArgument(0));


    // Arrange
    Product updatedProduct = new Product();
    updatedProduct.setId(1L);
    updatedProduct.setModelName("Test Model");
    updatedProduct.setViewCount(11); // Incremented
    updatedProduct.setLikeCount(5);

    when(productRepository.findById(anyLong())).thenReturn(Mono.just(product));
    when(productRepository.save(any(Product.class))).thenReturn(Mono.just(updatedProduct));

    // Act & Assert
    StepVerifier.create(productService.incrementViewCount(1L))
      .expectNextMatches(dto ->
        dto.getViewCount().equals(11) // Check incremented value
      )
      .verifyComplete();

    verify(productRepository).findById(1L);
    verify(productRepository).save(any(Product.class));
    verify(transactionalOperator).transactional(any(Mono.class));
  }

  @Test
  void incrementLikeCount_shouldIncrementAndReturnUpdatedDTO() {
    // should run transactional
    when(transactionalOperator.transactional(any(Mono.class)))
      .thenAnswer(invocation -> invocation.getArgument(0));


    // Arrange
    Product updatedProduct = new Product();
    updatedProduct.setId(1L);
    updatedProduct.setModelName("Test Model");
    updatedProduct.setViewCount(10);
    updatedProduct.setLikeCount(6); // Incremented

    when(productRepository.findById(anyLong())).thenReturn(Mono.just(product));
    when(productRepository.save(any(Product.class))).thenReturn(Mono.just(updatedProduct));

    // Act & Assert
    StepVerifier.create(productService.incrementLikeCount(1L))
      .expectNextMatches(dto ->
        dto.getLikeCount().equals(6) // Check incremented value
      )
      .verifyComplete();

    verify(productRepository).findById(1L);
    verify(productRepository).save(any(Product.class));
    verify(transactionalOperator).transactional(any(Mono.class));
  }

  @Test
  void getProductById_shouldReturnEmptyWhenNotFound() {
    // Arrange
    when(productRepository.findById(anyLong())).thenReturn(Mono.empty());

    // Act & Assert
    StepVerifier.create(productService.getProductById(999L))
      .verifyComplete(); // No elements expected

    verify(productRepository).findById(999L);
  }

  @Test
  void updateProduct_shouldReturnEmptyWhenProductNotFound() {
    // should run transactional
    when(transactionalOperator.transactional(any(Mono.class)))
      .thenAnswer(invocation -> invocation.getArgument(0));


    // Arrange
    when(productRepository.findById(anyLong())).thenReturn(Mono.empty());

    // Act & Assert
    StepVerifier.create(productService.updateProduct(productDTO))
      .verifyComplete(); // No elements expected

    verify(productRepository).findById(productDTO.getId());
  }

}
