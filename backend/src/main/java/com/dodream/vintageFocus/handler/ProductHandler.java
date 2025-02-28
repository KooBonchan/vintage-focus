package com.dodream.vintageFocus.handler;

import com.dodream.vintageFocus.dto.ProductDTO;
import com.dodream.vintageFocus.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class ProductHandler {

  private final ProductService productService;

  public Mono<ServerResponse> getProductById(ServerRequest request) {
    String idParam = request.pathVariable("id");
    Long id = Long.valueOf(idParam);

    return productService.getProductById(id)
      .flatMap(product -> ServerResponse.ok().bodyValue(product))
      .switchIfEmpty(ServerResponse.notFound().build());
  }

  public Mono<ServerResponse> getProductByModelName(ServerRequest request) {
    String modelName = request.pathVariable("modelName");

    return productService.getProductByModelName(modelName)
      .flatMap(product -> ServerResponse.ok().bodyValue(product))
      .switchIfEmpty(ServerResponse.notFound().build());
  }


  public Mono<ServerResponse> createProduct(ServerRequest request) {
    return request.bodyToMono(ProductDTO.class)
      .flatMap(productService::createProduct)
      .flatMap(savedProduct ->
        ServerResponse.status(HttpStatus.CREATED)
          .bodyValue(savedProduct));
  }

  public Mono<ServerResponse> updateProduct(ServerRequest request) {
    return request.bodyToMono(ProductDTO.class)
      .flatMap(productService::updateProduct)
      .flatMap(updatedProduct -> ServerResponse.ok().bodyValue(updatedProduct))
      .switchIfEmpty(ServerResponse.notFound().build());
  }

  public Mono<ServerResponse> deleteProduct(ServerRequest request) {
    String idParam = request.pathVariable("id");
    Long id = Long.valueOf(idParam);

    return productService.deleteProduct(id)
      .then(ServerResponse.noContent().build());
  }

  public Mono<ServerResponse> incrementViewCount(ServerRequest request) {
    String idParam = request.pathVariable("id");
    Long id = Long.valueOf(idParam);

    return productService.incrementViewCount(id)
      .flatMap(product -> ServerResponse.ok().bodyValue(product))
      .switchIfEmpty(ServerResponse.notFound().build());
  }

  public Mono<ServerResponse> incrementLikeCount(ServerRequest request) {
    String idParam = request.pathVariable("id");
    Long id = Long.valueOf(idParam);

    return productService.incrementLikeCount(id)
      .flatMap(product -> ServerResponse.ok().bodyValue(product))
      .switchIfEmpty(ServerResponse.notFound().build());
  }
}
