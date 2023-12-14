package com.project.examportalbackend.services;

import com.project.examportalbackend.models.Subject;

import java.util.List;

public interface SubjectService {

    Subject addSubject(Subject subject);

    List<Subject> getSubjectsByStudentId(long studentId);

    List<Subject> getSubjects();

    Subject getSubject(Long catId);

    Subject updateSubject(Subject subject);

    void deleteSubject(Long subjectId);

    List<Subject> getSubjectsFromProfessor(Long professorId);
}
