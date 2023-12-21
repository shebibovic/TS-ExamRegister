package com.project.examportalbackend.controllers;

import com.project.examportalbackend.models.User;
import com.project.examportalbackend.models.dto.request.UserRequestDto;
import com.project.examportalbackend.repository.UserRepository;
import com.project.examportalbackend.services.AuthService;
import com.project.examportalbackend.services.ExamService;
import com.project.examportalbackend.services.UserService;
import com.project.examportalbackend.utils.constants.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
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
    @GetMapping("/admin/add")
    public ResponseEntity<User> addUser(@Valid @RequestBody UserRequestDto userRequestDto) throws AccessDeniedException, MessagingException, UnsupportedEncodingException {
        return ResponseEntity.ok(authService.registerUserService(userRequestDto));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/update")
    public ResponseEntity<User> updateUser(@Valid @RequestBody UserRequestDto userRequestDto) throws AccessDeniedException {
        return ResponseEntity.ok(authService.updateUser(userRequestDto));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable long userId) throws AccessDeniedException {
        authService.deleteUser(userId);
        return ResponseEntity.ok("User successfully deleted");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/students")
    public ResponseEntity<List<User>> getAllStudents() throws AccessDeniedException {
        User admin = authService.getUserFromToken();
        authService.verifyUserRole(admin.getUserId(), Roles.ADMIN.toString());
        return ResponseEntity.ok(userService.getAllStudents());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/admin/generate-otp/{userId}")
    public ResponseEntity<String> generateOtp(long userId) throws MessagingException, UnsupportedEncodingException {
        authService.setNewOneTimePassword(userId);
        return ResponseEntity.ok("New OTP has been generated and sent to the user");
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
