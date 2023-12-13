package com.project.examportalbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "subjects")
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subjectId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @OneToOne
    @JoinColumn(name = "professor_id")
    private User professor;

    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Quiz> quizzes = new ArrayList<>();

    @ManyToMany
    @JsonIgnore
    private List<User> students = new ArrayList<>();

    public Subject(String title, String description){
        this.title = title;
        this.description = description;
    }

    public void addStudent(User user){
        //provjera je user li student
        students.add(user);
    }

    public void addQuiz(Quiz quiz){
        quizzes.add(quiz);
    }

}
