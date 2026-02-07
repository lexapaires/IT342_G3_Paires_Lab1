package com.example.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")

public class UserController {
@GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        return ResponseEntity.ok("Successfully accessed protected profile data");
    }
}