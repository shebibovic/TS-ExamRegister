package com.project.examportalbackend.services;

import com.project.examportalbackend.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User createUser(User user);

    List<User> getUsers();

    Optional<User> getUser(Long studentId);

    List<User> getAllProfesors();

    List<User> getAllStudents();
}