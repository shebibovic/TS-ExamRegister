package com.project.examportalbackend.services.implementation;

import com.project.examportalbackend.configurations.JwtUtil;
import com.project.examportalbackend.exception.exceptions.ResourceNotFoundException;
import com.project.examportalbackend.models.*;
import com.project.examportalbackend.models.dto.request.UserRequestDto;
import com.project.examportalbackend.repository.RoleRepository;
import com.project.examportalbackend.repository.SubjectRepository;
import com.project.examportalbackend.repository.UserRepository;
import com.project.examportalbackend.services.AuthService;
import com.project.examportalbackend.utils.constants.Roles;
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
import java.util.List;
import java.util.Objects;
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
    private SubjectRepository subjectRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public User registerUserService(UserRequestDto userRequestDto) {

        User temp = userRepository.findByEmail(userRequestDto.getEmail());
        if (temp != null) {
            throw new IllegalArgumentException("User with email: " + userRequestDto.getEmail() + " already exists;");
        }

        Role role = getRole(userRequestDto.getRole());
        userRequestDto.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));
        return userRepository.save(new User(
                userRequestDto.getFirstName(),
                userRequestDto.getLastName(),
                userRequestDto.getEmail(),
                userRequestDto.getPassword(),
                userRequestDto.getPhoneNumber(),
                role));
    }

    @Override
    public User updateUser(UserRequestDto userRequestDto) {

        if (userRequestDto.getUserId() == -1) {
            throw new IllegalArgumentException("You must pass the id of the user you wish to update");
        }
        getUser(userRequestDto.getUserId());
        Role role = getRole(userRequestDto.getRole());

        userRequestDto.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));
        return userRepository.save(new User(
                userRequestDto.getUserId(),
                userRequestDto.getFirstName(),
                userRequestDto.getLastName(),
                userRequestDto.getEmail(),
                userRequestDto.getPassword(),
                userRequestDto.getPhoneNumber(),
                role));
    }

    @Override
    public void deleteUser(long userId) {
        User user = getUser(userId);
        if (Objects.equals(user.getRole().getRoleName(), Roles.PROFESSOR.toString())) {
            Subject subject = subjectRepository.findByProfessorUserId(user.getUserId());
            if (subject != null) {
                throw new IllegalArgumentException("Can't delete professor "
                        + user.getFullName()
                        + " because he is assigned to a subject");
            }
        }
        userRepository.delete(user);
    }

    public Role getRole(String roleName) {
        Optional<Role> role = roleRepository.findById(roleName);
        if (role.isEmpty()) {
            throw new ResourceNotFoundException("Role " + roleName + "doesn't exist");
        }
        return role.get();
    }

    public LoginResponse loginUserService(LoginRequest loginRequest) throws Exception {
        authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(loginRequest.getEmail());
        String token = jwtUtil.generateToken(userDetails);
        return new LoginResponse(userRepository.findByEmail(loginRequest.getEmail()), token);
    }

    public Role getUserRoleByUserId(long userId) throws ResourceNotFoundException {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return user.get().getRole();
        } else {
            throw new ResourceNotFoundException("User with id " + userId + " doesn't exist");
        }
    }

    @Override
    public User getUser(long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("User with id:" + userId + "doesn't exist");
        }
        return user.get();
    }

    @Override
    public User getUserFromToken() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public void verifyUserRole(long userId, String roleName) throws AccessDeniedException {
        if (!getUserRoleByUserId(userId).getRoleName().equals(roleName)) {
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