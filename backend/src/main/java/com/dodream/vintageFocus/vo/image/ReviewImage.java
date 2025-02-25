package com.dodream.vintageFocus.vo.image;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.relational.core.mapping.Table;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table("review_image")
public class ReviewImage extends BaseImage {
  private Long reviewId;
}