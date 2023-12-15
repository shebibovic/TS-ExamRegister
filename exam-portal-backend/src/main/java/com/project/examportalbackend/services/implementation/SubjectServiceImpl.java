package com.project.examportalbackend.services.implementation;

import com.project.examportalbackend.models.Subject;
import com.project.examportalbackend.repository.SubjectRepository;
import com.project.examportalbackend.services.AuthService;
import com.project.examportalbackend.services.SubjectService;
import com.project.examportalbackend.utils.constants.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;

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

    @Override
    public List<Subject> getSubjects() {
        return subjectRepository.findAll();
    }

    @Override
    public Subject getSubject(Long subjectId) {
        return subjectRepository.findById(subjectId).isPresent() ? subjectRepository.findById(subjectId).get() : null;
    }

    @Override
    public Subject updateSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    @Override
    public void deleteSubject(Long subjectId) {
        subjectRepository.delete(getSubject(subjectId));
    }

    @Override
    public List<Subject> getSubjectsFromProfessor(Long professorId) {
        List<Subject> subjects = subjectRepository.findAll();
        List<Subject> professorSubject = new ArrayList<>();
        for( Subject c: subjects){
            if(c.getProfessor().getUserId()==professorId)
                professorSubject.add(c);
        }
        return professorSubject;
    }

    @Override
    public List<Subject> getSubjectsByStudentId(long studentId) throws AccessDeniedException {
        authService.verifyUserRole(studentId, Roles.STUDENT.toString());
        return subjectRepository.findByStudentsUserId(studentId);
    }
}
