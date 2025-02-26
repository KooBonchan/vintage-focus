package com.dodream.vintageFocus.repository;

import com.dodream.vintageFocus.vo.Review;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface ReviewRepository extends ReactiveCrudRepository<Review, Long> {
}
