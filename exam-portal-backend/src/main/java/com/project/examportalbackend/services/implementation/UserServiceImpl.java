package com.project.examportalbackend.services.implementation;

import com.project.examportalbackend.models.User;
import com.project.examportalbackend.repository.CategoryRepository;
//import com.project.examportalbackend.repository.StudentCategoryRepository;
import com.project.examportalbackend.repository.UserRepository;
//import com.project.examportalbackend.services.UserService;
import com.project.examportalbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    //@Autowired
    //private StudentCategoryRepository studentCategoryRepository;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUser(Long studentId) {
        return userRepository.findById(studentId);
    }

    @Override
    public List<User> getAllProfesors() {
        List<User> users = userRepository.findAll();
        List<User> profesori = new ArrayList<>();
        for(User u: users){
            if(u.getRole().getRoleName().equals("PROFESSOR")) profesori.add(u);
        }
        return profesori;
    }
    @Override
    public List<User> getAllStudents() {
        List<User> users = userRepository.findAll();
        List<User> studenti = new ArrayList<>();
        for(User u: users){
            if(u.getRole().getRoleName().equals("STUDENT")) studenti.add(u);
        }
        return studenti;
    }


}