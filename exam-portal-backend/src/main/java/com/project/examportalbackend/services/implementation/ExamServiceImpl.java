package com.project.examportalbackend.services.implementation;

import com.project.examportalbackend.models.Subject;
import com.project.examportalbackend.models.Exam;
import com.project.examportalbackend.repository.ExamRepository;
import com.project.examportalbackend.services.AuthService;
import com.project.examportalbackend.services.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ExamServiceImpl implements ExamService {

    @Autowired
    public ExamRepository examRepository;

    @Autowired
    public AuthService authService;

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

    //TODO create a custom exception, move hardcoded string to constants file
    @Override
    public List<Exam> getActiveExamsByStudent(long studentId) throws Exception{
        if(!authService.isUserRole(studentId,"STUDENT")){
            throw new Exception("User must be a student");
        }
        return examRepository.findByRegisteredStudentsUserId(studentId).stream().filter(Exam::isActive).toList();
    }
}
