package com.project.examportalbackend.controllers;

import com.project.examportalbackend.models.LoginRequest;
import com.project.examportalbackend.models.LoginResponse;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.models.dto.request.LoginOtpRequestDto;
import com.project.examportalbackend.models.dto.request.PasswordRequestDto;
import com.project.examportalbackend.repository.UserRepository;
import com.project.examportalbackend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.nio.file.AccessDeniedException;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    @Autowired
    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }


    @PostMapping("/login")
    public LoginResponse loginUser(@RequestBody LoginRequest loginRequest) {
        return authService.loginUserService(loginRequest);
    }

    @PostMapping("/login-otp")
    public LoginResponse loginUserOTP(@RequestBody LoginOtpRequestDto loginOtpRequest) throws AccessDeniedException {
        return authService.loginOtpUserService(loginOtpRequest);
    }

    @PreAuthorize("hasAuthority('PROFESSOR') or hasAuthority('STUDENT') or hasAuthority('ADMIN')")
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@Valid @RequestBody PasswordRequestDto passwordRequestDto){
        User user = authService.getUserFromToken();
        authService.resetPassword(user.getUserId(), passwordRequestDto.getPassword());
        return ResponseEntity.ok("Successfully updated password");
    }
}
