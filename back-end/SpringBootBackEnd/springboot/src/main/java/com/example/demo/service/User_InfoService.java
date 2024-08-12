package com.example.demo.service;

import com.example.demo.dto.ReqRes;
import com.example.demo.entity.User_Info;
import com.example.demo.repository.User_InfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Optional;

@Service
public class User_InfoService {

    @Autowired
    private User_InfoRepository user_InfoRepository;

    public Optional<User_Info> getUserByEmail(String email) {
        return user_InfoRepository.findByEmail(email);
    }
    @Autowired
    private PasswordEncoder passwordEncoder;
    public ReqRes getUserDetailsResponse(String email) {
        Optional<User_Info> user = getUserByEmail(email);
        ReqRes response = new ReqRes();

        if (user.isPresent()) {
            User_Info userInfo = user.get();
            response.setStatusCode(200);
            response.setMessage("User found");
            response.setName(userInfo.getName());
            response.setEmail(userInfo.getEmail());
            response.setRole(userInfo.getRole());
            response.setPassword(passwordEncoder.encode(userInfo.getPassword())); // Include password if necessary
        } else {
            response.setStatusCode(404);
            response.setError("User not found");
        }
        return response;
    }

    public User_Info createUserFromReqRes(ReqRes reg) {
        User_Info newUser = new User_Info();
        newUser.setName(reg.getName());
        newUser.setEmail(reg.getEmail());
        newUser.setPassword(passwordEncoder.encode(reg.getPassword()));
        newUser.setRole(reg.getRole());
        return newUser;
    }

    public User_Info saveUser(User_Info user) {
        return user_InfoRepository.save(user);
    }

    public ReqRes registerUser(ReqRes reg) {
        User_Info newUser = createUserFromReqRes(reg);
        User_Info savedUser = saveUser(newUser);

        ReqRes response = new ReqRes();
        response.setStatusCode(200);
        response.setMessage("User registered successfully");
        response.setName(savedUser.getName());
        response.setEmail(savedUser.getEmail());
        response.setRole(savedUser.getRole());
        response.setPassword(savedUser.getPassword()); // Include password if necessary
        return response;
    }
    @Autowired
    private JWTUtils jwtUtilsObj;
    @Autowired
    private AuthenticationManager AuthenticationManagerObj;
    public ReqRes  loginTHEDATA(ReqRes reg)
    {
        ReqRes obji = new ReqRes();
        try{

            AuthenticationManagerObj.authenticate(new UsernamePasswordAuthenticationToken( reg.getEmail(),reg.getPassword()));
            var user = user_InfoRepository.findByEmail(reg.getEmail()).orElseThrow();
            var jwt=jwtUtilsObj.generateToken(user);
            var refreshToken=jwtUtilsObj.generateRefreshToken(new HashMap<>(),user );
            obji.setStatusCode(200);
            obji.setToken(jwt);
            obji.setName(user.getName());
            obji.setEmail(user.getEmail());
            obji.setRole(user.getRole());
            obji.setRefreshToken(refreshToken);
            obji.setExpirationTime("24Hrs");
            obji.setMessage("Successfully Logged In");
        }
        catch(Exception e)
        {
            obji.setStatusCode(500);
            obji.setMessage(e.getMessage());
        }
        return obji;
    }
}
