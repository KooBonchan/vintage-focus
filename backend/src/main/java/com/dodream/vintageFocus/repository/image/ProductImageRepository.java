package com.dodream.vintageFocus.repository.image;

import com.dodream.vintageFocus.vo.image.ProductImage;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

public interface ProductImageRepository extends ReactiveCrudRepository<ProductImage, Long> {
  Flux<ProductImage> findByProductId(Long productId);
}
