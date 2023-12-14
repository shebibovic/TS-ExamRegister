package com.project.examportalbackend;

import com.project.examportalbackend.models.Exam;
import com.project.examportalbackend.models.Role;
import com.project.examportalbackend.models.Subject;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.repository.RoleRepository;
import com.project.examportalbackend.repository.UserRepository;
import com.project.examportalbackend.services.AddStaticData;
import com.project.examportalbackend.services.SubjectService;
import com.project.examportalbackend.services.ExamService;
import com.project.examportalbackend.services.implementation.AuthServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;

@SpringBootApplication
public class ExamPortalBackendApplication {

	@Autowired
	AddStaticData addStaticData;

	public static void main(String[] args) {
		SpringApplication.run(ExamPortalBackendApplication.class, args);
	}

	@Bean
	public ApplicationRunner initializer() {
		return args -> addStaticData.addStaticData();
	}

}