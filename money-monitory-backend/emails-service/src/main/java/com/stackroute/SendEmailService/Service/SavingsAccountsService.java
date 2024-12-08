package com.stackroute.SendEmailService.Service;

import com.stackroute.SendEmailService.Model.Savings;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name="Account")
public interface SavingsAccountsService {

    @GetMapping("/api/savings")
    public List<Savings> getAllSavingsAccount();


}
