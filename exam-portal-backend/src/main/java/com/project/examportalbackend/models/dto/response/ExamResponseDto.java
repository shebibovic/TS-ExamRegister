package com.project.examportalbackend.models.dto.response;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ExamResponseDto {
    private long examId;
    private String title;
    private String description;
    private Date registrationDeadlineDate;
    private Date startDate;
    private String subjectName;
}
