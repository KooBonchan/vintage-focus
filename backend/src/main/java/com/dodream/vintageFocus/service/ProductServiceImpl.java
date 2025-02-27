package com.dodream.vintageFocus.service;

import com.dodream.vintageFocus.dto.ProductDTO;
import com.dodream.vintageFocus.repository.ProductRepository;
import com.dodream.vintageFocus.vo.Product;
import com.dodream.vintageFocus.vo.image.BaseImage;
import com.dodream.vintageFocus.vo.image.ProductDetailImage;
import com.dodream.vintageFocus.vo.image.ProductImage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.reactive.TransactionalOperator;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl {
  private final ProductRepository productRepository;
  private final TransactionalOperator transactionalOperator;

  public Mono<ProductDTO> getProductById(Long id){
    return productRepository.findById(id)
      .map(this::mapToDTO);
  }
  public Mono<ProductDTO> getProductByModelName(String modelName){
    return productRepository.findByModelName(modelName)
      .map(this::mapToDTO);
  }
  @Transactional
  public Mono<ProductDTO> createProduct(ProductDTO productDTO){
    return productRepository.save(mapToEntity(productDTO))
      .map(this::mapToDTO)
      .as(transactionalOperator::transactional);
  }
  @Transactional
  public Mono<ProductDTO> updateProduct(Long id, ProductDTO productDTO){
    return productRepository.findById(id)
      .flatMap(existingProduct -> {
        updateProductEntity(existingProduct, productDTO);
        return productRepository.save(existingProduct);
      })
      .map(this::mapToDTO)
      .as(transactionalOperator::transactional);
  }
  public Mono<Void> deleteProduct(Long id){
    return productRepository.deleteById(id);
  }

  @Transactional
  public Mono<ProductDTO> incrementViewCount(Long id){
    return productRepository.findById(id)
      .flatMap(product -> {
        product.setViewCount(product.getViewCount() + 1);
        return productRepository.save(product);
      })
      .map(this::mapToDTO)
      .as(transactionalOperator::transactional);
  }

  @Transactional
  public Mono<ProductDTO> incrementLikeCount(Long id) {
    return productRepository.findById(id)
      .flatMap(product -> {
        product.setLikeCount(product.getLikeCount() + 1);
        return productRepository.save(product);
      })
      .map(this::mapToDTO)
      .as(transactionalOperator::transactional);
  }

//  Mappers

  private Product mapToEntity(ProductDTO dto){
    /*
     * product images and detail images: use getter
     * I assume no images will be passed directly to this function
     *  */
  return Product.builder()
    .id(dto.getId())
    .code(dto.getCode())
    .modelName(dto.getModelName())
    .productName(dto.getProductName())
    .company(dto.getCompany())
    .country(dto.getCountry())
    .category1(dto.getCategory1())
    .category2(dto.getCategory2())
    .category3(dto.getCategory3())
    .condition(mapConditionToShort(dto.getCondition()))
    .stock(dto.getStock())
    .consumerPrice(dto.getConsumerPrice())
    .sellingPrice(dto.getSellingPrice())
    .rentalPrice(dto.getRentalPrice())
    .reviewCount(dto.getReviewCount() != null ? dto.getReviewCount() : 0)
    .likeCount(dto.getLikeCount() != null ? dto.getLikeCount() : 0)
    .viewCount(dto.getViewCount() != null ? dto.getViewCount() : 0)
    .build();
}
  private void updateProductEntity(Product entity, ProductDTO dto) {
    if (dto.getCode() != null) entity.setCode(dto.getCode());
    if (dto.getModelName() != null) entity.setModelName(dto.getModelName());
    if (dto.getProductName() != null) entity.setProductName(dto.getProductName());
    if (dto.getCompany() != null) entity.setCompany(dto.getCompany());
    if (dto.getCountry() != null) entity.setCountry(dto.getCountry());
    if (dto.getCategory1() != null) entity.setCategory1(dto.getCategory1());
    if (dto.getCategory2() != null) entity.setCategory2(dto.getCategory2());
    if (dto.getCategory3() != null) entity.setCategory3(dto.getCategory3());
    if (dto.getCondition() != null) entity.setCondition(mapConditionToShort(dto.getCondition()));
    if (dto.getStock() != null) entity.setStock(dto.getStock());
    if (dto.getConsumerPrice() != null) entity.setConsumerPrice(dto.getConsumerPrice());
    if (dto.getSellingPrice() != null) entity.setSellingPrice(dto.getSellingPrice());
    if (dto.getRentalPrice() != null) entity.setRentalPrice(dto.getRentalPrice());
  }
  private ProductDTO mapToDTO(Product product) { return mapToDTO(product, null, null);}
  private ProductDTO mapToDTO(Product product, List<ProductImage> productImages, List<ProductDetailImage> detailImages){
    return ProductDTO.builder()
      .id(product.getId())
      .code(product.getCode())
      .modelName(product.getModelName())
      .productName(product.getProductName())
      .company(product.getCompany())
      .country(product.getCountry())
      .category1(product.getCategory1())
      .category2(product.getCategory2())
      .category3(product.getCategory3())
      .condition(mapConditionToString(product.getCondition()))
      .stock(product.getStock())
      .consumerPrice(product.getConsumerPrice())
      .sellingPrice(product.getSellingPrice())
      .rentalPrice(product.getRentalPrice())
      .productImages(productImages.stream()
        .map(BaseImage::getSavedImageName)
        .toList())
      .detailImages(detailImages.stream()
        .map(BaseImage::getSavedImageName)
        .toList())
      .reviewCount(product.getReviewCount())
      .likeCount(product.getLikeCount())
      .viewCount(product.getViewCount())
      .build();
  }
  private Short mapConditionToShort(String condition) {
    if (condition == null) return 0;
    switch (condition.toUpperCase()) {
      case "POOR": return 1;
      case "FAIR": return 2;
      case "GOOD": return 3;
      case "EXCELLENT": return 4;
      case "MINT": return 5;
      default: return 0;
    }
  }
  private String mapConditionToString(Short condition) {
    if (condition == null) return "UNKNOWN";

    switch (condition) {
      case 1: return "POOR";
      case 2: return "FAIR";
      case 3: return "GOOD";
      case 4: return "EXCELLENT";
      case 5: return "MINT";
      default: return "UNKNOWN";
    }
  }
}
