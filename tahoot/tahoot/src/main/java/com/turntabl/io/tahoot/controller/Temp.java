//package com.turntabl.io.tahoot.controller;
//
//
//import com.turntabl.io.tahoot.dto.CreateQuestion;
//import com.turntabl.io.tahoot.model.Questions;
//import com.turntabl.io.tahoot.repository.AnswersRepository;
//import com.turntabl.io.tahoot.repository.QuestionsRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@RestController
//public class Temp {
//    @Autowired
//    AnswersRepository answersRepository;
//    @Autowired
//    QuestionsRepository questionsRepository;
//
//    @PostMapping("/createsome")
//    public Questions createquestion(@RequestBody CreateQuestion question){
//        return questionsRepository.save(question.getQuestions());
//    }
//
//    @GetMapping("/view")
//    public List<Questions>findall(){
//        return questionsRepository.findAll();
//    }
//}
