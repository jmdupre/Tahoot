package com.turntabl.io.tahoot.controller;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.turntabl.io.tahoot.model.Questions;
import com.turntabl.io.tahoot.repository.QuestionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController

public class QuestionController {

    @Autowired
    QuestionsRepository repository;

    @PostMapping("/create")
    public String questions(@RequestParam(value = "file", required = false) MultipartFile file, @RequestParam("question") String q){
        System.out.println();
        ObjectMapper mapper = new ObjectMapper();
        
        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
//                "cloud_name", System.getenv("CLOUD_NAME"),
//                "api_key", System.getenv("API_KEY"),
//                "api_secret", System.getenv("API_SECRET")));
                "cloud_name", System.getenv("CLOUD_NAME"),
                "api_key", System.getenv("API_KEY"),
                "api_secret", System.getenv("API_SECRET")));
        
        try {
            Questions question = mapper.readValue(q, Questions.class);
            if(file != null) {
                Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
//            System.out.println(uploadResult.get("secure_url"));
                question.setImage((String) uploadResult.get("secure_url"));
            }
            repository.save(question);

//            return (String) ;
        } catch (IOException e) {
            e.printStackTrace();
        }
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

    @CrossOrigin
    @GetMapping("/question/getquestion")
    public List<Questions> findAll() {
        return repository.findAll();
    }

    @GetMapping("/question/{question_id}")
    public ResponseEntity<?> findId(@PathVariable("question_id") Long question_id){

        Optional<Questions> question =null;
        Map<String,Object> response = new HashMap<>();

        try{
            question = repository.findById(question_id);
        }catch(DataAccessException e){
            response.put("error", e.getMessage().concat(": "+e.getMostSpecificCause().toString()));
            new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

//        System.out.println("Patient with id: "+question_id+" / "+question.get().getHost_id());

        return ResponseEntity.ok(question);
    }


    @CrossOrigin
    @PutMapping("/question/{question_id}")
    public ResponseEntity <Questions>updateQuestion(@PathVariable ("question_id") Long question_id, @RequestBody Questions question){
        Optional <Questions>questionData=repository.findById(question_id);

        if (questionData.isPresent()){
            Questions questions = questionData.get();
            questions.setQuestion_body(question.getQuestion_body());
            questions.setPoints(question.getPoints());
            questions.setTimer(question.getTimer());
            questions.setImage(question.getImage());
            questions.setFile_name(question.getFile_name());
            questions.setFile_type(question.getFile_type());
            questions.setAnswer(question.getAnswer());
            return new ResponseEntity<>(repository.save(questions),HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin
    @DeleteMapping("/question/{question_id}")
    public ResponseEntity <HttpStatus>deleteQuestion (@PathVariable ("question_id") Long question_id, Questions questions){
        try {
            repository.delete(questions);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
