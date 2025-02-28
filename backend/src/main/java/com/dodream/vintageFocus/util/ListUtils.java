package com.dodream.vintageFocus.util;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

public class ListUtils {

  // Static utility function that handles null lists and applies a transformation function.
  public static <T, R> List<R> transformList(List<T> optionalList, Function<T, R> transformer) {
    return Optional.ofNullable(optionalList)
      .orElse(Collections.emptyList())  // If the list is null, use an empty list.
      .stream()
      .map(transformer)
      .collect(Collectors.toList());  // Collect the transformed items into a new list.
  }
}
