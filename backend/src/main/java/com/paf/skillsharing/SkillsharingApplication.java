package com.paf.skillsharing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.paf.skillsharing.repository")
public class SkillSharingApplication {
    public static void main(String[] args) {
        SpringApplication.run(SkillSharingApplication.class, args);
    }
} 