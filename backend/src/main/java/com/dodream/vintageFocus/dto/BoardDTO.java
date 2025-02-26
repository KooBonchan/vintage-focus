package com.dodream.vintageFocus.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardDTO {
  private Long id;
  private Long memberId;
  private Long writer;

  private String title;
  private String content;
  private String category;
  private LocalDate writeDate;
  private LocalDate updateDate;

  private Boolean secured;

}