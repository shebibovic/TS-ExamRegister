//package com.project.examportalbackend.services.implementation;
//
//import com.project.examportalbackend.models.Subject;
//import com.project.examportalbackend.models.StudentCategory;
//import com.project.examportalbackend.models.User;
//import com.project.examportalbackend.repository.CategoryRepository;
//import com.project.examportalbackend.repository.StudentCategoryRepository;
//import com.project.examportalbackend.repository.UserRepository;
//import com.project.examportalbackend.services.StudentCategoryService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//public class StudentCategoryImpl implements StudentCategoryService {
//    @Autowired
//    UserRepository userRepository;
//    @Autowired
//    CategoryRepository categoryRepository;
//    @Autowired
//    StudentCategoryRepository studentCategoryRepository;
//    @Override
//    public StudentCategory addStudentCategory(Long studentId, Long categoryID) {
//        StudentCategory studentCategory = new StudentCategory();
//        User s = userRepository.getById(studentId);
//        if(s.getRole().getRoleName()!="STUDENT") throw new IllegalArgumentException();
//        Subject subject =categoryRepository.getById(categoryID);
//        studentCategory.setSubject(subject);
//        studentCategory.setStudent(s);
//        return  studentCategoryRepository.save(studentCategory);
//
//    }
//
//    @Override
//    public List<StudentCategory> getAll() {
//        return studentCategoryRepository.findAll();
//    }
//
//    @Override
//    public List<User> getStudents(Long id) {
//        List<StudentCategory> studentCategories = studentCategoryRepository.findAll();
//        List<User> students = new ArrayList<>();
//        for(StudentCategory sc: studentCategories){
//            if(sc.getSubject().getCatId()==id){
//                students.add(sc.getStudent());
//            }
//        }
//        return students;
//    }
//
//    @Override
//    public List<Subject> getCategories(Long studentId) {
//        List<StudentCategory>studentCategories =studentCategoryRepository.findAll();
//        List<Subject> categories = new ArrayList<>();
//        for(StudentCategory sc: studentCategories){
//            if(sc.getStudent().getUserId()==studentId){
//                categories.add(sc.getSubject());
//            }
//        }
//        return categories;
//    }
//}