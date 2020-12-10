package com.turntabl.io.tahoot.controller;


import com.turntabl.io.tahoot.model.Answers;
import com.turntabl.io.tahoot.model.Questions;
import com.turntabl.io.tahoot.repository.AnswersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnswerController {

    @Autowired
    AnswersRepository answersRepository;

        @PostMapping("/create_answer")
    public String questions(@RequestBody Answers answers){
        answersRepository.save(answers);
        return "Answers saved";
    }
}
