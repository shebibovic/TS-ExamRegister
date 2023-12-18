package com.project.examportalbackend.services;

import com.project.examportalbackend.models.Subject;
import com.project.examportalbackend.models.Exam;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.models.dto.request.ExamRequestDto;

import java.nio.file.AccessDeniedException;
import java.util.List;


public interface ExamService {

    Exam addExam(Exam exam);

    Exam addExamForProfessor(ExamRequestDto exam, long professorId) throws AccessDeniedException;

    Exam updateExamForProfessor(ExamRequestDto exam, long professorId) throws AccessDeniedException;

    void deleteExamForProfessor(long examId, long professorId) throws  AccessDeniedException;



    List<Exam> getExams();

    Exam getExam(long examId);

    Exam updateExam(Exam exam);

    void deleteExam(Long examId);

    List<Exam> getExamBySubject(Subject subject);

    List<Exam> getActiveExamsByStudent(long studentId) throws AccessDeniedException;

    List<Exam> getInactiveExamsByStudent(long studentId) throws AccessDeniedException;

    List<Exam> getActiveExamsByProfessor(long professorId) throws AccessDeniedException;

    List<Exam> getInactiveExamsByProfessor(long professorId) throws AccessDeniedException;

    Exam registerExamForStudent(long studentId, long examId) throws AccessDeniedException;

    Exam unregisterExamForStudent(long studentId, long examId) throws AccessDeniedException;

    List<User> getProfessorExamRegisteredStudents(long professorId, long examId) throws AccessDeniedException;



}
