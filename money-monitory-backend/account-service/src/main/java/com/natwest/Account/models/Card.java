package com.natwest.Account.models;

public class Card {
    private String cardName;
    private String cardNumber;
    private int cvv;
    private String expiryDate;

    public Card(String cardName, String cardNumber, int cvv, String expiryDate) {
        this.cardName = cardName;
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.expiryDate = expiryDate;
    }

    public Card() {
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
        return "Card{" +
                "cardName='" + cardName + '\'' +
                ", cardNumber='" + cardNumber + '\'' +
                ", cvv=" + cvv +
                ", expiryDate='" + expiryDate + '\'' +
                '}';
    }
}