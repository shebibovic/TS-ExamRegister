package com.project.examportalbackend.services;

import com.project.examportalbackend.models.Subject;
import com.project.examportalbackend.models.User;

import javax.persistence.Access;
import java.nio.file.AccessDeniedException;
import java.util.List;

public interface SubjectService {

    Subject addSubject(Subject subject); //TODO method only used for static data, should be removed

    List<Subject> getAllSubjects(long adminId) throws AccessDeniedException;

    List<Subject> getSubjectsByStudentId(long studentId) throws AccessDeniedException;

//    List<Subject> getSubjects();

    Subject getSubject(long subjectId);

//    Subject updateSubject(Subject subject);

//    void deleteSubject(Long subjectId);

    Subject getSubjectFromProfessor(long professorId);


    void verifySubjectHasStudent(User student, Subject subject);
}
