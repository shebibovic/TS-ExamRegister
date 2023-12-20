package com.project.examportalbackend.utils.validation.validator;

import com.project.examportalbackend.models.User;
import com.project.examportalbackend.repository.SubjectRepository;
import com.project.examportalbackend.utils.validation.annotation.UniqueProfessorConstraint;
import com.project.examportalbackend.utils.validation.annotation.UniqueSubjectTitleConstraint;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueSubjectTitleValidator implements ConstraintValidator<UniqueSubjectTitleConstraint, String> {
    @Autowired
    SubjectRepository subjectRepository;

    @Override
    public boolean isValid(String title, ConstraintValidatorContext constraintValidatorContext) {
        return subjectRepository.findByTitle(title) == null;
    }
}
