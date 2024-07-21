package com.natwest.Savings.model;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "SavingsAccountDetails")
public class Savings implements Serializable {
    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
    private long savingsAccountNumber;

    public Savings(long savingsAccountNumber, String firstName, String lastName, String email, long customerId, double balanceSavingsAccount) {
        this.savingsAccountNumber = savingsAccountNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.customerId = customerId;
        this.balanceSavingsAccount = balanceSavingsAccount;
    }

    @Column(name = "first_name", columnDefinition = "varchar(50)")
    private String firstName;
    @Column(name = "last_name", columnDefinition = "varchar(50)")
    private String lastName;
    private List<Long> primaryAccounts;
    private String email;

    private long customerId;
    private double balanceSavingsAccount;



    public Savings() {
    }

    public Savings(long customerId, long savingsAccountNumber, String firstName, String lastName,  List<Long> primaryAccounts, String email, double balancePrimaryAccountOne, double balancePrimaryAccountTwo, double balanceSavingsAccount, String cardName, int cvv, long cardNumber, String expiryDate) {
        this.customerId=customerId;
        this.savingsAccountNumber = savingsAccountNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.primaryAccounts = primaryAccounts;
        this.email = email;
        this.balanceSavingsAccount = balanceSavingsAccount;
    }

    public Savings(long savingsAccountNumber, String firstName, String lastName,List<Long> primaryAccounts,long primaryAccountNumberTwo, String email) {
        this.savingsAccountNumber = savingsAccountNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.primaryAccounts = primaryAccounts;
        this.email = email;
    }

    public long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(long customerId) {
        this.customerId = customerId;
    }

    public double getBalanceSavingsAccount() {
        return balanceSavingsAccount;
    }

    public void setBalanceSavingsAccount(double balanceSavingsAccount) {
        this.balanceSavingsAccount = balanceSavingsAccount;
    }



    public long getSavingsAccountNumber() {
        return savingsAccountNumber;
    }

    public void setSavingsAccountNumber(long savingsAccountNumber) {
        this.savingsAccountNumber = savingsAccountNumber;
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

    public List<Long> getPrimaryAccounts() {
        return primaryAccounts;
    }

    public void setPrimaryAccounts(List<Long> primaryAccounts) {
        this.primaryAccounts = primaryAccounts;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
