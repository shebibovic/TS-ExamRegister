package com.project.examportalbackend.services;

import com.project.examportalbackend.models.StudentCategory;
import com.project.examportalbackend.models.User;


import java.util.List;

public interface StudentCategoryService {

    StudentCategory addStudentCategory(Long studentId, Long categoryID);

    List<StudentCategory> getAll();

    List<User> getStudents(Long id);
}