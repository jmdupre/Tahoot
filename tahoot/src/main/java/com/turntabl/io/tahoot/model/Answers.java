package com.turntabl.io.tahoot.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
@Table(name = "answers")
public class Answers {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("answer_id")
    private int answer_id;
    @Column(name = "body")
    @JsonProperty("answer_body")
    private String answer_body;
    @Column(name ="is_correct" ,columnDefinition="boolean default ('0')")
    @JsonProperty("is_correct")
    private boolean is_correct;


    @ManyToOne
    @JoinColumn(name = "question_id")
    private Questions questions;

    public Answers() {
    }

    public Answers(int answer_id,String answer_body, boolean is_correct) {
        this.answer_id = answer_id;
        this.answer_body = answer_body;
        this.is_correct = is_correct;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "question_id", nullable = false)
    @JsonBackReference
    public Questions getQuestions(){
        return questions;
    }
    public void setQuestions(Questions questions){
        this.questions=questions;
    }


    public int getAnswer_id() {
        return answer_id;
    }

    public String getAnswer_body() {
        return answer_body;
    }

    public boolean isIs_correct() {
        return is_correct;
    }

    @Override
    public String toString() {
        return "Answers{" +
                "answer_id=" + answer_id +
                ", answer_body='" + answer_body + '\'' +
                ", is_correct=" + is_correct +
                '}';
    }
}
