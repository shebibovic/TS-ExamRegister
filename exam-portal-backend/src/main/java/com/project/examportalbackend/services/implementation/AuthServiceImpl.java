package com.project.examportalbackend.services.implementation;

import com.project.examportalbackend.configurations.JwtUtil;
import com.project.examportalbackend.exception.exceptions.ResourceNotFoundException;
import com.project.examportalbackend.models.LoginRequest;
import com.project.examportalbackend.models.LoginResponse;
import com.project.examportalbackend.models.Role;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.repository.RoleRepository;
import com.project.examportalbackend.repository.UserRepository;
import com.project.examportalbackend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public User registerUserService(User user) throws Exception {

        User temp = userRepository.findByEmail(user.getUsername());
        if (temp != null) {
            throw new Exception("User with username: " + user.getUsername() + " already exists;");
        }
        temp = userRepository.findByEmail(user.getEmail());
        if(temp != null) {
            throw new Exception("User with email: " + user.getEmail() + " already exists;");
        }
            Role role = roleRepository.findById(user.getRole().getRoleName()).orElse(null);
            user.setRole(role);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepository.save(user);
    }

    public LoginResponse loginUserService(LoginRequest loginRequest) throws Exception {
        authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(loginRequest.getEmail());
        String token = jwtUtil.generateToken(userDetails);
        return new LoginResponse(userRepository.findByEmail(loginRequest.getEmail()), token);
    }

    public Role getUserRoleByUserId(long userId) throws ResourceNotFoundException {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()){
            return user.get().getRole();
        } else {
            throw new ResourceNotFoundException("User with id " + userId + " doesn't exist");
        }
    }

    @Override
    public User getUserFromToken() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    }

    public void verifyUserRole(long userId, String roleName) throws AccessDeniedException {
        if(!getUserRoleByUserId(userId).getRoleName().equals(roleName)){
            throw new AccessDeniedException("User must be a " + roleName);
        }
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new DisabledException("User " + username + " is disabled", e);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect email or password", e);
        }
    }
}