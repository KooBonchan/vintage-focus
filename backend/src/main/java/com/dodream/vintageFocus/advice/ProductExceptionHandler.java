package com.dodream.vintageFocus.advice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import reactor.core.publisher.Mono;

@RestControllerAdvice
public class ProductExceptionHandler {
  @ExceptionHandler
  public Mono<ResponseEntity<ErrorResponse>> handleValidationException(){};
}