package com.dodream.vintageFocus.repository;

import com.dodream.vintageFocus.vo.ProductCart;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface ProductCartRepository extends ReactiveCrudRepository<ProductCart, Long> {
}
