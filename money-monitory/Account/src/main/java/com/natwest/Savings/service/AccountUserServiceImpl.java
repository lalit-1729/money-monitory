package com.natwest.Savings.service;

import com.natwest.Account.Exception.AccountNotFoundException;
import com.natwest.Account.Exception.BalanceNotSufficientException;
import com.natwest.Savings.model.Savings;
import com.natwest.Savings.repository.AccountUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountUserServiceImpl implements AccountUserService{

    @Autowired
    private AccountUserRepository repository;
    @Override
    public Savings createSavingsAcc(Savings newAccountUser) {
        long accountNumber = 10000000+repository.findAll().size();
        newAccountUser.setSavingsAccountNumber(accountNumber);
        return repository.save(newAccountUser);
    }

    @Override
    public List<Savings> getUserDetails() {
        return repository.findAll();
    }

    @Override
    public Savings updatePrimaryDetails(String savingsAccountNumber, Savings user) {
        Optional<Savings> accountDb=repository.findById(savingsAccountNumber);
        if(accountDb.isEmpty()){
            return null;
        }
        else {
            repository.save(user);
        }
        return repository.findById(savingsAccountNumber).get();
    }

    @Override
    public long getSavingsAccountNumber(String email) {
        Savings savingsAccountNew = repository.findByEmail(email);
        return savingsAccountNew.getSavingsAccountNumber();

    }

    @Override
    public Savings addAmount(String accountNumber, double amountToBeAdded) throws AccountNotFoundException {
        Optional<Savings> savingsAccount = repository.findById(accountNumber);
        Savings foundSavingsAccount = null;
        if(savingsAccount.isEmpty()){
            throw new AccountNotFoundException("Account Not Found");
        }else{
            foundSavingsAccount = savingsAccount.get();
        }
        repository.deleteById(accountNumber);
        foundSavingsAccount.setBalanceSavingsAccount(foundSavingsAccount.getBalanceSavingsAccount()+amountToBeAdded);
        repository.save(foundSavingsAccount);
        return foundSavingsAccount;
    }

    @Override
    public Savings subtractAmount(String accountNumber, double amountToBeSubtracted) throws BalanceNotSufficientException, AccountNotFoundException {
        Optional<Savings> savingsAccount = repository.findById(accountNumber);
        Savings foundSavingsAccount = null;
        if(savingsAccount.isEmpty()){
            throw new AccountNotFoundException("Account Not Found");
        }else{
            foundSavingsAccount = savingsAccount.get();
        }
        if(foundSavingsAccount.getBalanceSavingsAccount()<amountToBeSubtracted){
            throw new BalanceNotSufficientException("Insufficient Balance");
        }
        repository.deleteById(accountNumber);
        foundSavingsAccount.setBalanceSavingsAccount(foundSavingsAccount.getBalanceSavingsAccount()-amountToBeSubtracted);
        repository.save(foundSavingsAccount);
        return foundSavingsAccount;
    }

    @Override
    public double getSavingsBalance(String email) {
        Savings savingsAccountNew = repository.findByEmail(email);
        return savingsAccountNew.getBalanceSavingsAccount();
    }
}

