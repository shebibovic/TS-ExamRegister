package com.project.examportalbackend.repository;

import com.project.examportalbackend.models.Subject;
import com.project.examportalbackend.models.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findBySubject(Subject subject);
}
