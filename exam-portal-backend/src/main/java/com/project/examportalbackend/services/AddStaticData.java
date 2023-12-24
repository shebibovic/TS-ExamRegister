//package com.project.examportalbackend.services;
//
//import com.project.examportalbackend.models.Exam;
//import com.project.examportalbackend.models.Role;
//import com.project.examportalbackend.models.Subject;
//import com.project.examportalbackend.models.User;
//import com.project.examportalbackend.models.dto.request.SubjectRequestDto;
//import com.project.examportalbackend.models.dto.request.UserRequestDto;
//import com.project.examportalbackend.repository.RoleRepository;
//import com.project.examportalbackend.services.implementation.AuthServiceImpl;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.Arrays;
//import java.util.Calendar;
//import java.util.Date;
//
//@Service
//public class AddStaticData {
//
//    @Autowired
//    AuthServiceImpl authService;
//
//    @Autowired
//    SubjectService subjectService;
//
//    @Autowired
//    ExamService examService;
//
//    @Autowired
//    RoleRepository roleRepository;
//
//    public void addStaticData() throws Exception {
//        Role studentRole = Role.builder().roleName("STUDENT").roleDescription("Default Role provided to each user").build();
//        Role adminRole = Role.builder().roleName("ADMIN").roleDescription("Superuser, who has access to all functionality").build();
//        Role professorRole = Role.builder().roleName("PROFESSOR").roleDescription("Superuser, who is a professor").build();
//        roleRepository.saveAll(Arrays.asList(studentRole, adminRole, professorRole));
//
//        var admin1 = new User(
//                "Admin",
//                "Admin",
//                "kerimnurikic16@gmail.com",
//                "password",
//                "0501035",
//                adminRole);
//        var student1 = new User(
//                "Student1",
//                "Nedi",
//                "knurikic10@etf.unsa.ba",
//                "password",
//                "0501035",
//                studentRole);
//        var student2 = new User(
//                "Student2",
//                "Nedi",
//                "knurikic2@etf.unsa.ba",
//                "password",
//                "0501035",
//                studentRole);
//        var student3 = new User(
//                "Student3",
//                "Nedi",
//                "knurikic4@etf.unsa.ba",
//                "password",
//                "0501035",
//                studentRole);
//        var student4 = new User(
//                "Student4",
//                "Nedi",
//                "knurikic5@etf.unsa.ba",
//                "password",
//                "0501035",
//                studentRole);
//        var student5 = new User(
//                "STudent5",
//                "Nedi",
//                "knurikic6@etf.unsa.ba",
//                "password",
//                "0501035",
//                studentRole);
//
//        var student6 = new User(
//                "Student6",
//                "Nedi",
//                "knurikic7@etf.unsa.ba",
//                "password",
//                "0501035",
//                studentRole);
//
//        var prof1 = new User(
//                "Profesor1",
//                "Sani",
//                "knurikic1@etf.unsa.ba",
//
//                "password",
//                "0501035",
//                professorRole);
//
//        var prof2 = new User(
//                "Profesor2",
//                "Sani",
//                "knurikic9@etf.unsa.ba",
//
//                "password",
//                "0501035",
//                professorRole);
//
//        var prof3 = new User(
//                "Profesor3",
//                "Sani3",
//                "knurikic11@etf.unsa.ba",
//                "password",
//                "0501035",
//                professorRole);
//
//        admin1 = authService.registerUserService(new UserRequestDto(admin1));
//        student1 = authService.registerUserService(new UserRequestDto(student1));
//        student2 = authService.registerUserService(new UserRequestDto(student2));
//        student3 = authService.registerUserService(new UserRequestDto(student3));
//        student4 = authService.registerUserService(new UserRequestDto(student4));
//        student5 = authService.registerUserService(new UserRequestDto(student5));
//        student6 = authService.registerUserService(new UserRequestDto(student6));
//        prof1 = authService.registerUserService(new UserRequestDto(prof1));
//        prof2 = authService.registerUserService(new UserRequestDto(prof2));
//        prof3 = authService.registerUserService(new UserRequestDto(prof3));
//
//        Subject predmet1 = new Subject("Predmet 1", "Opis predmeta 1");
//        Subject predmet2 = new Subject("Predmet 2", "Opis predmeta 2");
//
//        predmet1.addStudent(student1);
//        predmet1.addStudent(student2);
//        predmet1.addStudent(student3);
//        predmet1.addStudent(student4);
//
//        predmet2.addStudent(student3);
//        predmet2.addStudent(student4);
//        predmet2.addStudent(student5);
//        predmet2.addStudent(student6);
//
//        predmet1.setProfessor(prof1);
//        predmet2.setProfessor(prof2);
//
//        Calendar cal = Calendar.getInstance();
//        cal.set(Calendar.YEAR, 2023);
//        cal.set(Calendar.MONTH, Calendar.DECEMBER);
//        cal.set(Calendar.DAY_OF_MONTH, 25);
//        Date registrationDeadlineDate = cal.getTime();
//
//        Calendar cal2 = Calendar.getInstance();
//        cal2.set(Calendar.YEAR, 2023);
//        cal2.set(Calendar.MONTH, Calendar.DECEMBER);
//        cal2.set(Calendar.DAY_OF_MONTH, 10);
//        Date registrationDeadlineDatePassed = cal2.getTime();
//
//        Calendar cal3 = Calendar.getInstance();
//        cal3.set(Calendar.YEAR, 2023);
//        cal3.set(Calendar.MONTH, Calendar.DECEMBER);
//        cal3.set(Calendar.DAY_OF_MONTH, 30);
//        Date startDate = cal3.getTime();
//
//        predmet1 = subjectService.addSubject(new SubjectRequestDto(predmet1));
//        predmet2 = subjectService.addSubject(new SubjectRequestDto(predmet2));
//
//        Exam exam1 = new Exam("Kviz1","kviz 1", predmet1, registrationDeadlineDate, startDate);
//        Exam exam2 = new Exam("Kviz2","kviz 2", predmet2, registrationDeadlineDatePassed, startDate);
//        exam1.setRegisteredStudents(Arrays.asList(student1,student2,student3,student4));
//        exam2.setRegisteredStudents(Arrays.asList(student3,student4,student5,student6));
//
//        examService.addExam(exam1);
//        examService.addExam(exam2);
//
//        predmet1.addExam(exam1);
//        predmet2.addExam(exam2);
//    }
//}
