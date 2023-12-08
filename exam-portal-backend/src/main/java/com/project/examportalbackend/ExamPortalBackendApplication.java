package com.project.examportalbackend;

import com.project.examportalbackend.models.Role;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.repository.RoleRepository;
import com.project.examportalbackend.repository.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;
import java.util.HashSet;

@SpringBootApplication
public class ExamPortalBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExamPortalBackendApplication.class, args);
	}

	@Bean
	public ApplicationRunner initializer(RoleRepository roleRepository, UserRepository userRepository) {
		return args -> {
			Role studentRole = Role.builder().roleName("STUDENT").roleDescription("Default Role provided to each user").build();
			Role adminRole = Role.builder().roleName("ADMIN").roleDescription("Superuser, who has access to all functionality").build();
			Role professorRole = Role.builder().roleName("PROFESSOR").roleDescription("Superuser, who is a professor").build();
			roleRepository.saveAll(Arrays.asList(studentRole, adminRole, professorRole));

			User admin = new User("Kerim","Nurikic", "KerimNurikic", "password", "050123", true, adminRole);
			userRepository.save(admin);
		};
	}

}