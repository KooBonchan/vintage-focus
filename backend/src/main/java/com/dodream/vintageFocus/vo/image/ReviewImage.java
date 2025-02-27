package com.dodream.vintageFocus.vo.image;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.relational.core.mapping.Table;

import java.time.Instant;

@NoArgsConstructor
@Table("review_image")
public class ReviewImage extends BaseImage {
  private Long reviewId;

  @Builder
  public ReviewImage(Long id, String originalImageName, String path, String savedImageName, Instant uploadTimestamp, Long reviewId) {
    super(id, originalImageName, path, savedImageName, uploadTimestamp);
    this.reviewId = reviewId;
  }
}