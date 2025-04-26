package com.paf.skillsharing.controller;

import com.paf.skillsharing.model.User;
import com.paf.skillsharing.repository.UserRepository;
import com.paf.skillsharing.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/oauth2")
public class OAuth2Controller {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/success")
    public String oauth2Success(Authentication authentication) {
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oauth2User.getAttributes();
        
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");
        
        // Check if user exists
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    // Create new user if not exists
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setName(name);
                    newUser.setUsername(email); // Using email as username
                    return userRepository.save(newUser);
                });
        
        // Generate JWT token
        String token = jwtUtil.generateToken(user);
        return token;
    }
} 