package com.project.examportalbackend.models.dto.request;

import com.project.examportalbackend.utils.validation.annotation.UniqueEmailConstraint;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_update")
public class UserUpdateRequestDto {


    @Column(name = "user_id")
    @Id
    private long userId;

    @Size(max = 50, message = "First name can't have more than 50 characters")
    @Column(name = "first_name")
    private String firstName;

    @Size(max = 50, message = "Last name can't have more than 50 characters")
    @Column(name = "last_name")
    private String lastName;

    @Email(message = "Wrong email format")
    @Column(name = "username", unique = true)
    @UniqueEmailConstraint
    private String email;





}
