package com.project.examportalbackend;

import com.project.examportalbackend.models.Quiz;
import com.project.examportalbackend.models.Role;
import com.project.examportalbackend.models.Subject;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.repository.RoleRepository;
import com.project.examportalbackend.repository.UserRepository;
import com.project.examportalbackend.services.CategoryService;
import com.project.examportalbackend.services.QuizService;
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
	AuthServiceImpl authService;

	@Autowired
	CategoryService categoryService;

	@Autowired
	QuizService quizService;

	public static void main(String[] args) {
		SpringApplication.run(ExamPortalBackendApplication.class, args);
	}

	@Bean
	public ApplicationRunner initializer(RoleRepository roleRepository, UserRepository userRepository) {
		return args -> {
//			Role studentRole = Role.builder().roleName("STUDENT").roleDescription("Default Role provided to each user").build();
//			Role adminRole = Role.builder().roleName("ADMIN").roleDescription("Superuser, who has access to all functionality").build();
//			Role professorRole = Role.builder().roleName("PROFESSOR").roleDescription("Superuser, who is a professor").build();
//			roleRepository.saveAll(Arrays.asList(studentRole, adminRole, professorRole));
//
////
//			var admin1 = new User(
//					"Admin",
//					"Admin",
//					"admin1",
//					"knurikic1@etf.unsa.ba",
//					"password",
//					"0501035",
//					adminRole);
//			var student1 = new User(
//					"Student1",
//					"Nedi",
//					"student1",
//					"knurikic10@etf.unsa.ba",
//					"password",
//					"0501035",
//					studentRole);
//			var student2 = new User(
//					"Student2",
//					"Nedi",
//					"student2",
//					"knurikic2@etf.unsa.ba",
//					"password",
//					"0501035",
//					studentRole);
//			var student3 = new User(
//					"Student3",
//					"Nedi",
//					"student3",
//					"knurikic4@etf.unsa.ba",
//					"password",
//					"0501035",
//					studentRole);
//			var student4 = new User(
//					"Student4",
//					"Nedi",
//					"student4",
//					"knurikic5@etf.unsa.ba",
//					"password",
//					"0501035",
//					studentRole);
//			var student5 = new User(
//					"STudent5",
//					"Nedi",
//					"student5",
//					"knurikic6@etf.unsa.ba",
//					"password",
//					"0501035",
//					studentRole);
//
//			var student6 = new User(
//					"Student6",
//					"Nedi",
//					"Student6",
//					"knurikic7@etf.unsa.ba",
//					"password",
//					"0501035",
//					studentRole);
//
//			var prof1 = new User(
//					"Profesor1",
//					"Sani",
//					"profesor1",
//					"knurikic3@etf.unsa.ba",
//
//					"password",
//					"0501035",
//					professorRole);
//
//			var prof2 = new User(
//					"Profesor2",
//					"Sani",
//					"profesor2",
//					"knurikic9@etf.unsa.ba",
//
//					"password",
//					"0501035",
//					professorRole);
//
//			authService.registerUserService(admin1);
//			authService.registerUserService(student1);
//			authService.registerUserService(student2);
//			authService.registerUserService(student3);
//			authService.registerUserService(student4);
//			authService.registerUserService(student5);
//			authService.registerUserService(student6);
//			authService.registerUserService(prof1);
//			authService.registerUserService(prof2);
////
//			Subject predmet1 = new Subject("Predmet 1", "Opis predmeta 1");
//			Subject predmet2 = new Subject("Predmet 2", "Opis predmeta 2");
////
//			predmet1.addStudent(student1);
//			predmet1.addStudent(student2);
//			predmet1.addStudent(student3);
//			predmet1.addStudent(student4);
//
//			predmet2.addStudent(student3);
//			predmet2.addStudent(student4);
//			predmet2.addStudent(student5);
//			predmet2.addStudent(student6);
//
//			predmet1.setProfessor(prof1);
//			predmet2.setProfessor(prof2);
////
//			Quiz quiz1 = new Quiz("Kviz1","kviz 1", predmet1);
//			Quiz quiz2 = new Quiz("Kviz2","kviz 2", predmet2);
//
//			categoryService.addCategory(predmet1);
//			categoryService.addCategory(predmet2);
//
//			quizService.addQuiz(quiz1);
//			quizService.addQuiz(quiz2);
////
//			predmet1.addQuiz(quiz1);
//			predmet2.addQuiz(quiz2);
////


		};
	}

}