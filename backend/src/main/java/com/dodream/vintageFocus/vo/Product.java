package com.dodream.vintageFocus.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table @Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
  @Id
  private Long id;

  private String name;
  private Integer price;
}
