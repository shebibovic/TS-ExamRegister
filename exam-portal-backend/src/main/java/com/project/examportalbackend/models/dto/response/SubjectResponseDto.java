package com.project.examportalbackend.models.dto.response;

import com.project.examportalbackend.models.User;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class SubjectResponseDto {
    private String title;

    private String description;

    private User professor;
    private List<User> students = new ArrayList<>();

    public SubjectResponseDto(String title, String description, User professor, List<User> students) {
        this.title = title;
        this.description = description;
        this.professor = professor;
        this.students = students;
    }


}
