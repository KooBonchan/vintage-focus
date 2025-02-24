package com.dodream.vintageFocus.vo.image;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class BaseImage {
  @Id
  private Long id;

  private String originalImageName;
  private String path;
  private String savedImageName;
  private Instant uploadTimestamp;
}
