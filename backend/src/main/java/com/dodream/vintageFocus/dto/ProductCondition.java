package com.dodream.vintageFocus.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ProductCondition {
  MINT(5, "New or like new condition"),
  EXCELLENT(4, "Minor wear, fully functional"),
  GOOD(3, "Normal wear, fully functional"),
  FAIR(2, "Significant wear, works properly"),
  POOR(1, "Heavy wear, may need repair");

  private final int value;
  private final String description;

  public static ProductCondition fromValue(int value) {
    for (ProductCondition condition : ProductCondition.values()) {
      if (condition.value == value) {
        return condition;
      }
    }
    throw new IllegalArgumentException("Invalid product condition value: " + value);
  }
}