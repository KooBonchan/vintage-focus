package com.dodream.vintageFocus.controller;

import com.dodream.vintageFocus.dto.ProductDTO;
import com.dodream.vintageFocus.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

  private final ProductService productService;

  @Operation(summary = "Get all products", description = "Retrieves a list of all products")
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "Successful operation", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductDTO.class))),
    @ApiResponse(responseCode = "404", description = "No products found")
  })
  @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  public Mono<ResponseEntity<Flux<ProductDTO>>> getAllProducts() {
    return Mono.just(ResponseEntity.ok(productService.getAllProducts()))
      .switchIfEmpty(Mono.just(ResponseEntity.notFound().build()));
  }

  @Operation(
    summary = "Get product by ID",
    description = "Retrieves a product by its ID",
    parameters = {
      @Parameter(
        description = "ID of the product to retrieve",
        required = true,
        example = "1",
        in = ParameterIn.PATH
      )},
    responses = {
      @ApiResponse(responseCode = "200", description = "Product found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductDTO.class))),
      @ApiResponse(responseCode = "404", description = "Product not found")
    }
  )
  @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
  public Mono<ResponseEntity<ProductDTO>> getProductById(
    @PathVariable Long id) {
    return productService.getProductById(id)
      .map(ResponseEntity::ok)
      .switchIfEmpty(Mono.just(ResponseEntity.notFound().build()));
  }

  @Operation(summary = "Get product by model name", description = "Retrieves a product by its model name")
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "Product found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductDTO.class))),
    @ApiResponse(responseCode = "404", description = "Product not found")
  })
  @GetMapping(value = "/model/{modelName}", produces = MediaType.APPLICATION_JSON_VALUE)
  public Mono<ResponseEntity<ProductDTO>> getProductByModelName(
    @Parameter(description = "Model name of the product to retrieve", required = true, example = "XPS-13")
    @PathVariable String modelName) {
    return productService.getProductByModelName(modelName)
      .map(ResponseEntity::ok)
      .switchIfEmpty(Mono.just(ResponseEntity.notFound().build()));
  }

  @Operation(summary = "Create a new product", description = "Creates a new product")
  @ApiResponses({
    @ApiResponse(responseCode = "201", description = "Product created", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductDTO.class))),
    @ApiResponse(responseCode = "400", description = "Invalid input")
  })
  @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public Mono<ResponseEntity<ProductDTO>> createProduct(@RequestBody ProductDTO productDTO) {
    return productService.createProduct(productDTO)
      .map(savedProduct -> ResponseEntity.status(HttpStatus.CREATED).body(savedProduct));
  }

  @Operation(summary = "Update an existing product", description = "Updates a product")
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "Product updated", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductDTO.class))),
    @ApiResponse(responseCode = "404", description = "Product not found")
  })
  @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public Mono<ResponseEntity<ProductDTO>> updateProduct(@RequestBody ProductDTO productDTO) {
    return productService.updateProduct(productDTO)
      .map(ResponseEntity::ok)
      .switchIfEmpty(Mono.just(ResponseEntity.notFound().build()));
  }

  @Operation(summary = "Delete a product by ID", description = "Deletes a product by its ID")
  @ApiResponses({
    @ApiResponse(responseCode = "204", description = "Product deleted"),
    @ApiResponse(responseCode = "404", description = "Product not found")
  })
  @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
  public Mono<ResponseEntity<Void>> deleteProduct(
    @Parameter(description = "ID of the product to delete", required = true, example = "1")
    @PathVariable Long id) {
    return productService.deleteProduct(id)
      .then(Mono.just(ResponseEntity.noContent().build()));
  }

  @Operation(summary = "Increment view count", description = "Increments the view count of a product")
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "View count incremented", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductDTO.class))),
    @ApiResponse(responseCode = "404", description = "Product not found")
  })
  @PostMapping(value = "/{id}/view", produces = MediaType.APPLICATION_JSON_VALUE)
  public Mono<ResponseEntity<ProductDTO>> incrementViewCount(
    @Parameter(description = "ID of the product to increment view count", required = true, example = "1")
    @PathVariable Long id) {
    return productService.incrementViewCount(id)
      .map(ResponseEntity::ok)
      .switchIfEmpty(Mono.just(ResponseEntity.notFound().build()));
  }

  @Operation(summary = "Increment like count", description = "Increments the like count of a product")
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "Like count incremented", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductDTO.class))),
    @ApiResponse(responseCode = "404", description = "Product not found")
  })
  @PostMapping(value = "/{id}/like", produces = MediaType.APPLICATION_JSON_VALUE)
  public Mono<ResponseEntity<ProductDTO>> incrementLikeCount(
    @Parameter(description = "ID of the product to increment like count", required = true, example = "1")
    @PathVariable Long id) {
    return productService.incrementLikeCount(id)
      .map(ResponseEntity::ok)
      .switchIfEmpty(Mono.just(ResponseEntity.notFound().build()));
  }
}