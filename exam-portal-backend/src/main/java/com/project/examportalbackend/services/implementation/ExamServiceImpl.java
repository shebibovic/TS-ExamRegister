package com.project.examportalbackend.services.implementation;

import com.project.examportalbackend.exception.exceptions.ResourceNotFoundException;
import com.project.examportalbackend.models.Subject;
import com.project.examportalbackend.models.Exam;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.models.dto.request.ExamRequestDto;
import com.project.examportalbackend.models.dto.response.ExamResponseDto;
import com.project.examportalbackend.repository.ExamRepository;
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
import java.util.stream.Collectors;

@Service
public class ExamServiceImpl implements ExamService {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @Autowired
    private SubjectService subjectService;

    @Override
    public Exam addExam(Exam exam) {
        exam.setSubject(subjectService.getSubject(exam.getSubject().getSubjectId()));
        return examRepository.save(exam);
    }

    public Exam addExamForProfessor(ExamRequestDto examRequestDto, long professorId) throws AccessDeniedException {
        authService.verifyUserRole(professorId, Roles.PROFESSOR.toString());
        Subject subject = subjectService.getSubjectFromProfessor(professorId);

        Exam exam = new Exam(
                examRequestDto.getTitle(),
                examRequestDto.getDescription(),
                subject,
                examRequestDto.getRegistrationDeadlineDate(),
                examRequestDto.getStartDate());

        return examRepository.save(exam);
    }

    public Exam updateExamForProfessor(ExamRequestDto examRequestDto, long professorId) throws AccessDeniedException {
        authService.verifyUserRole(professorId, Roles.PROFESSOR.toString());
        if(examRequestDto.getExamId() == -1){
            throw new IllegalArgumentException("You must pass the id of the exam you wish to update");
        }
        Subject subject = subjectService.getSubjectFromProfessor(professorId);
        getExam(examRequestDto.getExamId());

        Exam exam = new Exam(
                examRequestDto.getExamId(),
                examRequestDto.getTitle(),
                examRequestDto.getDescription(),
                subject,
                examRequestDto.getRegistrationDeadlineDate(),
                examRequestDto.getStartDate());

        return examRepository.save(exam);
    }

    public void deleteExamForProfessor(long examId, long professorId) throws AccessDeniedException {
        authService.verifyUserRole(professorId, Roles.PROFESSOR.toString());
        Exam exam = getExam(examId);
        verifyProfessorHasSubject(exam.getSubject(), professorId);
        examRepository.delete(exam);
    }

//    @Override
//    public List<Exam> getExams() {
//        return examRepository.findAll();
//    }

    @Override
    public Exam getExam(long examId) {
        Optional<Exam> exam = examRepository.findById(examId);
        if(exam.isEmpty()){
            throw new ResourceNotFoundException("Exam with id " + examId + " doesn't exits");
        }
        return exam.get();
    }

//    @Override
//    public Exam updateExam(Exam exam) {
//        return examRepository.save(exam);
//    }
//
//    @Override
//    public void deleteExam(Long examId) {
//        examRepository.deleteById(examId);
//    }

//    @Override
//    public List<Exam> getExamsBySubject(Subject subject) {
//        return examRepository.findBySubject(subject);
//    }

    @Override
    public List<ExamResponseDto> getAllExams(long adminId) throws AccessDeniedException {
        authService.verifyUserRole(adminId, Roles.ADMIN.toString());
        return examRepository.findAll().stream().map(item -> new ExamResponseDto(
                item.getExamId(),
                item.getTitle(),
                item.getDescription(),
                item.getRegistrationDeadlineDate(),
                item.getStartDate(),
                item.getSubject().getTitle()
        )).toList();
    }

    @Override
    public List<ExamResponseDto> getAllActiveExams(long adminId) throws AccessDeniedException {
        authService.verifyUserRole(adminId, Roles.ADMIN.toString());
        return examRepository.findAll().stream().filter(Exam::isActive).map(exam ->
                new ExamResponseDto(
                        exam.getExamId(),
                        exam.getTitle(),
                        exam.getDescription(),
                        exam.getRegistrationDeadlineDate(),
                        exam.getStartDate(),
                        exam.getSubject().getTitle()
                )).toList();
    }

    @Override
    public List<ExamResponseDto> getAllInactiveExams(long adminId) throws AccessDeniedException {
        authService.verifyUserRole(adminId, Roles.ADMIN.toString());
        return examRepository.findAll().stream().filter(item -> !item.isActive()).map(exam ->
                new ExamResponseDto(
                        exam.getExamId(),
                        exam.getTitle(),
                        exam.getDescription(),
                        exam.getRegistrationDeadlineDate(),
                        exam.getStartDate(),
                        exam.getSubject().getTitle()
                )).toList();
    }

    @Override
    public List<ExamResponseDto> getRegisteredActiveExamsByStudent(long studentId) throws AccessDeniedException {
        authService.verifyUserRole(studentId, Roles.STUDENT.toString());
        List<Exam> registeredExams = examRepository.findByRegisteredStudentsUserId(studentId).stream().filter(Exam::isActive).toList();
        return registeredExams.stream().map(
                item -> new ExamResponseDto(
                        item.getExamId(),
                        item.getTitle(),
                        item.getDescription(),
                        item.getRegistrationDeadlineDate(),
                        item.getStartDate(),
                        item.getSubject().getTitle())).collect(Collectors.toList());

    }

