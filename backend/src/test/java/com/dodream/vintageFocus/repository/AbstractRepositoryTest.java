package com.dodream.vintageFocus.repository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.r2dbc.core.DatabaseClient;
import reactor.test.StepVerifier;

//@SpringBootTest
abstract class AbstractRepositoryTest<T, I, R extends ReactiveCrudRepository<T, I>> {
  @Autowired protected R repository;
  @Autowired
  private DatabaseClient databaseClient;

  protected final Logger log = LoggerFactory.getLogger(getClass());

//  @BeforeEach
//  void cleanup() {
//    repository.deleteAll().block();
//  }
//
//  @Test
//  void shouldSaveAndFindById() {
//    T entity = getTestEntity();
//
//    repository.save(entity)
//      .flatMap(saved -> repository.findById(getId(saved)))
//      .as(StepVerifier::create)
//      .expectNextMatches(this::verifyEntityMatchesDefault)
//      .verifyComplete();
//  }

  abstract T getTestEntity();
  abstract I getId(T entity);
  abstract boolean verifyEntityMatchesDefault(T found);


  protected final Long TEST_MEMBER_ID = 719L;
  protected void setTestMember(){
    databaseClient.sql("" +
        "INSERT INTO member (id, username) " +
        "SELECT :id, :username FROM dual " +
        "WHERE NOT EXISTS (SELECT 1 FROM member WHERE id = :id) ")
      .bind("id", TEST_MEMBER_ID)
      .bind("username", "test")
      .fetch()
      .rowsUpdated()
      .block();
  }

  protected final Long[] TEST_PRODUCT_IDS = {7777L, 8887L, 9900L};
  protected final Long   TEST_PRODUCT_ID = TEST_PRODUCT_IDS[0];
  protected void setTestProduct(){
    setTestProduct(TEST_PRODUCT_ID, "TEST0", 1357900);
  }
  protected void setTestProducts(){
    for(Long id : TEST_PRODUCT_IDS){
      setTestProduct(id, "TEST" + id, (id.intValue())*100);
    }
  }
  private void setTestProduct(Long id, String productName, int sellingPrice){
    databaseClient.sql("" +
        "INSERT INTO product (id, product_name, selling_price, stock) " +
        "SELECT :id, :product_name, :selling_price, :stock FROM dual " +
        "WHERE NOT EXISTS (SELECT 1 FROM product WHERE id = :id) ")
      .bind("id", id)
      .bind("product_name", productName)
      .bind("selling_price", sellingPrice)
      .bind("stock", 24)
      .fetch()
      .rowsUpdated()
      .block();
  }

}
