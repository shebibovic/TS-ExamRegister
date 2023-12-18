package com.project.examportalbackend.repository;

import com.project.examportalbackend.models.Subject;
import com.project.examportalbackend.models.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findBySubject(Subject subject);

    List<Exam> findByRegisteredStudentsUserId(long studentId);

}
