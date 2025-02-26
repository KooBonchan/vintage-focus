package com.dodream.vintageFocus.repository;

import com.dodream.vintageFocus.vo.Cart;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import java.util.UUID;

public interface CartRepository extends ReactiveCrudRepository<Cart, UUID> {
}
