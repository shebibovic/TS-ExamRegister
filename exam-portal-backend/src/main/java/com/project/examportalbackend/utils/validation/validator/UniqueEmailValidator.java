package com.project.examportalbackend.utils.validation.validator;

import com.project.examportalbackend.repository.UserRepository;
import com.project.examportalbackend.utils.validation.annotation.UniqueEmailConstraint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Component
public class UniqueEmailValidator implements ConstraintValidator<UniqueEmailConstraint, String> {

    @Autowired
    UserRepository userRepository;

    @Override
    public boolean isValid(String email, ConstraintValidatorContext cxt) {
        return userRepository.findByEmail(email) == null;
    }
}
