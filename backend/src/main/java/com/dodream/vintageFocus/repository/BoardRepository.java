package com.dodream.vintageFocus.repository;

import com.dodream.vintageFocus.vo.Board;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface BoardRepository extends ReactiveCrudRepository<Board, Long> {
}
