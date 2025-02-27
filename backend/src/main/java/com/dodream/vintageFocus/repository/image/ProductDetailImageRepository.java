package com.dodream.vintageFocus.repository.image;

import com.dodream.vintageFocus.vo.image.BaseImage;
import com.dodream.vintageFocus.vo.image.ProductDetailImage;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface ProductDetailImageRepository extends ReactiveCrudRepository<ProductDetailImage, Long> {
}
