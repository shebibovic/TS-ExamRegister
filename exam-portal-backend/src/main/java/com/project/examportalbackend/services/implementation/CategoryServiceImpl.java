package com.project.examportalbackend.services.implementation;

import com.project.examportalbackend.models.Subject;
import com.project.examportalbackend.repository.CategoryRepository;
import com.project.examportalbackend.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Subject addCategory(Subject subject) {
        return categoryRepository.save(subject);
    }

    @Override
    public List<Subject> getCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Subject getCategory(Long catId) {
        return categoryRepository.findById(catId).isPresent() ? categoryRepository.findById(catId).get() : null;
    }

    @Override
    public Subject updateCategory(Subject subject) {
        return categoryRepository.save(subject);
    }

    @Override
    public void deleteCategory(Long categoryId) {
        categoryRepository.delete(getCategory(categoryId));
    }

    @Override
    public List<Subject> getCategoriesFromProfessor(Long professorId) {
        List<Subject> categories = categoryRepository.findAll();
        List<Subject> professorSubject = new ArrayList<>();
        for( Subject c: categories){
            if(c.getProfessor().getUserId()==professorId)
                professorSubject.add(c);
        }
        return professorSubject;
    }
}
