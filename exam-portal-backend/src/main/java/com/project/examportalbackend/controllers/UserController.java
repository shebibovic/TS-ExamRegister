package com.project.examportalbackend.controllers;

import com.project.examportalbackend.models.Exam;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.services.AuthService;
import com.project.examportalbackend.services.ExamService;
import com.project.examportalbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @Autowired
    private ExamService examService;

    @PreAuthorize("hasAuthority('PROFESSOR')")
    @GetMapping("/professor/subject-students")
    public ResponseEntity<List<User>> getStudentActiveExams() throws AccessDeniedException {
        User professor = authService.getUserFromToken();
        return ResponseEntity.ok(userService.getAllStudentsFromSubjectForProfessor(professor.getUserId()));
    }

    @PreAuthorize("hasAuthority('PROFESSOR')")
    @GetMapping("/professor/exam-registered-students/{examId}")
    public ResponseEntity<List<User>> getExamRegisteredStudents(@PathVariable long examId) throws AccessDeniedException {
        User professor = authService.getUserFromToken();
        return ResponseEntity.ok(examService.getProfessorExamRegisteredStudents(professor.getUserId(), examId));
    }
}
