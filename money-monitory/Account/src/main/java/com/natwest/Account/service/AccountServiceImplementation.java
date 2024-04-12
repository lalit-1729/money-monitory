package com.natwest.Account.service;

import com.natwest.Account.Exception.AccountNotFoundException;
import com.natwest.Account.Exception.BalanceNotSufficientException;
import com.natwest.Account.models.Account;
import com.natwest.Account.models.Card;
import com.natwest.Account.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccountServiceImplementation implements AccountService{

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Account addAccount(Account newAccount) {
        System.out.println(newAccount+"account");
        accountRepository.save(newAccount);
        return newAccount;
    }

    @Override
    public Account addAmount(long accountNumber,double amountToBeAdded) throws AccountNotFoundException {
        System.out.println("hello");
        System.out.println(accountRepository.findById(accountNumber)+"Account NUmber found");
        Account foundAccount = null;
        for (Account temp:accountRepository.findAll()) {
            if(temp.getAccountNumber()==accountNumber){
                foundAccount = temp;
            }
        }
        if(foundAccount==null){
            throw new AccountNotFoundException("Account Not Found");
        }
        foundAccount.setBalance(foundAccount.getBalance()+amountToBeAdded);
        accountRepository.deleteById(accountNumber);
        accountRepository.save(foundAccount);
        return foundAccount;
    }

    @Override
    public Account subtractAmount(long accountNumber, double amountToBeSubtracted) throws BalanceNotSufficientException, AccountNotFoundException {
        System.out.println("Hi inside sub");
        System.out.println(accountRepository.findById(accountNumber)+"Account NUmber found");
        Account foundAccount = null;
        for (Account temp:accountRepository.findAll()) {
            if(temp.getAccountNumber()==accountNumber){
                foundAccount = temp;
            }
        }
        if(foundAccount==null){
            throw new AccountNotFoundException("Account Not Found");
        }
        if(foundAccount.getBalance()<amountToBeSubtracted){
            throw new BalanceNotSufficientException("Insufficient Balance");
        }
        foundAccount.setBalance(foundAccount.getBalance()-amountToBeSubtracted);
        accountRepository.deleteById(accountNumber);
        accountRepository.save(foundAccount);
        return foundAccount;
    }

    @Override
    public Account findAccount(Card newCard) throws Exception {
        List<Account> accounts = accountRepository.findAll();
        String flag = "not found";
        for (Account temp: accounts) {
            System.out.println(temp);
            if(temp.getCardNumber().equals(newCard.getCardNumber()) && temp.getCardName().equals(newCard.getCardName()) && temp.getCvv()== newCard.getCvv() && temp.getExpiryDate().equals(newCard.getExpiryDate())){
                flag  = "found";
                return temp;
            }
        }
        if(flag.equals("not found")){
            throw new Exception("Account not found");
        }
        return null;
    }

    @Override
    public Account linkSavingsToPrimary(long savingsAccountNumber, long primaryAccountNumber) throws AccountNotFoundException {
       List<Account> primaryAccounts = accountRepository.findAll();
       Account foundAccount = null;
        for (Account temp:primaryAccounts) {
            if(temp.getAccountNumber()==primaryAccountNumber){
                foundAccount = temp;
                break;
            }
        }
        if(foundAccount==null){
            throw new AccountNotFoundException("Account Not Found");
        }
        accountRepository.deleteById(foundAccount.getCustomerId());
        List<Long> linkedSavings = foundAccount.getLinkedSavingsAccounts();
        linkedSavings.add(savingsAccountNumber);
        foundAccount.setLinkedSavingsAccounts(linkedSavings);
        accountRepository.save(foundAccount);
        return foundAccount;
    }

    @Override
    public Account getAccount(long accountNumber) throws AccountNotFoundException {
        List<Account> primaryAccounts = accountRepository.findAll();
        Account foundAccount = null;
        for (Account temp:primaryAccounts) {
            if(temp.getAccountNumber()==accountNumber){
                foundAccount = temp;
                break;
            }
        }
        if(foundAccount==null){
            throw new AccountNotFoundException("Account Not Found");
        }
        return foundAccount;
    }


}
