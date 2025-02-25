package com.dodream.vintageFocus.vo.image;

import org.springframework.data.relational.core.mapping.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table("board_image")
public class BoardImage extends BaseImage {
  private Long boardId;
}