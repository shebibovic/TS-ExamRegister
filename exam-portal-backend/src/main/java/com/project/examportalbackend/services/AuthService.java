package com.project.examportalbackend.services;

import com.project.examportalbackend.models.LoginRequest;
import com.project.examportalbackend.models.LoginResponse;
import com.project.examportalbackend.models.Role;
import com.project.examportalbackend.models.User;

public interface AuthService {
    User registerUserService(User user) throws Exception;

    Role getUserRoleByUserId(long userId) throws Exception;

    boolean isUserRole(long userId, String roleName) throws Exception;

    LoginResponse loginUserService(LoginRequest loginRequest) throws Exception;
}
