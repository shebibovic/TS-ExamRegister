package com.project.examportalbackend.models.dto.request;

import com.project.examportalbackend.models.Role;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.utils.validation.annotation.UniqueEmailConstraint;
import lombok.*;

import javax.validation.constraints.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDto {

    private long userId = -1;

    @NotEmpty(message = "First name is required")
    @Size(max = 50, message = "First name can't have more than 50 characters")
    @NotNull(message = "First name is required")
    private String firstName;

    @NotEmpty(message = "Last name is required")
    @Size(max = 50, message = "Last name can't have more than 50 characters")
    @NotNull(message = "Last name is required")
    private String lastName;

    @NotEmpty(message = "Email is required!")
    @NotNull(message = "Email is required")
    @Email(message = "Wrong email format")
    @UniqueEmailConstraint
    private String email;


//    @NotEmpty(message = "Password is required!")
//    @Size(min = 8, message = "Password can't be less than 8 characters!")
//    @Pattern(
//            regexp = "^(?=.*[A-Z])(?=.*\\d).+$",
//            message = "Password must contain at least one uppercase letter and one digit!"
//    )
    private String password = "Kerimtest123?";

    private String phoneNumber;

    @NotNull(message = "User must have a role")
    private String role;

    public UserRequestDto(User user){
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.phoneNumber = user.getPhoneNumber();
        this.role = user.getRole().getRoleName();
    }


}
