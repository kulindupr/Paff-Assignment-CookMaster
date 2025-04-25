package com.paf.skillsharing.controller;

import com.paf.skillsharing.model.User;
import com.paf.skillsharing.repository.UserRepository;
import com.paf.skillsharing.util.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        Optional<User> userOptional = repo.findByEmail(loginRequest.getEmail());
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.verify(loginRequest.getPassword(), user.getPassword())) {
                // Remove password from response for security
                user.setPassword(null);
                return ResponseEntity.ok(user);
            }
        }
        
        return ResponseEntity.badRequest().body("Invalid email or password");
    }
}

