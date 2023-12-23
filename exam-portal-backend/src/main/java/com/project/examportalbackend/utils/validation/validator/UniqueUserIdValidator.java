package com.project.examportalbackend.utils.validation.validator;

import com.project.examportalbackend.repository.UserUpdateRepository;
import com.project.examportalbackend.utils.validation.annotation.UniqueUserIdConstraint;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueUserIdValidator implements ConstraintValidator<UniqueUserIdConstraint, Long> {

    @Autowired
    UserUpdateRepository userUpdateRepository;

    @Override
    public boolean isValid(Long userId, ConstraintValidatorContext cxt) {
        return userUpdateRepository.findByUserId(userId) == null;
    }

}
