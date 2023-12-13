package com.project.examportalbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "quizzes")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quizId;

    @Column(name = "title")
    private String title;

    @Column(name = "description", length = 5000)
    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    private Subject subject;

    @ManyToMany
    @JsonIgnore
    private List<User> registeredStudents = new ArrayList<>();

    public Quiz(String title, String description, Subject subject){
        this.title = title;
        this.description = description;
        this.subject = subject;
    }

}