package com.project.examportalbackend.controllers;

import com.project.examportalbackend.models.Exam;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.models.dto.request.ExamRequestDto;
import com.project.examportalbackend.models.dto.response.ExamResponseDto;
import com.project.examportalbackend.services.AuthService;
import com.project.examportalbackend.services.SubjectService;
import com.project.examportalbackend.services.ExamService;
import com.project.examportalbackend.utils.constants.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.nio.file.AccessDeniedException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/exam")
public class ExamController {

    @Autowired
    private ExamService examService;

    @Autowired
    private SubjectService subjectService;

    @Autowired
    private AuthService authService;

    @PreAuthorize("hasAuthority('PROFESSOR')")
    @PostMapping("/professor/add")
    public ResponseEntity<String> addExamByProfessor(@Valid @RequestBody ExamRequestDto examRequestDto) throws AccessDeniedException {
        User professor = authService.getUserFromToken();
        Exam exam = examService.addExamForProfessor(examRequestDto, professor.getUserId());
        return ResponseEntity.ok("Successfully added exam " + exam.getTitle());
    }

    @PreAuthorize("hasAuthority('PROFESSOR')")
    @DeleteMapping("/professor/delete/{examId}")
    public ResponseEntity<String> deleteExamByProfessor(@PathVariable long examId) throws AccessDeniedException {
        User professor = authService.getUserFromToken();
        examService.deleteExamForProfessor(examId, professor.getUserId());
        return ResponseEntity.ok("Successfully deleted exam");
    }

    @PreAuthorize("hasAuthority('PROFESSOR')")
    @PostMapping("/professor/update")
    public ResponseEntity<String> updateExamByProfessor(@Valid @RequestBody ExamRequestDto examRequestDto) throws AccessDeniedException {
        User professor = authService.getUserFromToken();
        Exam exam = examService.updateExamForProfessor(examRequestDto, professor.getUserId());
        return ResponseEntity.ok("Successfully updated exam " + "exam");
    }

//    @GetMapping("/")
//    public ResponseEntity<?> getExams() {
//        return ResponseEntity.ok(examService.getExams());
//    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin")
    public ResponseEntity<List<ExamResponseDto>> getAllExams() throws AccessDeniedException {
        User admin = authService.getUserFromToken();
        return ResponseEntity.ok(examService.getAllExams(admin.getUserId()));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/active")
    public ResponseEntity<List<ExamResponseDto>> getAllActiveExams() throws AccessDeniedException {
        User admin = authService.getUserFromToken();
        return ResponseEntity.ok(examService.getAllActiveExams(admin.getUserId()));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/inactive")
    public ResponseEntity<List<ExamResponseDto>> getAllInactiveExams() throws AccessDeniedException {
        User admin = authService.getUserFromToken();
        return ResponseEntity.ok(examService.getAllInactiveExams(admin.getUserId()));
    }

    @PreAuthorize("hasAuthority('PROFESSOR')")
    @GetMapping("/professor/active-exams")
    public ResponseEntity<List<Exam>> getProfessorActiveExams() throws AccessDeniedException {
        User professor = authService.getUserFromToken();
        return ResponseEntity.ok(examService.getActiveExamsByProfessor(professor.getUserId()));
    }

    @PreAuthorize("hasAuthority('PROFESSOR')")
    @GetMapping("/professor/inactive-exams")
    public ResponseEntity<List<Exam>> getProfessorInactiveExams() throws AccessDeniedException {
        User professor = authService.getUserFromToken();
        return ResponseEntity.ok(examService.getInactiveExamsByProfessor(professor.getUserId()));
    }


    @PreAuthorize("hasAuthority('STUDENT')")
    @GetMapping("/student/inactive-registered-exams")
    public ResponseEntity<List<ExamResponseDto>> getStudentRegisteredInactiveExams() throws AccessDeniedException {
        User student = authService.getUserFromToken();
        return ResponseEntity.ok(examService.getRegisteredInactiveExamsByStudent(student.getUserId()));
    }

    @PreAuthorize("hasAuthority('STUDENT')")
    @GetMapping("/student/registered-active-exams")
    public ResponseEntity<List<ExamResponseDto>> getStudentRegisteredActiveExams() throws AccessDeniedException {
        User student = authService.getUserFromToken();
        return ResponseEntity.ok(examService.getRegisteredActiveExamsByStudent(student.getUserId()));
    }

    @PreAuthorize("hasAuthority('STUDENT')")
    @GetMapping("/student/unregistered-active-exams")
    public ResponseEntity<List<ExamResponseDto>> getStudentUnregisteredActiveExams() throws AccessDeniedException {
        User student = authService.getUserFromToken();
        return ResponseEntity.ok(examService.getUnregisteredActiveExamsByStudent(student.getUserId()));
    }

    @PreAuthorize("hasAuthority('STUDENT')")
    @PostMapping("/student/register-exam/{examId}")
    public ResponseEntity<String> registerExamForStudent(@PathVariable long examId) throws AccessDeniedException {
        User student = authService.getUserFromToken();
        Exam exam = examService.registerExamForStudent(student.getUserId(),examId);
        return ResponseEntity.ok("Successfully registered student " + student.getFullName() + " for exam " + exam.getTitle());
    }

    @PreAuthorize("hasAuthority('STUDENT')")
    @PostMapping("/student/unregister-exam/{examId}")
    public ResponseEntity<String> unregisterExamForStudent(@PathVariable long examId) throws AccessDeniedException {
        User student = authService.getUserFromToken();
        Exam exam = examService.unregisterExamForStudent(student.getUserId(),examId);
        return ResponseEntity.ok(
                "Successfully unregistered student " + student.getFullName() + " from exam " + exam.getTitle());

    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/admin/{subjectId}")
    public ResponseEntity<List<Exam>> getExamsForSubject(@PathVariable long subjectId) throws AccessDeniedException {
        User admin = authService.getUserFromToken();
        authService.verifyUserRole(admin.getUserId(), Roles.ADMIN.toString());
        return ResponseEntity.ok(examService.getExamsForSubject(subjectId));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/students/{examId}")
    public ResponseEntity<List<User>> getAllStudentsForExam(@PathVariable long examId) throws AccessDeniedException {
        User admin = authService.getUserFromToken();
        authService.verifyUserRole(admin.getUserId(), Roles.ADMIN.toString());
        return ResponseEntity.ok(examService.getExamRegisteredStudents(examId));
    }

//    @GetMapping("/{examId}")
//    public ResponseEntity<?> getExam(@PathVariable Long examId) {
//        return ResponseEntity.ok(examService.getExam(examId));
//    }

//    @GetMapping(value = "/", params = "subjectId")
//    public ResponseEntity<?> getExamBySubject(@RequestParam Long subjectId) {
//        Subject subject = subjectService.getSubject(subjectId);
//        return ResponseEntity.ok(examService.getExamsBySubject(subject));
//    }

//    @PutMapping("/{examId}")
//    public ResponseEntity<?> updateExam(@PathVariable Long examId, @RequestBody Exam exam) {
//        if (examService.getExam(examId) != null) {
//            return ResponseEntity.ok(examService.updateExam(exam));
//        }
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Exam with id : " + String.valueOf(examId) + ", doesn't exists");
//    }
//
//    @DeleteMapping("/{examId}")
//    public ResponseEntity<?> deleteExam(@PathVariable Long examId) {
//        examService.deleteExam(examId);
//        return ResponseEntity.ok(true);
//    }
}
