package com.project.examportalbackend.utils.validation.validator;

import com.project.examportalbackend.repository.SubjectRepository;
import com.project.examportalbackend.utils.validation.annotation.UniqueProfessorIdConstraint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Component
public class UniqueProfessorIdValidator implements ConstraintValidator<UniqueProfessorIdConstraint, Long> {

    @Autowired
    SubjectRepository subjectRepository;

    @Override
    public boolean isValid(Long professorId, ConstraintValidatorContext constraintValidatorContext) {
        return subjectRepository.findByProfessorUserId(professorId) == null;
    }
}
