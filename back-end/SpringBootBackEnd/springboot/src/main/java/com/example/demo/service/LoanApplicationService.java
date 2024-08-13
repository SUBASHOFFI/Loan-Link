package com.example.demo.service;


import com.example.demo.entity.LoanApplication;
import com.example.demo.repository.LoanApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoanApplicationService {

    @Autowired
    private LoanApplicationRepository repository;

    public LoanApplication saveLoanApplication(LoanApplication loanApplication) {
        return repository.save(loanApplication);
    }
}
