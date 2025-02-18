package com.dodream.vintageFocus.service;

import com.dodream.vintageFocus.repository.ProductRepository;
import com.dodream.vintageFocus.vo.Product;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {
  private final ProductRepository productRepository;

  public Flux<Product> getAllProduct(){ return productRepository.findAll(); }
  public Mono<Product> getProductById(Long id){ return productRepository.findById(id); }
  public Mono<Product> getProductByName(String name){ return productRepository.findByName(name); }



}
