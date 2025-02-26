package com.dodream.vintageFocus.repository.image;

import com.dodream.vintageFocus.vo.image.BaseImage;
import com.dodream.vintageFocus.vo.image.BoardImage;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface BoardImageRepository extends ReactiveCrudRepository<BoardImage, Long> {
}
