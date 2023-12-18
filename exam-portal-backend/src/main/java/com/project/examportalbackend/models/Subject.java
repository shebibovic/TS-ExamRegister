package com.project.examportalbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
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
    @NotNull(message = "Subject must have a title")
    @NotEmpty(message = "Subject title can't be empty")
    @Size(max = 50, message = "Subject title can't have more than 50 characters")
    private String title;

    @Column(name = "description")
    @NotNull(message = "Subject must have a description")
    @NotEmpty(message = "Subject description can't be empty")
    @Size(max = 250, message = "Subject description can't have more than 250 characters")
    private String description;

    @OneToOne
    @JoinColumn(name = "professor_id")
    @NotNull(message = "Subject must have a professor")
    private User professor;

    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Exam> exams = new ArrayList<>();

    @ManyToMany
    @JsonIgnore
    private List<User> students = new ArrayList<>();

    public Subject(String title, String description){
        this.title = title;
        this.description = description;
    }

    //TODO Pomjeriti metodu addStudent u service, stoji zasad samo radi statickih podataka

    public void addStudent(User user){
        students.add(user);
    }

    public void addExam(Exam exam){
        this.exams.add(exam);
    }

}
