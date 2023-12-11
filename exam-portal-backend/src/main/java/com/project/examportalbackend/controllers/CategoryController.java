package com.project.examportalbackend.controllers;

import com.project.examportalbackend.models.Category;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.repository.UserRepository;
import com.project.examportalbackend.services.CategoryService;
import com.project.examportalbackend.services.StudentCategoryService;
import com.project.examportalbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/category")

public class CategoryController {

    @Autowired
    private CategoryService categoryService;
    private final UserRepository userRepository;
    @Autowired
    public CategoryController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Autowired
    private UserService userService;

    @Autowired
    private StudentCategoryService studentCategoryService;

    @PostMapping("/")
    public ResponseEntity<?> addCategory(@RequestBody Category category) {
        return ResponseEntity.ok(categoryService.addCategory(category));
    }
    //@GetMapping("/{userId}")
    //public ResponseEntity<?> getProfesor(@PathVariable Long profesorId) {
      //  return ResponseEntity.ok(userService.getUser(profesorId));
   // }

    @GetMapping("/")
    public ResponseEntity<?> getCategories() {
        return ResponseEntity.ok(categoryService.getCategories());
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<?> getCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(categoryService.getCategory(categoryId));
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<?> updateCategory(@PathVariable Long categoryId, @RequestBody Category category) {
        if (categoryService.getCategory(categoryId) != null) {
            return ResponseEntity.ok(categoryService.updateCategory(category));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Category with id : " + String.valueOf(categoryId) + ", doesn't exists");
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.ok(true);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/addStudents")
    public ResponseEntity<?>addStudentsCategory( @RequestBody Long categoryId,
                                                 @RequestBody Long studentId) {

        return ResponseEntity.ok(studentCategoryService.addStudentCategory(categoryId, studentId));
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<?> getStudents(@PathVariable Long id) {
        return ResponseEntity.ok(studentCategoryService.getStudents(id));
    } //geta studente na predmetu po idu predmeta

    @GetMapping("/professor/{profesorId}")
    public ResponseEntity<?> getProfesor(@PathVariable Long profesorId) {
        return ResponseEntity.ok(userService.getProfessor(profesorId));
    }
    @GetMapping("/profesors")
    public ResponseEntity<?> getAllProfesors(){
        return ResponseEntity.ok(userService.getAllProfesors());
    }

    @GetMapping("/students")
    public ResponseEntity<?> getAllStudents(){
        return ResponseEntity.ok(userService.getAllStudents());
    }

}
