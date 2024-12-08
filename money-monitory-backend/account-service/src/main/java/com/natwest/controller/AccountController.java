package com.natwest.controller;

import com.natwest.Account.Exception.AccountNotFoundException;
import com.natwest.Account.Exception.BalanceNotSufficientException;
import com.natwest.Account.models.Account;
import com.natwest.Account.models.Card;
import com.natwest.Account.service.AccountService;
import com.natwest.Savings.model.Savings;
import com.natwest.Savings.service.AccountUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SpringBootApplication
@RestController
@RequestMapping("api")
@ComponentScan(basePackages = "com.natwest.*")
public class AccountController {

    @Autowired
    private AccountService service;

    @Autowired
    private AccountUserService accountUserService;

    @GetMapping("/info")
    public String getInfo(){
        return "Get Mapping working";
    }

    @GetMapping("/savings")
    public ResponseEntity<List<Savings>> getAccounts(){
        return new ResponseEntity<List<Savings>>(accountUserService.getUserDetails(),HttpStatus.OK);
    }


    @PostMapping("/account")
    public ResponseEntity<Account> addAccount(@RequestBody Account newAccount){
        return new ResponseEntity<>(service.addAccount(newAccount), HttpStatus.CREATED);
    }

    @GetMapping("/balance/{email}")
    @CrossOrigin(origins = "http://localhost:3000")
    public double getSavingsAccountBalance(@PathVariable String email){
        return accountUserService.getSavingsBalance(email);
    }

    @GetMapping("/account/{accountNumber}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Account> getAccount(@PathVariable long accountNumber) throws AccountNotFoundException {
        return new ResponseEntity<>(service.getAccount(accountNumber),HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public ResponseEntity<Savings> createSavingsAccount(@RequestBody Savings newUser) {
        return new ResponseEntity<>(accountUserService.createSavingsAcc(newUser), HttpStatus.CREATED);
    }



    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/linkSavingsToPrimary/{savingsAccountNumber}/{primaryAccountNumber}")
    public ResponseEntity<Account> linkSavingsToPrimary(@PathVariable long savingsAccountNumber,@PathVariable long primaryAccountNumber) throws AccountNotFoundException {
        return new ResponseEntity<>(service.linkSavingsToPrimary(savingsAccountNumber,primaryAccountNumber),HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/findAccountUsingCard")
    public ResponseEntity<Account> getAccount(@RequestBody Card newCard) throws Exception {
        return new ResponseEntity<>(service.findAccount(newCard),HttpStatus.OK);

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/savings/{email}")
    public long getSavingsAccountNumber(@PathVariable String email){
        return accountUserService.getSavingsAccountNumber(email);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/account/addAmount/{accountNumber}/{amountToBeAdded}")
    public ResponseEntity<Account> addAmount(@PathVariable long accountNumber, @PathVariable double amountToBeAdded) throws AccountNotFoundException {
        return new ResponseEntity<>(service.addAmount(accountNumber,amountToBeAdded),HttpStatus.OK);
    }

    @GetMapping("dummy")
    public String getD(){
        return "This is dummy from Account";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/account/subtractAmount/{accountNumber}/{amountToBeSubtracted}")
    public ResponseEntity<Account> subtractAmount(@PathVariable long accountNumber, @PathVariable double amountToBeSubtracted) throws BalanceNotSufficientException, AccountNotFoundException {
        return new ResponseEntity<>(service.subtractAmount(accountNumber,amountToBeSubtracted),HttpStatus.OK);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/savingsAccount/addAmount/{accountNumber}/{amountToBeAdded}")
    public ResponseEntity<Savings>   savingsAddAmount(@PathVariable String accountNumber, @PathVariable double amountToBeAdded) throws AccountNotFoundException {
        return new ResponseEntity<>(accountUserService.addAmount(accountNumber,amountToBeAdded),HttpStatus.OK) ;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/savingsAccount/subtractAmount/{accountNumber}/{amountToBeSubtracted}")
    public ResponseEntity<Savings>  savingsSubtractAmount(@PathVariable String accountNumber, @PathVariable double amountToBeSubtracted) throws BalanceNotSufficientException, AccountNotFoundException {
        return new ResponseEntity<>(accountUserService.subtractAmount(accountNumber,amountToBeSubtracted),HttpStatus.OK);
    }
}