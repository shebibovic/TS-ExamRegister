package com.project.examportalbackend.controllers;

import com.project.examportalbackend.models.Exam;
import com.project.examportalbackend.models.Subject;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.services.AuthService;
import com.project.examportalbackend.services.ExamService;
import com.project.examportalbackend.services.UserService;
import com.project.examportalbackend.utils.constants.Roles;
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

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/students")
    public ResponseEntity<List<User>> getAllStudents() throws AccessDeniedException {
        User admin = authService.getUserFromToken();
        authService.verifyUserRole(admin.getUserId(), Roles.ADMIN.toString());
        return ResponseEntity.ok(userService.getAllStudents());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/professors")
    public ResponseEntity<List<User>> getAllProfessors() throws AccessDeniedException {
        User admin = authService.getUserFromToken();
        return ResponseEntity.ok(userService.getAllProfesors());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin")
    public ResponseEntity<List<User>> getAllUsers() throws AccessDeniedException {
        User admin = authService.getUserFromToken();
        return ResponseEntity.ok(userService.getAllUsers(admin.getUserId()));
    }

    @PreAuthorize("hasAuthority('PROFESSOR')")
    @GetMapping("/professor/subject-students")
    public ResponseEntity<List<User>> getStudentsForProfessorSubject() throws AccessDeniedException {
        User professor = authService.getUserFromToken();
        authService.verifyUserRole(professor.getUserId(), Roles.PROFESSOR.toString());
        return ResponseEntity.ok(userService.getAllStudentsFromSubjectForProfessor(professor.getUserId()));
    }

    @PreAuthorize("hasAuthority('PROFESSOR')")
    @GetMapping("/professor/exam-registered-students/{examId}")
    public ResponseEntity<List<User>> getExamRegisteredStudents(@PathVariable long examId) throws AccessDeniedException {
        User professor = authService.getUserFromToken();
        return ResponseEntity.ok(examService.getProfessorExamRegisteredStudents(professor.getUserId(), examId));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/available-professors")
    public ResponseEntity<List<User>> getAvailableProfessors() throws AccessDeniedException {
        User admin = authService.getUserFromToken();
        authService.verifyUserRole(admin.getUserId(), Roles.ADMIN.toString());
        return ResponseEntity.ok(userService.getAvailableProfessors());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/{subjectId}")
    public ResponseEntity<List<User>> getAllSubjectStudents(@PathVariable long subjectId) throws AccessDeniedException {
        User admin = authService.getUserFromToken();
        authService.verifyUserRole(admin.getUserId(), Roles.ADMIN.toString());
        return ResponseEntity.ok(userService.getAllStudentsFromSubject(subjectId));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/available-students/{subjectId}")
    public ResponseEntity<List<User>> getAllAvailableSubjectStudents(@PathVariable long subjectId) throws AccessDeniedException {
        User admin = authService.getUserFromToken();
        authService.verifyUserRole(admin.getUserId(), Roles.ADMIN.toString());
        return ResponseEntity.ok(userService.getAllAvailableStudentsForSubject(subjectId));
    }



}
