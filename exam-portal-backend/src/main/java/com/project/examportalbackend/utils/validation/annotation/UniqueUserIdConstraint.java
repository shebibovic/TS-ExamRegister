package com.project.examportalbackend.utils.validation.annotation;


import com.project.examportalbackend.utils.validation.validator.UniqueUserIdValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UniqueUserIdValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueUserIdConstraint {

    String message() default "You already made a request to change your data";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
