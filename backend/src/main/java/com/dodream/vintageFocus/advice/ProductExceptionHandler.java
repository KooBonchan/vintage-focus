package com.dodream.vintageFocus.advice;

import com.dodream.vintageFocus.error.ValidationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import reactor.core.publisher.Mono;

@RestControllerAdvice
public class ProductExceptionHandler {
  @ExceptionHandler
  public Mono<ResponseEntity<ErrorResponse>> handleValidationException(ValidationException exception){
    ErrorResponse response = new ErrorResponseException(
      "VALIDATION_ERROR",
      "Validation failed",
      exception.getErrors()
    );
    return Mono.just(ResponseEntity.badRequest().body(response));

  }