package com.project.examportalbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.examportalbackend.utils.validation.annotation.UniqueEmailConstraint;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Entity
@Table(name = "users") //annotations
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private long userId;

    @NotEmpty(message = "First name is required")
    @Size(max = 50, message = "First name can't have more than 50 characters")
    @NotNull(message = "First name is required")
    @Column(name = "first_name")
    private String firstName;

    @NotEmpty(message = "Last name is required")
    @Size(max = 50, message = "Last name can't have more than 50 characters")
    @NotNull(message = "Last name is required")
    @Column(name = "last_name")
    private String lastName;

    @NotEmpty(message = "Email is required!")
    @Column(name = "username", unique = true)
    @NotNull(message = "Email is required")
    @Email(message = "Wrong email format")
    @UniqueEmailConstraint
    private String email;


    @NotEmpty(message = "Password is required!")
    @Size(min = 8, message = "Password can't be less than 8 characters!")
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*\\d).+$",
            message = "Password must contain at least one uppercase letter and one digit!"
    )
    @Column(name = "password")
    @JsonIgnore
    private String password;


    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "is_active")
    private boolean isActive = true;

    @ManyToOne
    @JoinColumn(name = "user_role",referencedColumnName = "role_name")
    @NotNull(message = "User must have a role")
    private Role role;

    @ManyToMany(mappedBy = "students")
    @JsonIgnore
    private List<Subject> subjects = new ArrayList<>();

    @ManyToMany(mappedBy = "registeredStudents")
    @JsonIgnore
    private List<Exam> registeredExams = new ArrayList<>();

    @Column(name = "one_time_password")
    @JsonIgnore
    private String oneTimePassword;

    @Column(name = "otp_generated_time")
    private Date otpGeneratedTime;

    @Column(name = "set_password")
    private int resetPassword;

    @PreRemove
    private void removeSubjectAndExamAssociations() {
        for (Subject subject: this.subjects) {
            subject.getStudents().remove(this);
        }

        for (Exam exam: this.registeredExams) {
            exam.getRegisteredStudents().remove(this);
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(role.getRoleName()));
        return authorities;
    }

    @Override
    public String getPassword(){
        if(isOTPRequired()){
            return oneTimePassword;
        }
        return password;
    }

    public String getFullName(){
        return this.firstName + " " + this.lastName;
    }

    @Override
    public String getUsername() {
        return this.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isActive;
    }

    public User(String firstName, String lastName, String email, String password,
                String phoneNumber, Role userRole) {
       this.firstName=firstName;
       this.lastName=lastName;
       this.email = email;
       this.password=password;
       this.phoneNumber=phoneNumber;
       this.role=userRole;
    }

    public User(long userId, String firstName, String lastName, String email, String password,
                String phoneNumber, Role userRole) {
        this.userId = userId;
        this.firstName=firstName;
        this.lastName=lastName;
        this.email = email;
        this.password=password;
        this.phoneNumber=phoneNumber;
        this.role=userRole;
    }

    public boolean isOTPRequired(){
        return this.getOneTimePassword() != null;
    }
}
