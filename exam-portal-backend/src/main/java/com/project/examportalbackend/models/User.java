package com.project.examportalbackend.models;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

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

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @NotEmpty(message = "Email is required!")
    @Column(name = "username", unique = true)
   //@Pattern(regexp = "^[\\w\\.-]+@[a-zA-Z\\d\\.-]+\\.[a-zA-Z]{2,}$", message ="Incorrect Email format")
    private String username;

    @NotEmpty(message = "Password is required!")
    @Size(min = 8, message = "Password can't be less than 8 characters!")
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*\\d).+$",
            message = "Password must contain at least one uppercase letter and one digit!"
    )
    @Column(name = "password")
    private String password;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "is_active")
    private boolean isActive = true;

    @ManyToOne
    @JoinColumn(name = "user_role",referencedColumnName = "role_name", nullable = false)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(role.getRoleName()));
        return authorities;
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

    public User(String firstName, String lastName, String username, String password,
                String phoneNumber, boolean isActive, Role userRole) {
       this.firstName=firstName;
       this.lastName=lastName;
       this.username=username;
       this.password=password;
       this.phoneNumber=phoneNumber;
       this.isActive=isActive;
       this.role=userRole;
    }
}
