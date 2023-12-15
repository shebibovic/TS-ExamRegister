package com.project.examportalbackend.services;

import com.project.examportalbackend.models.User;

import java.util.List;

public interface UserService {

    User createUser(User user);

    List<User> getUsers();

    User getUser(Long userId);

    List<User> getAllProfesors();

    List<User> getAllStudents();

    User getProfessor(Long profesorId);
}