package com.dodream.vintageFocus.service;

import com.dodream.vintageFocus.dto.ProductDTO;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ProductService {

  Flux<ProductDTO> getAllProducts();
  Mono<ProductDTO> getProductById(Long id);
  Mono<ProductDTO> getProductByModelName(String ModelName);
  Mono<ProductDTO> createProduct(ProductDTO productDTO);
  Mono<ProductDTO> updateProduct(ProductDTO productDTO);
  Mono<Void>       deleteProduct(Long id);

  Mono<ProductDTO> incrementViewCount(Long id);
  Mono<ProductDTO> incrementLikeCount(Long id);

}
