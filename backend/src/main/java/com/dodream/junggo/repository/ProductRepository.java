package com.dodream.junggo.repository;

import com.dodream.junggo.vo.Product;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface ProductRepository extends ReactiveCrudRepository<Product, Long> {
}
