package com.dodream.vintageFocus.vo.image;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.relational.core.mapping.Table;

import java.time.Instant;


@NoArgsConstructor
@Table("product_detail_image")
public class ProductDetailImage extends BaseImage {
  private Long productId;

  @Builder
  public ProductDetailImage(Long id, String originalImageName, String path, String savedImageName, Instant uploadTimestamp, Long productId) {
    super(id, originalImageName, path, savedImageName, uploadTimestamp);
    this.productId = productId;
  }
}