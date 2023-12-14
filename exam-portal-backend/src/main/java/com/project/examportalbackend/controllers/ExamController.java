package com.project.examportalbackend.controllers;

import com.project.examportalbackend.models.Subject;
import com.project.examportalbackend.models.Exam;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.services.SubjectService;
import com.project.examportalbackend.services.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/exam")
public class ExamController {

    @Autowired
    private ExamService examService;

    @Autowired
    private SubjectService subjectService;

    @PostMapping("/")
    public ResponseEntity<?> addExam(@RequestBody Exam exam) {
        return ResponseEntity.ok(examService.addExam(exam));
    }

    @GetMapping("/")
    public ResponseEntity<?> getExams() {
        return ResponseEntity.ok(examService.getExams());
    }

    @PreAuthorize("hasAuthority('STUDENT')")
    @GetMapping("/student")
    public ResponseEntity<List<Exam>> getStudentActiveExams() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(examService.getActiveExamsByStudent(user.getUserId()));
    }

    @GetMapping("/{examId}")
    public ResponseEntity<?> getExam(@PathVariable Long examId) {
        return ResponseEntity.ok(examService.getExam(examId));
    }

    @GetMapping(value = "/", params = "catId")
    public ResponseEntity<?> getExamBySubject(@RequestParam Long catId) {
        Subject subject = subjectService.getSubject(catId);
        return ResponseEntity.ok(examService.getExamBySubject(subject));
    }

    @PutMapping("/{examId}")
    public ResponseEntity<?> updateExam(@PathVariable Long examId, @RequestBody Exam exam) {
        if (examService.getExam(examId) != null) {
            return ResponseEntity.ok(examService.updateExam(exam));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Exam with id : " + String.valueOf(examId) + ", doesn't exists");
    }

    @DeleteMapping("/{examId}")
    public ResponseEntity<?> deleteExam(@PathVariable Long examId) {
        examService.deleteExam(examId);
        return ResponseEntity.ok(true);
    }
}
