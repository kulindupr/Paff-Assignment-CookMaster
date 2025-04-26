package com.paf.skillsharing.controller;

import com.paf.skillsharing.model.User;
import com.paf.skillsharing.repository.UserRepository;
import com.paf.skillsharing.util.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private final UserRepository repo;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository repo, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return repo.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        // Encrypt password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repo.save(user);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        // Check if email already exists
        if (repo.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        
        // Encrypt password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = repo.save(user);
        
        // Create response object
        Map<String, Object> response = new HashMap<>();
        response.put("token", "dummy-token"); // In a real app, generate a JWT token here
        response.put("user", savedUser);
        
        // Remove password from response
        savedUser.setPassword(null);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        // Validate request
        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
            return ResponseEntity.badRequest().body("Email and password are required");
        }

        Optional<User> userOptional = repo.findByEmail(loginRequest.getEmail());
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Verify the raw password against the hashed password
            if (passwordEncoder.verify(loginRequest.getPassword(), user.getPassword())) {
                // Create response object
                Map<String, Object> response = new HashMap<>();
                response.put("token", "dummy-token"); // In a real app, generate a JWT token here
                
                // Create a response object without the password
                User responseUser = new User();
                responseUser.setId(user.getId());
                responseUser.setName(user.getName());
                responseUser.setEmail(user.getEmail());
                responseUser.setUsername(user.getUsername());
                responseUser.setImage(user.getImage());
                
                response.put("user", responseUser);
                return ResponseEntity.ok(response);
            }
        }
        
        return ResponseEntity.badRequest().body("Invalid email or password");
    }
}

