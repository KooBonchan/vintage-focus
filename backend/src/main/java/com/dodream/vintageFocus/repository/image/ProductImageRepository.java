package com.dodream.vintageFocus.repository.image;

import com.dodream.vintageFocus.vo.image.BaseImage;
import com.dodream.vintageFocus.vo.image.ProductImage;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface ProductImageRepository extends ReactiveCrudRepository<ProductImage, Long> {
}
