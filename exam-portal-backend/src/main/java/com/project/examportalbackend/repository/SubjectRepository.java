package com.project.examportalbackend.repository;


import com.project.examportalbackend.models.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject, Long> {

    List<Subject> findByStudentsUserId(long userId);
    Subject findByProfessorUserId(long professorId);
    Subject findByTitle(String title);
}
