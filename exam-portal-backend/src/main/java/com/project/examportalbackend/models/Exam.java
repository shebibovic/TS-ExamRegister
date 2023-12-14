package com.project.examportalbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "exams")
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long examId;

    @Column(name = "title")
    private String title;

    @Column(name = "description", length = 5000)
    private String description;

    @NotNull
    private Date registrationDeadlineDate;

    @NotNull
    private Date startDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    private Subject subject;

    @ManyToMany
    @JsonIgnore
    private List<User> registeredStudents = new ArrayList<>();

    public Exam(String title, String description, Subject subject, Date registrationDeadlineDate, Date startDate){
        this.title = title;
        this.description = description;
        this.subject = subject;
        this.registrationDeadlineDate = registrationDeadlineDate;
        this.startDate = startDate;
    }

    public boolean isActive(){
        return new Date().before(this.startDate);
    }

}