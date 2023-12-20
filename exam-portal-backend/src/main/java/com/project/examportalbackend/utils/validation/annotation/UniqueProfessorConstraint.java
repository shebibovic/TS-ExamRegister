package com.project.examportalbackend.utils.validation.annotation;

import com.project.examportalbackend.utils.validation.validator.UniqueEmailValidator;
import com.project.examportalbackend.utils.validation.validator.UniqueProfessorValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UniqueProfessorValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueProfessorConstraint {
    String message() default "Professor is already assigned to another subject";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
