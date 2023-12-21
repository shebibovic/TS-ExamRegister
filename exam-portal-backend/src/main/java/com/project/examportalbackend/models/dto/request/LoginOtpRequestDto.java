package com.project.examportalbackend.models.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginOtpRequestDto {

    private String email;
    private String otp;

}
