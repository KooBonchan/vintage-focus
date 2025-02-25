package com.dodream.vintageFocus.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {
  private Long id;
  private Long productId;
  private Long memberId;
  private String writer;

  private String title;
  private String content;
  private List<String> images;
  private LocalDate writeDate;
  private LocalDate updateDate;

  private Boolean secured; // 공개 비공개



}
