package com.natwest.Transaction.Service;

import com.natwest.Transaction.Models.Transaction;
import com.natwest.Transaction.Repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;


@Service
public class TransactionServiceImplementation implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public Transaction addTransactionJWT(Transaction newTransaction,String userEmail) {
        newTransaction.setUserEmail(userEmail);
        newTransaction.setDate(LocalDate.now());
        newTransaction.setTime(LocalTime.now());
        System.out.println(newTransaction);
        if(newTransaction.getType().equals("merchant")){
            System.out.println(newTransaction.getAmountToMerchant()+"amount to merchnt");
            int roundedOffAmount = (int) newTransaction.getAmountToMerchant()+1;
            System.out.println(roundedOffAmount+" rounded number");
            System.out.println(roundedOffAmount-newTransaction.getAmountToMerchant());
            newTransaction.setAmountToSavings(roundedOffAmount-newTransaction.getAmountToMerchant());
        }

//        System.out.println("Transcation Object:"+newTransaction.toString());
        transactionRepository.save(newTransaction);
        return newTransaction;
    }

    @Override
    public List<Transaction> getTransactionsJWT(String userEmail) {
        List<Transaction> transactions = transactionRepository.findAll();
        List<Transaction> finalTransactions = new ArrayList<>();
        for(Transaction temp:transactions){
            if(temp.getUserEmail().equals(userEmail)){
                finalTransactions.add(temp);
            }
        }
        return finalTransactions;
    }

    @Override
    public Transaction addTransaction(Transaction newTransaction) {
        newTransaction.setDate(LocalDate.now());
        newTransaction.setTime(LocalTime.now());
        System.out.println(newTransaction);
        if(newTransaction.getType().equals("merchant")){
            System.out.println(newTransaction.getAmountToMerchant()+"amount to merchnt");
            int roundedOffAmount = (int) newTransaction.getAmountToMerchant()+1;
            System.out.println(roundedOffAmount+" rounded number");
            System.out.println(roundedOffAmount-newTransaction.getAmountToMerchant());
            newTransaction.setAmountToSavings(roundedOffAmount-newTransaction.getAmountToMerchant());
        }

//        System.out.println("Transcation Object:"+newTransaction.toString());
        transactionRepository.save(newTransaction);
        return newTransaction;
    }

    @Override
    public List<Transaction> getTransactions() {
        return new ArrayList<>(transactionRepository.findAll());
    }


}