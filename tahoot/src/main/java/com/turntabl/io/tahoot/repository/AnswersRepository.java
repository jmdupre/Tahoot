package com.turntabl.io.tahoot.repository;

import com.turntabl.io.tahoot.model.Answers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswersRepository extends JpaRepository<Answers,Long> {
}
