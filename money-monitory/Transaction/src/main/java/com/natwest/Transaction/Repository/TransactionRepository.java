package com.natwest.Transaction.Repository;


import com.natwest.Transaction.Models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository  extends JpaRepository<Transaction,Integer> {

}
