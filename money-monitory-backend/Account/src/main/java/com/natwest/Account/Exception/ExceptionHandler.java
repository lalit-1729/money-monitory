//package com.natwest.Account.Exception;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//
//@ControllerAdvice
//public class ExceptionHandler {
//
//    @org.springframework.web.bind.annotation.ExceptionHandler(AccountNotFoundException.class)
//    public ResponseEntity<?> handleAccountNotFound(Exception e){
//        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//    }
//
//    @org.springframework.web.bind.annotation.ExceptionHandler(BalanceNotSufficientException.class)
//    public ResponseEntity<?> handleBalanceNotSufficient(Exception e){
//        return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
//    }
//}
