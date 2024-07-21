package com.natwest.Savings.service;

import com.natwest.Account.Exception.AccountNotFoundException;
import com.natwest.Account.Exception.BalanceNotSufficientException;
import com.natwest.Savings.model.Savings;

import java.util.List;

public interface AccountUserService {

    Savings createSavingsAcc(Savings newAccountUser);

    List<Savings> getUserDetails();

    Savings updatePrimaryDetails(String savingsAccountNumber,Savings user);

    long getSavingsAccountNumber(String email);

    Savings addAmount(String accountNumber,double amountToBeAdded) throws AccountNotFoundException;

    Savings subtractAmount(String accountNumber,double amountToBeSubtracted) throws BalanceNotSufficientException, AccountNotFoundException;

    double getSavingsBalance(String email);
}
