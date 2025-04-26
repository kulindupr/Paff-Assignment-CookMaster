package com.paf.skillsharing.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordEncoder {
    
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    
    public String encode(String password) {
        return encoder.encode(password);
    }
    
    public boolean verify(String password, String hashedPassword) {
        return encoder.matches(password, hashedPassword);
    }
} 