package com.turntabl.io.tahoot.controller;


import com.turntabl.io.tahoot.model.Questions;
import com.turntabl.io.tahoot.repository.QuestionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController

public class QuestionController {

    @Autowired
    QuestionsRepository repository;

    @PostMapping("/create")
    public String questions(@RequestBody Questions questions){
        repository.save(questions);
        return "Questions saved";
    }

    @PostMapping("/add")
    public String add_question(@RequestBody Questions questions){
        WebClient webClient = WebClient
                .builder()
                .baseUrl("localhost:8080")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
        String response = webClient.post()
                .uri("/add_question")
                .body(Mono.just(questions),Questions.class)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        return response;
    }

//    @RequestMapping(value = "/save", method = RequestMethod.POST, produces =MediaType.APPLICATION_JSON_VALUE,headers="Accept=application/json,application/xml")
//    public @ResponseBody JsonRecord setCurrentDataList(@RequestBody Questions questions) {
//        try {
//
//            int id=repository.save(questions);
//
//        } catch (Exception e) {
//
//            return new JsonRecord(false,e.getMessage());
//
//        }
//        return new JsonRecord(true,"Successful",questions);
//    }
}
