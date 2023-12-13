package com.project.examportalbackend.repository;


import com.project.examportalbackend.models.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Subject, Long> {
}
