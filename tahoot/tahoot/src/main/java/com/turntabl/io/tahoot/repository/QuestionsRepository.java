package com.turntabl.io.tahoot.repository;

import com.turntabl.io.tahoot.model.Questions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionsRepository extends JpaRepository<Questions,Long> {
//    List<Questions> findBy(int question_id);
//    List<Questions>findAll();
}
