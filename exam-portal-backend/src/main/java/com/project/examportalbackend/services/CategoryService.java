package com.project.examportalbackend.services;

import com.project.examportalbackend.models.Subject;

import java.util.List;

public interface CategoryService {

    Subject addCategory(Subject subject);

    List<Subject> getCategories();

    Subject getCategory(Long catId);

    Subject updateCategory(Subject subject);

    void deleteCategory(Long categoryId);

    List<Subject> getCategoriesFromProfessor(Long professorId);
}
