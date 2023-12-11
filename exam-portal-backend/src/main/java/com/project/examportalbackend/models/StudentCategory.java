package com.project.examportalbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Entity
@Embeddable
@Table(name = "student_category") //annotations
@IdClass(StudentCategory.class)
public class StudentCategory implements Serializable {
    @Id
    @ManyToOne
    @JoinColumn(name="student_id")
    @JsonIgnore
    private User student;

    @Id
    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnore
    private Category category;

}