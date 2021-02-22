package com.turntabl.io.tahoot.service;

import com.turntabl.io.tahoot.model.Questions;
import com.turntabl.io.tahoot.repository.QuestionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class UploadImageService implements UploadImageInterface {

    @Autowired
    QuestionsRepository questionsRepository;
    @Override
    public Questions uploadToDatabase(MultipartFile file) {

        Questions questions = new Questions();
//            questions.setImage(file.getBytes());
        questions.setFile_name(file.getOriginalFilename());
        questions.setFile_type(file.getContentType());
        Questions newQuestion = questionsRepository.save(questions);
        return newQuestion;
    }

    @Override
    public Questions download(long question_id) {
        Questions questions = questionsRepository.getOne(question_id);
        return questions;
    }
}
