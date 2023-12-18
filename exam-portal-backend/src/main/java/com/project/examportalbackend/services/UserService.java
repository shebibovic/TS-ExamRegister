package com.project.examportalbackend.services;

import com.project.examportalbackend.models.User;

import java.nio.file.AccessDeniedException;
import java.util.List;

public interface UserService {

    User createUser(User user);

    List<User> getUsers();

    User getUser(long userId);

    List<User> getAllProfesors();

    List<User> getAllStudents();

    List<User> getAllStudentsFromSubjectForProfessor(long professorId) throws AccessDeniedException;


    User getProfessor(Long profesorId);
}