package com.project.examportalbackend.services;

import com.project.examportalbackend.models.User;

import java.nio.file.AccessDeniedException;
import java.util.List;

public interface UserService {

//    User createUser(User user);

//    List<User> getUsers();

//    User getUser(long userId);

    List<User> getAllProfesors();

    List<User> getAllStudents();

    List<User> getAllUsers(long adminId) throws AccessDeniedException;


    List<User> getAllStudentsFromSubjectForProfessor(long professorId);

    List<User> getAllStudentsFromSubject(long subjectId);

    List<User> getAllAvailableStudentsForSubject(long subjectId);

    List<User> getAvailableProfessors();

//    User getProfessor(Long profesorId);
}