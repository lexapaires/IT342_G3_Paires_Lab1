package com.example.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Requirement: BCrypt encryption
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable() // Disabling CSRF for testing
            .authorizeRequests() // Correct for Spring Boot 2.7.18
            .antMatchers("/api/auth/**").permitAll() // Correct for Spring Boot 2.7.18
            .anyRequest().authenticated() // Protects /api/user/me
            .and()
            .httpBasic();
        return http.build();
    }
}