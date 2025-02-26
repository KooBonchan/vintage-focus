package com.dodream.vintageFocus.repository;

import com.dodream.vintageFocus.vo.Rental;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface RentalRepository extends ReactiveCrudRepository<Rental, Long> {
}
