package com.dodream.vintageFocus.repository.image;

import com.dodream.vintageFocus.vo.image.ProductDetailImage;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

public interface ProductDetailImageRepository extends ReactiveCrudRepository<ProductDetailImage, Long> {
  Flux<ProductDetailImage> findByProductId(Long productId);
}