    @Override
    public List<ExamResponseDto> getRegisteredInactiveExamsByStudent(long studentId) throws AccessDeniedException {
        authService.verifyUserRole(studentId, Roles.STUDENT.toString());
        List<Exam> registeredExams = examRepository.findByRegisteredStudentsUserId(studentId).stream().filter(item -> !item.isActive()).toList();
        return registeredExams.stream().map(
                item -> new ExamResponseDto(
                        item.getExamId(),
                        item.getTitle(),
                        item.getDescription(),
                        item.getRegistrationDeadlineDate(),
                        item.getStartDate(),
                        item.getSubject().getTitle())).collect(Collectors.toList());
    }

    @Override
    public List<ExamResponseDto> getUnregisteredActiveExamsByStudent(long studentId) throws AccessDeniedException{
        authService.verifyUserRole(studentId, Roles.STUDENT.toString());
        List<Exam> registeredExams = examRepository.findByRegisteredStudentsUserId(studentId).stream().filter(Exam::isActive).toList();
        List<Subject> studentSubjects = subjectService.getSubjectsByStudentId(studentId);
        List<Exam> availableExams = new ArrayList<>();
        for(Subject s: studentSubjects){
            availableExams.addAll(s.getExams());
        }
        return availableExams.stream().filter(item -> !registeredExams.contains(item)).map(item -> new ExamResponseDto(
                item.getExamId(),
                item.getTitle(),
                item.getDescription(),
                item.getRegistrationDeadlineDate(),
                item.getStartDate(),
                item.getSubject().getTitle())).collect(Collectors.toList());
    }

    @Override
    public List<Exam> getActiveExamsByProfessor(long professorId) throws AccessDeniedException {
        authService.verifyUserRole(professorId, Roles.PROFESSOR.toString());
        Subject subject = subjectService.getSubjectFromProfessor(professorId);
        return examRepository.findBySubject(subject).stream().filter(Exam::isActive).toList();
    }

    @Override
    public List<Exam> getInactiveExamsByProfessor(long professorId) throws AccessDeniedException {
        authService.verifyUserRole(professorId, Roles.PROFESSOR.toString());
        Subject subject = subjectService.getSubjectFromProfessor(professorId);
        return examRepository.findBySubject(subject).stream().filter(item -> !item.isActive()).toList();
    }

    @Override
    public List<Exam> getExamsForSubject(long subjectId) {
        Subject subject = subjectService.getSubject(subjectId);
        return subject.getExams();
    }



    @Override
    public Exam registerExamForStudent(long studentId, long examId) throws AccessDeniedException {
        authService.verifyUserRole(studentId, Roles.STUDENT.toString());

        Exam exam = getExam(examId);
        User student = authService.getUser(studentId);

        verifyExamIsActive(exam);
        subjectService.verifySubjectHasStudent(student, exam.getSubject());
        verifyExamRegistration(exam,student,false);

        exam.getRegisteredStudents().add(student);
        return examRepository.save(exam);
    }

    @Override
    public Exam unregisterExamForStudent(long studentId, long examId) throws AccessDeniedException {
        authService.verifyUserRole(studentId, Roles.STUDENT.toString());

        Exam exam = getExam(examId);
        User student = authService.getUser(studentId);

        verifyExamIsActive(exam);
        subjectService.verifySubjectHasStudent(student, exam.getSubject());
        verifyExamRegistration(exam,student,true);

        exam.getRegisteredStudents().remove(student);
        return examRepository.save(exam);
    }

    @Override
    public List<User> getProfessorExamRegisteredStudents(long professorId, long examId) throws AccessDeniedException {
        authService.verifyUserRole(professorId, Roles.PROFESSOR.toString());
        Subject subject = subjectService.getSubjectFromProfessor(professorId);
        Exam exam = getExam(examId);

        if(subject.getExams().contains(exam)){
            return exam.getRegisteredStudents();
        }

        throw new ResourceNotFoundException("Professor with id " + professorId
                + " is not assigned to a subject which has exam " + exam.getTitle());
    }

    private void verifyExamIsActive(Exam exam){
        if(!exam.isActive()){
            throw new IllegalArgumentException("Exam " + exam.getTitle() + " is not active");
        }
    }

    private void verifyExamRegistration(Exam exam, User student, boolean shouldContain){
        if(exam.getRegisteredStudents().contains(student) == !shouldContain){
            throw new IllegalArgumentException("Student " + student.getFullName()
                    + (shouldContain ? " is not registered for exam " : " is already registered for exam ")
                    + exam.getTitle());
        }
    }

    private void verifyProfessorHasSubject(Subject subject, long professorId) throws AccessDeniedException {
        if(subject.getProfessor().getUserId() != professorId){
            throw new AccessDeniedException("Professor" + subject.getProfessor().getFullName() + "can only delete exams from his subject");
        }
    }

    public List<User> getExamRegisteredStudents(long examId) {
        Exam exam = getExam(examId);
        return exam.getRegisteredStudents();
    }

}
