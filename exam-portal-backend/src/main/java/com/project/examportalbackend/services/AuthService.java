package com.project.examportalbackend.services;

import com.project.examportalbackend.models.LoginRequest;
import com.project.examportalbackend.models.LoginResponse;
import com.project.examportalbackend.models.Role;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.models.dto.request.UserRequestDto;

import java.nio.file.AccessDeniedException;
import java.util.List;

public interface AuthService {
    User registerUserService(UserRequestDto user);

    User updateUser(UserRequestDto user);

    void deleteUser(long userId);

    Role getUserRoleByUserId(long userId);

    User getUserFromToken();

    User getUser(long userId);

    void verifyUserRole(long userId, String roleName) throws AccessDeniedException;

    LoginResponse loginUserService(LoginRequest loginRequest) throws Exception;
}
