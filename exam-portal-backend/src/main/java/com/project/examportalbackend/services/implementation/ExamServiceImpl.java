package com.project.examportalbackend.services.implementation;

import com.project.examportalbackend.exception.exceptions.ResourceNotFoundException;
import com.project.examportalbackend.models.Subject;
import com.project.examportalbackend.models.Exam;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.repository.ExamRepository;
import com.project.examportalbackend.services.AuthService;
import com.project.examportalbackend.services.ExamService;
import com.project.examportalbackend.services.UserService;
import com.project.examportalbackend.utils.constants.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;

@Service
public class ExamServiceImpl implements ExamService {

    @Autowired
    public ExamRepository examRepository;

    @Autowired
    public AuthService authService;

    @Autowired
    public UserService userService;

    @Override
    public Exam addExam(Exam exam) {
        return examRepository.save(exam);
    }

    @Override
    public List<Exam> getExams() {
        return examRepository.findAll();
    }

    @Override
    public Exam getExam(Long examId) {
        return examRepository.findById(examId).isPresent() ? examRepository.findById(examId).get() : null;
    }

    @Override
    public Exam updateExam(Exam exam) {
        return examRepository.save(exam);
    }

    @Override
    public void deleteExam(Long examId) {
        examRepository.deleteById(examId);
    }

    @Override
    public List<Exam> getExamBySubject(Subject subject) {
        return examRepository.findBySubject(subject);
    }

    @Override
    public List<Exam> getActiveExamsByStudent(long studentId) throws AccessDeniedException {
        authService.verifyUserRole(studentId, Roles.STUDENT.toString());
        return examRepository.findByRegisteredStudentsUserId(studentId).stream().filter(Exam::isActive).toList();
    }

    @Override
    public List<Exam> getInactiveExamsByStudent(long studentId) throws AccessDeniedException {
        authService.verifyUserRole(studentId, Roles.STUDENT.toString());
        return examRepository.findByRegisteredStudentsUserId(studentId).stream().filter(item -> !item.isActive()).toList();
    }

    @Override
    public Exam registerExamForStudent(long studentId, long examId) throws AccessDeniedException {
        authService.verifyUserRole(studentId, Roles.STUDENT.toString());

        Optional<Exam> examOptional = examRepository.findById(examId);
        if(examOptional.isEmpty()){
            throw new ResourceNotFoundException("Exam with id: " + examId + " doesn't exist");
        }

        Exam exam = examOptional.get();
        User student = userService.getUser(studentId);

        if(!exam.isActive()){
            throw new IllegalArgumentException("Exam with id " + examId + " is not active");
        }
        if(exam.getRegisteredStudents().contains(student)){
            throw new IllegalArgumentException("Student with id " + studentId + " is already registered for exam with id " + examId);
        }

        exam.getRegisteredStudents().add(student);
        return examRepository.save(exam);
    }

    @Override
    public Exam unregisterExamForStudent(long studentId, long examId) throws AccessDeniedException {
        authService.verifyUserRole(studentId, Roles.STUDENT.toString());

        Optional<Exam> examOptional = examRepository.findById(examId);
        if(examOptional.isEmpty()){
            throw new ResourceNotFoundException("Exam with id: " + examId + " doesn't exist");
        }

        Exam exam = examOptional.get();
        User student = userService.getUser(studentId);

        if(!exam.isActive()){
            throw new IllegalArgumentException("Exam with id " + examId + " is not active");
        }
        if(!exam.getRegisteredStudents().contains(student)){
            throw new IllegalArgumentException("Student with id " + studentId + " is not registered for exam with id " + examId);
        }

        exam.getRegisteredStudents().remove(student);
        return examRepository.save(exam);
    }
}
