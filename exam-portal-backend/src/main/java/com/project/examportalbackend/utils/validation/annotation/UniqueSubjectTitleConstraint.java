package com.project.examportalbackend.utils.validation.annotation;

import com.project.examportalbackend.utils.validation.validator.UniqueEmailValidator;
import com.project.examportalbackend.utils.validation.validator.UniqueSubjectTitleValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UniqueSubjectTitleValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueSubjectTitleConstraint {
    String message() default "Subject with same title already exists";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
