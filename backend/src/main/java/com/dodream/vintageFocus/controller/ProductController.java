package com.dodream.vintageFocus.controller;

import com.dodream.vintageFocus.service.ProductService;
import com.dodream.vintageFocus.vo.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {
  private final ProductService productService;

  @RequestMapping("")
  public Flux<Product> getAllProduct(){
    return productService.getAllProducts();
  }

}
