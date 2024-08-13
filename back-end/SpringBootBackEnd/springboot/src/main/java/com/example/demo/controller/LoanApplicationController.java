package com.example.demo.controller;



import com.example.demo.entity.LoanApplication;
import com.example.demo.service.LoanApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/api/users_list")
public class LoanApplicationController {

    @Autowired
    private LoanApplicationService service;

    @PostMapping("/save_loan_data")
    public ResponseEntity<String> saveLoanApplication(@RequestBody LoanApplication loanApplication) {
        try {
            service.saveLoanApplication(loanApplication);
            return new ResponseEntity<>("Loan application saved successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to save loan application", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
