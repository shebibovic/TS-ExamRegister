package com.project.examportalbackend.services.implementation;

import com.project.examportalbackend.exception.exceptions.ResourceNotFoundException;
import com.project.examportalbackend.models.Exam;
import com.project.examportalbackend.models.Subject;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.repository.SubjectRepository;
import com.project.examportalbackend.repository.UserRepository;
import com.project.examportalbackend.services.AuthService;
import com.project.examportalbackend.services.ExamService;
import com.project.examportalbackend.services.SubjectService;
import com.project.examportalbackend.services.UserService;
import com.project.examportalbackend.utils.constants.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private SubjectService subjectService;

//    @Override
//    public User createUser(User user) {
//        return userRepository.save(user);
//    }
//
//    @Override
//    public List<User> getUsers() {
//        return userRepository.findAll();
//    }

    @Override
    public User getUser(long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()){
            throw new ResourceNotFoundException("User with id:" + userId + "doesn't exist");
        }
        return user.get();
    }

//    @Override
//    public List<User> getAllProfesors() {
//        List<User> users = userRepository.findAll();
//        List<User> profesori = new ArrayList<>();
//        for(User u: users){
//            if(u.getRole().getRoleName().equals("PROFESSOR")) profesori.add(u);
//        }
//        return profesori;
//    }
//    @Override
//    public List<User> getAllStudents() {
//        List<User> users = userRepository.findAll();
//        List<User> studenti = new ArrayList<>();
//        for(User u: users){
//            if(u.getRole().getRoleName().equals("STUDENT")) studenti.add(u);
//        }
//        return studenti;
//    }

//    @Override
//    public User getProfessor(Long subjectId) {
//        List<User> users = userRepository.findAll();
//        List<Subject> subjects = subjectRepository.findAll();
//        for(Subject subject :subjects){
//            if(subject.getSubjectId()==subjectId)
//                return subject.getProfessor();
//        }
//        return null;
//    }

    @Override
    public List<User> getAllStudentsFromSubjectForProfessor(long professorId) throws AccessDeniedException {
        authService.verifyUserRole(professorId, Roles.PROFESSOR.toString());
        Subject subject = subjectService.getSubjectFromProfessor(professorId);
        return subject.getStudents();
    }


}