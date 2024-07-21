package com.natwest.Account.models;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.List;
@Entity
public class Account implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long customerId;
    private long accountNumber;
    private String firstName;
    private String lastName;
    private String type;

    private List<Long> linkedSavingsAccounts;

    private String email;
    private double balance;
    private String cardName;
    private String cardNumber;
    private int cvv;
    private String expiryDate;

    private long phoneNumber;

    public Account(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Account(long customerId, long accountNumber, String firstName, String lastName, String type, String email, double balance, String cardName, String cardNumber, int cvv, String expiryDate) {
        this.customerId = customerId;
        this.accountNumber = accountNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.type = type;
        this.email = email;
        this.balance = balance;
        this.cardName = cardName;
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.expiryDate = expiryDate;
    }

    public long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(long customerId) {
        this.customerId = customerId;
    }

    public void setAccountNumber(long accountNumber) {
        this.accountNumber = accountNumber;
    }



    public Account(long customerId, long accountNumber, String firstName, String lastName, String type, List<Long> linkedSavingsAccount, String email, double balance, String cardName, String cardNumber, int cvv, String expiryDate, long phoneNumber) {
        this.customerId=customerId;
        this.accountNumber = accountNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.type = type;
        this.linkedSavingsAccounts = linkedSavingsAccount;
        this.email = email;
        this.balance = balance;
        this.cardName = cardName;
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.expiryDate = expiryDate;
        this.phoneNumber = phoneNumber;
    }

    public Account(long accountNumber, String firstName, String lastName, String type, List<Long> linkedSavingsAccount, String email, double balance, String cardName, String cardNumber, int cvv, String expiryDate,long phoneNumber) {
        this.accountNumber = accountNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.type = type;
        this.linkedSavingsAccounts = linkedSavingsAccount;
        this.email = email;
        this.balance = balance;
        this.cardName = cardName;
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.expiryDate = expiryDate;
        this.phoneNumber = phoneNumber;
    }

    public long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Account() {
    }

    public long getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(Long accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }





    public List<Long> getLinkedSavingsAccounts() {
        return linkedSavingsAccounts;
    }

    public void setLinkedSavingsAccounts(List<Long> linkedSavingsAccounts) {
        this.linkedSavingsAccounts = linkedSavingsAccounts;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public String getCardName() {
        return cardName;
    }

    public void setCardName(String cardName) {
        this.cardName = cardName;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public int getCvv() {
        return cvv;
    }

    public void setCvv(int cvv) {
        this.cvv = cvv;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }

    @Override
    public String toString() {
        return "Account{" +
                "accountNumber=" + accountNumber +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", type='" + type + '\'' +
                ", linkedSavingsAccount=" + linkedSavingsAccounts +
                ", email='" + email + '\'' +
                ", balance=" + balance +
                ", cardName='" + cardName + '\'' +
                ", cardNumber='" + cardNumber + '\'' +
                ", cvv=" + cvv +
                ", expiryDate='" + expiryDate + '\'' +
                '}';
    }
}
