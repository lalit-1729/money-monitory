package com.natwest.Account.service;

import com.natwest.Account.Exception.AccountNotFoundException;
import com.natwest.Account.Exception.BalanceNotSufficientException;
import com.natwest.Account.models.Account;
import com.natwest.Account.models.Card;

public interface AccountService {

    public Account addAccount(Account newAccount);

    public Account addAmount(long accountNumber,double amountToBeAdded) throws AccountNotFoundException;

    public Account subtractAmount(long accountNumber,double amountToBeSubtracted) throws BalanceNotSufficientException, AccountNotFoundException;

    public Account findAccount(Card newCard) throws Exception;

    public Account linkSavingsToPrimary(long savingsAccountNumber,long primaryAccountNumber) throws AccountNotFoundException;

    public Account getAccount(long accountNumber) throws AccountNotFoundException;

}
