package com.dodream.vintageFocus.vo.image;

import org.springframework.data.relational.core.mapping.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@NoArgsConstructor
@Table("board_image")
public class BoardImage extends BaseImage {
  private Long boardId;

  @Builder
  public BoardImage(Long id, String originalImageName, String path, String savedImageName, Instant uploadTimestamp, Long boardId) {
    super(id, originalImageName, path, savedImageName, uploadTimestamp);
    this.boardId = boardId;
  }

}