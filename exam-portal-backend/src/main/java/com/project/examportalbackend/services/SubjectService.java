package com.project.examportalbackend.services;

import com.project.examportalbackend.models.Subject;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.models.dto.request.SubjectRequestDto;
import com.project.examportalbackend.models.dto.response.SubjectResponseDto;

import javax.persistence.Access;
import java.nio.file.AccessDeniedException;
import java.util.List;

public interface SubjectService {

    Subject addSubject(Subject subject); //TODO method only used for static data, should be removed

    Subject addSubject(SubjectRequestDto subjectRequestDto) throws AccessDeniedException;

    Subject updateSubject(SubjectRequestDto subjectRequestDto) throws AccessDeniedException;

    List<Subject> getAllSubjects();

    List<Subject> getSubjectsByStudentId(long studentId) throws AccessDeniedException;

//    List<Subject> getSubjects();

    SubjectResponseDto getSubjectDto(long subjectId);

    Subject getSubject(long subjectId);

    Subject updateSubject(Subject subject);

    void deleteSubject(long subjectId);

    Subject getSubjectFromProfessor(long professorId);


    void verifySubjectHasStudent(User student, Subject subject);
}
