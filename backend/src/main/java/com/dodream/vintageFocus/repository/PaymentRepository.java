package com.dodream.vintageFocus.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import java.util.UUID;

public interface PaymentRepository extends ReactiveCrudRepository<PaymentRepository, UUID> {
}
