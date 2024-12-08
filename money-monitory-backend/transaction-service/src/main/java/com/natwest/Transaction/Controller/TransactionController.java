package com.natwest.Transaction.Controller;

import com.natwest.Transaction.Models.Transaction;
import com.natwest.Transaction.Service.TransactionServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TransactionController {

    @Autowired
    private TransactionServiceImplementation transactionService;

    @GetMapping("/transactions")
//    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Transaction>> getTransactions(){
        return new ResponseEntity<>(transactionService.getTransactions(),HttpStatus.OK);
    }

    @PostMapping("/transaction")
//    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Transaction> newTransaction(@RequestBody Transaction newTransaction){
        return new ResponseEntity<>(transactionService.addTransaction(newTransaction), HttpStatus.CREATED);

    }


    @GetMapping("/transactionsJWT")
//    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Transaction>> getTransactionsJWT(@RequestHeader ("X-USER-ID") String userEmail){
        return new ResponseEntity<>(transactionService.getTransactionsJWT(userEmail),HttpStatus.OK);
    }

    @PostMapping("/transactionJWT")
//    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Transaction> newTransactionJWT(@RequestBody Transaction newTransaction, @RequestHeader ("X-USER-ID") String userEmail){
        return new ResponseEntity<>(transactionService.addTransactionJWT(newTransaction,userEmail), HttpStatus.CREATED);

    }
}