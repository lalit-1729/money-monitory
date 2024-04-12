package com.natwest.Transaction.Service;

import com.natwest.Transaction.Models.Transaction;

import java.util.List;

public interface TransactionService {


    public Transaction addTransaction(Transaction newTransaction);

    public List<Transaction> getTransactions();

    public Transaction addTransactionJWT(Transaction newTransaction,String userEmail);

    public List<Transaction> getTransactionsJWT(String userEmail);


}