package com.turntabl.io.tahoot.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.CreationTimestamp;
//import org.hibernate.mapping.Set;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "question")
public class Questions {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("question_id")
    private int question_id;
    @Column(name = "question_body")
    @JsonProperty("question_body")
    private String question_body;


    @CreationTimestamp
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created")
    private Date timestamp;

    @OneToMany(cascade={CascadeType.ALL})
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name="question_id", referencedColumnName="question_id")
    private List<Answers> answers;



    public Questions() {
    }

    public Questions(int question_id, String question_body, Date timestamp) {
        this.question_id = question_id;
        this.question_body = question_body;
        this.timestamp = timestamp;
    }

    public int getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(int question_id) {
        this.question_id = question_id;
    }

    public String getQuestion_body() {
        return question_body;
    }

    public void setQuestion_body(String question_body) {
        this.question_body = question_body;
    }

    public Date getTimestamp() {
        return timestamp;
    }


    @Override
    public String toString() {
        return "Questions{" +
                "question_id=" + question_id +
                ", question_body='" + question_body + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "question")
    @JsonManagedReference
    public List<Answers> getAnswer() {
        return answers;
    }

    public void setAnswer(List<Answers> answer) {
        this.answers = answer;
    }
}
