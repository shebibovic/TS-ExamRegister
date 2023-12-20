package com.project.examportalbackend.services.implementation;

import com.project.examportalbackend.exception.exceptions.ResourceNotFoundException;
import com.project.examportalbackend.models.Subject;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.models.dto.request.SubjectRequestDto;
import com.project.examportalbackend.models.dto.response.SubjectResponseDto;
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
        System.out.println(subject.getStudents());
        return subjectRepository.save(subject);
    }

    @Override
    public Subject addSubject(SubjectRequestDto subjectRequestDto) throws AccessDeniedException {
        for(long studentId: subjectRequestDto.getStudents()){
            authService.verifyUserRole(studentId, Roles.STUDENT.toString());
        }
        authService.verifyUserRole(subjectRequestDto.getProfessorId(), Roles.PROFESSOR.toString());
        List<User> students = subjectRequestDto.getStudents().stream().map(item -> authService.getUser(item)).toList();
        return subjectRepository.save(new Subject(
                subjectRequestDto.getTitle(),
                subjectRequestDto.getDescription(),
                authService.getUser(subjectRequestDto.getProfessorId()),
                students));

    }

    @Override
    public Subject updateSubject(SubjectRequestDto subjectRequestDto) throws AccessDeniedException {
        if(subjectRequestDto.getSubjectId() == -1){
            throw new IllegalArgumentException("You must pass the id of the exam you wish to update");
        }
        getSubject(subjectRequestDto.getSubjectId());

        for(long studentId: subjectRequestDto.getStudents()){
            authService.verifyUserRole(studentId, Roles.STUDENT.toString());
        }
        authService.verifyUserRole(subjectRequestDto.getProfessorId(), Roles.PROFESSOR.toString());
        List<User> students = subjectRequestDto.getStudents().stream().map(item -> authService.getUser(item)).toList();
        return subjectRepository.save(new Subject(
                subjectRequestDto.getSubjectId(),
                subjectRequestDto.getTitle(),
                subjectRequestDto.getDescription(),
                authService.getUser(subjectRequestDto.getProfessorId()),
                students));

    }
//
//    @Override
//    public List<Subject> getSubjects() {
//        return subjectRepository.findAll();
//    }
//
    @Override
    public SubjectResponseDto getSubjectDto(long subjectId) {
        Optional<Subject> subject = subjectRepository.findById(subjectId);
        if(subject.isEmpty()){
            throw new ResourceNotFoundException("Subject with id:" + subjectId + "doesn't exist");
        }
        return new SubjectResponseDto(
                subject.get().getTitle(),
                subject.get().getDescription(),
                subject.get().getProfessor(),
                subject.get().getStudents());
    }

    @Override
    public Subject getSubject(long subjectId) {
        Optional<Subject> subject = subjectRepository.findById(subjectId);
        if(subject.isEmpty()){
            throw new ResourceNotFoundException("Subject with id:" + subjectId + "doesn't exist");
        }
        return subject.get();
    }
//
    @Override
    public Subject updateSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    @Override
    public void deleteSubject(Long subjectId) {
        subjectRepository.delete(getSubject(subjectId));
    }

    @Override
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    @Override
    public Subject getSubjectFromProfessor(long professorId) {
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
