package com.dodream.vintageFocus.repository;

import com.dodream.vintageFocus.vo.Product;
import com.dodream.vintageFocus.vo.joinedTables.ProductWithFirstImage;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ProductRepository extends ReactiveCrudRepository<Product, Long> {
  Mono<Product> findByModelName(String modelName);

  @Query("""
  SELECT\s
    p.id AS product_id,
    p.code,
    p.model_name,
    p.product_name,
    p.company,
    p.country,
    p.category_1,
    p.category_2,
    p.category_3,
    p.condition,
    p.stock,
    p.consumer_price,
    p.selling_price,
    p.rental_price,
    p.review_count,
    p.like_count,
    p.view_count,
    pi.id AS image_id,
    pi.original_image_name,
    pi.path,
    pi.saved_image_name,
    pi.upload_timestamp
  FROM product p
  LEFT JOIN (
    SELECT pi1.*,
           ROW_NUMBER() OVER (PARTITION BY pi1.product_id ORDER BY pi1.id) AS rn
    FROM product_image pi1
  ) pi ON p.id = pi.product_id AND pi.rn = 1
  """)
  Flux<ProductWithFirstImage> findAllWithFirstImage();
}
