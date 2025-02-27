package com.dodream.vintageFocus.repository;

import com.dodream.vintageFocus.vo.Delivery;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import java.util.UUID;

public interface DeliveryRepository extends ReactiveCrudRepository<Delivery, UUID> {
}
