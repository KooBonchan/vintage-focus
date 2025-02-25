package com.dodream.vintageFocus.vo.image;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.relational.core.mapping.Table;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table("product_detail_image")
public class ProductDetailImage extends BaseImage {
  private Long productId;
}