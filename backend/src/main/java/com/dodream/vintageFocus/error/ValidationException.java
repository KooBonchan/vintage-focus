package com.dodream.vintageFocus.error;


import lombok.Getter;

import java.util.List;

public class ValidationException extends RuntimeException{
  @Getter
  private final List<String> errors;

  public ValidationException(List<String> errors){
    super("Validation failed: " + String.join(", ", errors));
    this.errors = errors;
  }
}
