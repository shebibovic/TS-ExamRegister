package com.project.examportalbackend.services;

import com.project.examportalbackend.models.LoginRequest;
import com.project.examportalbackend.models.LoginResponse;
import com.project.examportalbackend.models.Role;
import com.project.examportalbackend.models.User;

import java.nio.file.AccessDeniedException;
import java.util.List;

public interface AuthService {
    User registerUserService(User user) throws Exception;

    Role getUserRoleByUserId(long userId) throws Exception;

    User getUserFromToken();

    User getUser(long userId);

    void verifyUserRole(long userId, String roleName) throws AccessDeniedException;

    LoginResponse loginUserService(LoginRequest loginRequest) throws Exception;
}
