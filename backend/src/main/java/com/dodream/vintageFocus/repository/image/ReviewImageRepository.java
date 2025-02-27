package com.dodream.vintageFocus.repository.image;

import com.dodream.vintageFocus.vo.image.BaseImage;
import com.dodream.vintageFocus.vo.image.ReviewImage;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface ReviewImageRepository extends ReactiveCrudRepository<ReviewImage, Long> {
}
