package com.project.examportalbackend.services;

import com.project.examportalbackend.models.Subject;
import com.project.examportalbackend.models.User;

import java.nio.file.AccessDeniedException;
import java.util.List;

public interface SubjectService {

    Subject addSubject(Subject subject); //TODO REMOVE STATIC DATA

    List<Subject> getSubjectsByStudentId(long studentId) throws AccessDeniedException;

//    List<Subject> getSubjects();

    Subject getSubject(long subjectId);

//    Subject updateSubject(Subject subject);

//    void deleteSubject(Long subjectId);

    Subject getSubjectFromProfessor(long professorId) throws AccessDeniedException;

    void verifySubjectHasStudent(User student, Subject subject);
}
