package com.dodream.vintageFocus.service;

import com.dodream.vintageFocus.dto.ProductDTO;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

public interface ProductService {
  Mono<ProductDTO> getProductById(Long id);
  Mono<ProductDTO> getProductByModelName(String ModelName);
  Mono<ProductDTO> incrementViewCount(Long id);
  Mono<ProductDTO> incrementLikeCount(Long id);

}
