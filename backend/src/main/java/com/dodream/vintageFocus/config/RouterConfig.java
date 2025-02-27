package com.dodream.vintageFocus.config;

import com.dodream.vintageFocus.handler.ProductHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.*;

@Configuration
public class RouterConfig {

  @Bean
  public RouterFunction<ServerResponse> productRoutes(ProductHandler handler) {
    return RouterFunctions
      .route(GET("/product/{id}").and(accept(MediaType.APPLICATION_JSON)), handler::getProductById)
      .andRoute(GET("/product/model/{modelName}").and(accept(MediaType.APPLICATION_JSON)), handler::getProductByModelName)
      .andRoute(POST("/product").and(accept(MediaType.APPLICATION_JSON)), handler::createProduct)
      .andRoute(PUT("/product").and(accept(MediaType.APPLICATION_JSON)), handler::updateProduct)
      .andRoute(DELETE("/product/{id}").and(accept(MediaType.APPLICATION_JSON)), handler::deleteProduct)
      .andRoute(POST("/product/{id}/view").and(accept(MediaType.APPLICATION_JSON)), handler::incrementViewCount)
      .andRoute(POST("/product/{id}/like").and(accept(MediaType.APPLICATION_JSON)), handler::incrementLikeCount);
  }
}