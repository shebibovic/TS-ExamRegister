package com.project.examportalbackend.repository;

import com.project.examportalbackend.models.User;
import com.project.examportalbackend.models.dto.request.UserUpdateRequestDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserUpdateRepository extends JpaRepository<UserUpdateRequestDto, Long> {

    UserUpdateRequestDto findByUserId(long userId);


}
