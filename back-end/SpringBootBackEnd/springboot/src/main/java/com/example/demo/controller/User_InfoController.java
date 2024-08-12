package com.example.demo.controller;

import com.example.demo.dto.ReqRes;
import com.example.demo.service.User_InfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/api/users_list")
public class User_InfoController {

    @Autowired
    private User_InfoService user_InfoService;

    @GetMapping("/getUserByEmail")
    public ResponseEntity<ReqRes> getUserByEmail(@RequestParam String email) {
        ReqRes response = user_InfoService.getUserDetailsResponse(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<ReqRes> createUser(@RequestBody ReqRes reg) {
        ReqRes response = user_InfoService.registerUser(reg);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/Login")
    public ResponseEntity<ReqRes> LogIN(@RequestBody ReqRes reg) {
        ReqRes response = user_InfoService.loginTHEDATA(reg);
        return ResponseEntity.ok(response);
    }

}
