package com.project.examportalbackend.services.implementation;

import com.project.examportalbackend.exception.exceptions.ResourceNotFoundException;
import com.project.examportalbackend.models.Subject;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.repository.SubjectRepository;
import com.project.examportalbackend.services.AuthService;
import com.project.examportalbackend.services.SubjectService;
import com.project.examportalbackend.utils.constants.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SubjectServiceImpl implements SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private AuthService authService;

    @Override
    public Subject addSubject(Subject subject) {
        return subjectRepository.save(subject);
    }
//
//    @Override
//    public List<Subject> getSubjects() {
//        return subjectRepository.findAll();
//    }
//
    @Override
    public Subject getSubject(long subjectId) {
        Optional<Subject> subject = subjectRepository.findById(subjectId);
        if(subject.isEmpty()){
            throw new ResourceNotFoundException("Subject with id:" + subjectId + "doesn't exist");
        }
        return subject.get();
    }
//
//    @Override
//    public Subject updateSubject(Subject subject) {
//        return subjectRepository.save(subject);
//    }
//
//    @Override
//    public void deleteSubject(Long subjectId) {
//        subjectRepository.delete(getSubject(subjectId));
//    }

    @Override
    public Subject getSubjectFromProfessor(long professorId) throws AccessDeniedException {
        authService.verifyUserRole(professorId,Roles.PROFESSOR.toString());
        Subject subject = subjectRepository.findByProfessorUserId(professorId);
        if(subject == null){
            throw new IllegalArgumentException("Professor doesn't have a subject");
        }
        return subject;
    }

    @Override
    public List<Subject> getSubjectsByStudentId(long studentId) throws AccessDeniedException {
        authService.verifyUserRole(studentId, Roles.STUDENT.toString());
        return subjectRepository.findByStudentsUserId(studentId);
    }

    @Override
    public void verifySubjectHasStudent(User student, Subject subject){
        if(!subject.getStudents().contains(student)){
            throw new IllegalArgumentException("Student " + student.getFullName() + " doesn't attend the subject " + subject.getTitle());
        }
    }
}
