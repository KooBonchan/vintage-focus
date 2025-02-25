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
@Table("board")
public class Board {
  @Id
  private Long id;

  private String category;
  private Long writerId;
  private LocalDate writeDate;
  private LocalDate updateDate;
  private Boolean secured;
  private String content;
  private String title;
  private Long memberId;
}