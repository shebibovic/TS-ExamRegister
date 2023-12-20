package com.project.examportalbackend.utils.validation.validator;

import com.project.examportalbackend.models.User;
import com.project.examportalbackend.repository.SubjectRepository;
import com.project.examportalbackend.utils.validation.annotation.UniqueProfessorConstraint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Component
public class UniqueProfessorValidator implements ConstraintValidator<UniqueProfessorConstraint, User> {

    @Autowired
    SubjectRepository subjectRepository;

    @Override
    public boolean isValid(User user, ConstraintValidatorContext constraintValidatorContext) {
        return subjectRepository.findByProfessorUserId(user.getUserId()) == null;
    }
}


