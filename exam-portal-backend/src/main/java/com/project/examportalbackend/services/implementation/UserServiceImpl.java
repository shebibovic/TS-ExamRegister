package com.project.examportalbackend.services.implementation;

import com.project.examportalbackend.exception.exceptions.ResourceNotFoundException;
import com.project.examportalbackend.models.Exam;
import com.project.examportalbackend.models.Role;
import com.project.examportalbackend.models.Subject;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.repository.SubjectRepository;
import com.project.examportalbackend.repository.UserRepository;
import com.project.examportalbackend.services.AuthService;
import com.project.examportalbackend.services.ExamService;
import com.project.examportalbackend.services.SubjectService;
import com.project.examportalbackend.services.UserService;
import com.project.examportalbackend.utils.constants.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private SubjectService subjectService;

//    @Override
//    public User createUser(User user) {
//        return userRepository.save(user);
//    }
//
//    @Override
//    public List<User> getUsers() {
//        return userRepository.findAll();
//    }

//    @Override
//    public User getUser(long userId) {
//        Optional<User> user = userRepository.findById(userId);
//        if(user.isEmpty()){
//            throw new ResourceNotFoundException("User with id:" + userId + "doesn't exist");
//        }
//        return user.get();
//    }

    @Override
    public List<User> getAllProfesors() {
        return userRepository.findAll().stream().filter(item -> item.getRole().getRoleName().equals(Roles.PROFESSOR.toString())).toList();
    }
    @Override
    public List<User> getAllStudents() {
        return userRepository.findAll().stream().filter(item -> item.getRole().getRoleName().equals(Roles.STUDENT.toString())).toList();
    }

    @Override
    public List<User> getAllUsers(long adminId) throws AccessDeniedException {
        authService.verifyUserRole(adminId, Roles.ADMIN.toString());
        return userRepository.findAll();
    }



    @Override
    public List<User> getAllStudentsFromSubjectForProfessor(long professorId) {
        Subject subject = subjectService.getSubjectFromProfessor(professorId);
        return subject.getStudents();
    }

    @Override
    public List<User> getAllStudentsFromSubject(long subjectId) {
        Subject subject = subjectService.getSubject(subjectId);
        return subject.getStudents();
    }

    @Override
    public List<User> getAvailableProfessors() {
        List<User> professors = getAllProfesors();
        List<Subject> subjects = subjectService.getAllSubjects();
        List<User> professorsWithASubject = subjects.stream().map(Subject::getProfessor).toList();
        return professors.stream().filter(item -> !professorsWithASubject.contains(item)).toList();
    }

    public List<User> getAllAvailableStudentsForSubject(long subjectId){
        Subject subject = subjectService.getSubject(subjectId);
        List<User> subjectUsers = subject.getStudents();
        List<User> availableStudents = getAllStudents();
        return availableStudents.stream().filter(student -> !subjectUsers.contains(student)).toList();
    }

}