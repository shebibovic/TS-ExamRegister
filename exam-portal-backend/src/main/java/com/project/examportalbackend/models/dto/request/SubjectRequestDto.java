package com.project.examportalbackend.models.dto.request;

import com.project.examportalbackend.models.Subject;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.utils.validation.annotation.UniqueProfessorIdConstraint;
import lombok.*;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

    @Getter
    @Setter
    @ToString
    @NoArgsConstructor
    @AllArgsConstructor
    public class SubjectRequestDto {

        private long subjectId = -1;
        @NotNull(message = "Subject must have a title")
        @NotEmpty(message = "Subject title can't be empty")
        @Size(max = 50, message = "Subject title can't have more than 50 characters")
        private String title;

        @NotNull(message = "Subject must have a description")
        @NotEmpty(message = "Subject description can't be empty")
        @Size(max = 250, message = "Subject description can't have more than 250 characters")
        private String description;

        @NotNull(message = "Subject must have a professor")
        @UniqueProfessorIdConstraint
        private long professorId;

        private List<Long> students = new ArrayList<>();

        public SubjectRequestDto(Subject subject){
            this.title = subject.getTitle();
            this.description = subject.getDescription();
            this.professorId = subject.getProfessor().getUserId();
            this.students = subject.getStudents().stream().map(User::getUserId).toList();
        }
}
