package com.dodream.vintageFocus.vo;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table("Review")
public class Review {
  @Id
  private Long id;

  private String content;
  private LocalDate writeDate;
  private LocalDate updateDate;
  private Boolean secured;
  private String title;
  private Long memberId;
  private Long productId;
}