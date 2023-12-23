package com.project.examportalbackend.services;

import com.project.examportalbackend.models.LoginRequest;
import com.project.examportalbackend.models.LoginResponse;
import com.project.examportalbackend.models.Role;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.models.dto.request.LoginOtpRequestDto;
import com.project.examportalbackend.models.dto.request.UserRequestDto;
import com.project.examportalbackend.models.dto.request.UserUpdateRequestDto;
import org.springframework.data.util.Pair;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.nio.file.AccessDeniedException;
import java.util.Date;
import java.util.List;

public interface AuthService {
    User registerUserService(UserRequestDto user) throws MessagingException, UnsupportedEncodingException;

//    User updateUser(UserRequestDto user);

    void approveUpdate(long userId);

    void denyUpdate(long userId);


    List<UserUpdateRequestDto> getAllUpdateRequests();


    void requestUpdate(long userId, UserUpdateRequestDto user);

    void deleteUser(long userId);

    Pair<String, Date> generateOneTimePassword();

    void setNewOneTimePassword(long userId) throws MessagingException, UnsupportedEncodingException;

    void sendOTPEmail(User user, String otp) throws MessagingException, UnsupportedEncodingException;

    void clearOTP(long userId);
    Role getUserRoleByUserId(long userId);

    User getUserFromToken();

    User getUser(long userId);

    void verifyUserRole(long userId, String roleName) throws AccessDeniedException;

    LoginResponse loginUserService(LoginRequest loginRequest);

    LoginResponse loginOtpUserService(LoginOtpRequestDto loginOtpRequestDto) throws AccessDeniedException;

    void resetPassword(long userId, String password);

    void changePasswordRequest(long userId) throws MessagingException, UnsupportedEncodingException;

    void changePassword(long userId, String password, String passwordCode) throws AccessDeniedException;

    void sendChangePasswordEmail(User user, String code) throws MessagingException, UnsupportedEncodingException;

}
