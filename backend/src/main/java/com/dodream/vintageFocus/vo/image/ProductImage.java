package com.dodream.vintageFocus.vo.image;

import org.springframework.data.relational.core.mapping.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@NoArgsConstructor
@Table("product_image")
public class ProductImage extends BaseImage {
  private Long productId;

  @Builder
  public ProductImage(Long id, String originalImageName, String path, String savedImageName, Instant uploadTimestamp, Long productId) {
    super(id, originalImageName, path, savedImageName, uploadTimestamp);
    this.productId = productId;
  }
}