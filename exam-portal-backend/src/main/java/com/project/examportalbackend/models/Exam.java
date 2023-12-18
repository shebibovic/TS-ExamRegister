package com.project.examportalbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
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
    @NotNull(message = "Exam must have a title")
    @NotEmpty(message = "Exam title can't be empty")
    @Size(max = 25, message = "Exam title can't have more than 25 characters")
    private String title;

    @Column(name = "description", length = 5000)
    @NotNull(message = "Exam must have a description")
    @NotEmpty(message = "Exam description can't be empty")
    @Size(max = 250, message = "Exam title can't have more than 250 characters")
    private String description;

    @NotNull(message = "Exam must have a registration deadline date")
    private Date registrationDeadlineDate;

    @NotNull(message = "Exam must have a start date")
    private Date startDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    @NotNull(message = "Exam must have a subject")
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

    public Exam(long examId, String title, String description, Subject subject, Date registrationDeadlineDate, Date startDate){
        this.examId = examId;
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