package com.dodream.vintageFocus.service;

import com.dodream.vintageFocus.error.ProductNotFoundException;
import com.dodream.vintageFocus.error.ValidationException;
import com.dodream.vintageFocus.repository.ProductRepository;
import com.dodream.vintageFocus.vo.Product;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {
  private final ProductRepository productRepository;
  private final Validator validator;

  public Mono<Product> createProduct(Product product){
    return validateProduct(product)
      .then(productRepository.save(product))
      .doOnSuccess(saved -> log.info("Product created: {}", saved.getId()))
      .doOnError(error -> log.error("Error creating product", error));

  }

  public Mono<Product> updateProduct(Long id, Product product){
    return validateProduct(product)
      .then(productRepository.findById(id))
      .switchIfEmpty(Mono.error(new ProductNotFoundException(id)))
      .flatMap(existing -> {
        product.setId(existing.getId());
        return productRepository.save(product);
      })
      .doOnSuccess(updated -> log.info("Product updated: {}", updated.getId()))
      .doOnError(error -> log.error("Error creating product", error));

  }

  public Flux<Product> getAllProducts(){ return productRepository.findAll(); }
  public Mono<Product> getProductById(Long id){ return productRepository.findById(id); }
  public Mono<Product> getProductByName(String name){ return productRepository.findByName(name); }



  private Mono<Void> validateProduct(Product product){
    Errors errors = new BeanPropertyBindingResult(product, "product");
    validator.validate(product, errors);
    if(errors.hasErrors()){
      return Mono.error(new ValidationException(
        errors.getFieldErrors()
          .stream()
          .map(error -> error.getField() + ": " + error.getDefaultMessage())
          .toList()
      ));
    }
    return Mono.empty();
  }
}
