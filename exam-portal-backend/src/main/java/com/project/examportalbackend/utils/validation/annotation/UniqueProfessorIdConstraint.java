package com.project.examportalbackend.utils.validation.annotation;


import com.project.examportalbackend.utils.validation.validator.UniqueProfessorIdValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UniqueProfessorIdValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueProfessorIdConstraint {
    String message() default "Professor is already assigned to another subject";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

