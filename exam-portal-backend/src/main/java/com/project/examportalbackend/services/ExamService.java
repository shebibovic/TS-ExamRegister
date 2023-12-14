package com.project.examportalbackend.services;

import com.project.examportalbackend.models.Subject;
import com.project.examportalbackend.models.Exam;

import java.util.List;


public interface ExamService {

    Exam addExam(Exam exam);

    List<Exam> getExams();

    Exam getExam(Long examId);

    Exam updateExam(Exam exam);

    void deleteExam(Long examId);

    // Extra methods
    List<Exam> getExamBySubject(Subject subject);

    List<Exam> getActiveExamsByStudent(long studentId) throws Exception;
}
