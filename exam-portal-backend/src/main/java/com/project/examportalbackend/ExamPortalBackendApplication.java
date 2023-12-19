package com.project.examportalbackend;

import com.project.examportalbackend.services.AddStaticData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class ExamPortalBackendApplication {

	@Autowired
	AddStaticData addStaticData;

	public static void main(String[] args) {
		SpringApplication.run(ExamPortalBackendApplication.class, args);
	}

	@Bean
	public ApplicationRunner initializer() {
		return args -> addStaticData.addStaticData();
	}

}