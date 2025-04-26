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
            // Verify the raw password against the hashed password
            if (passwordEncoder.verify(loginRequest.getPassword(), user.getPassword())) {
                // Create a response object without the password
                User responseUser = new User();
                responseUser.setId(user.getId());
                responseUser.setName(user.getName());
                responseUser.setEmail(user.getEmail());
                responseUser.setPhone(user.getPhone());
                return ResponseEntity.ok(responseUser);
            }
        }
        
        return ResponseEntity.badRequest().body("Invalid email or password");
    }
}

