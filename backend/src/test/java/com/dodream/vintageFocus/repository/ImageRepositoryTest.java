package com.dodream.vintageFocus.repository;

import com.dodream.vintageFocus.repository.image.BoardImageRepository;
import com.dodream.vintageFocus.repository.image.ProductDetailImageRepository;
import com.dodream.vintageFocus.vo.image.BoardImage;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.r2dbc.core.DatabaseClient;
import reactor.test.StepVerifier;

@SpringBootTest
public class ImageRepositoryTest{

  @Autowired
  private DatabaseClient databaseClient;
  @Autowired
  private BoardImageRepository boardImageRepository;
  @Autowired
  private ProductDetailImageRepository productDetailImageRepository;



  @Test
  void boardImageRepoTest() {
    databaseClient.sql("" +
        "INSERT INTO member (id, username) " +
        "SELECT :id, :username FROM dual " +
        "WHERE NOT EXISTS (SELECT 1 FROM member WHERE id = :id) ")
      .bind("id", 1L)
      .bind("username", "test")
      .fetch()
      .rowsUpdated()
      .block();
    databaseClient.sql("" +
        "INSERT INTO board (id, title, member_id) " +
        "SELECT :id, :title, :member_id FROM dual " +
        "WHERE NOT EXISTS (SELECT 1 FROM board WHERE id = :id) ")
      .bind("id", 1L)
      .bind("title", "test")
      .bind("member_id", 1L)
      .fetch()
      .rowsUpdated()
      .block();


    BoardImage boardImage = BoardImage.builder()
      .originalImageName("TEST.png")
      .savedImageName("UUIDUUID-UUID-UUIDID")
      .path("board")
      .boardId(1L)
      .build();
    boardImageRepository.save(boardImage)
      .flatMap(saved -> boardImageRepository.findById(saved.getId()))
      .as(StepVerifier::create)
      .expectNextMatches(expected -> {
        Assertions.assertThat(expected.getOriginalImageName()).isEqualTo("TEST.png");
        Assertions.assertThat(expected.getPath()).isEqualTo("board");
        return true;
      })
      .verifyComplete();
  }

}
