package com.dodream.vintageFocus.repository;

import com.dodream.vintageFocus.vo.Product;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

public interface ProductRepository extends ReactiveCrudRepository<Product, Long> {
  Mono<Product> findByModelName(String modelName);
}
