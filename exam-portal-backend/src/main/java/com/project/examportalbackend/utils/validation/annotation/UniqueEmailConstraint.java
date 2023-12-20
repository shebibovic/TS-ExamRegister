package com.project.examportalbackend.utils.validation.annotation;

import com.project.examportalbackend.utils.validation.validator.UniqueEmailValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UniqueEmailValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueEmailConstraint {
    String message() default "Email address already in use";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
