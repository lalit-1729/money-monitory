import React from "react";
import { mount } from "enzyme";
import RoundUpTransactionHistory from "../components/RoundUpTransactionHistory/RoundUpTransactionHistory";

describe("RoundUpTransactionHistory Component", () => {
  it("should render without errors", () => {
    const wrapper = mount(<RoundUpTransactionHistory />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should display "No transactions Yet" when there are no transactions', () => {
    const wrapper = mount(<RoundUpTransactionHistory />);
    const noTransactionsMessage = "No transactions Yet.";
    expect(wrapper.text()).toContain(noTransactionsMessage);
  });

  it("should fetch transactions and display them", (done) => {
    const mockData = [
      {
        transactionid: 1,
        fromAccountNumber: "123345678",
        toAccountNumber: "87764312",
        toAccountHolderName: "amazon",
        fromAccountHolderName: "Joe",
        description: "Paying to Merchants",
        amountToMerchant: 123,
        amountToSavings: 0,
        date: "2023-10-06",
        time: "00:13:15:000000",
        type: "savings",
        userId: 1,
      },
      {
        transactionid: 2,
        fromAccountNumber: "123345678",
        toAccountNumber: "87764377",
        toAccountHolderName: "flipkart",
        fromAccountHolderName: "Joe",
        description: "Paying to flipkart",
        amountToMerchant: 123.5,
        amountToSavings: 0.5,
        date: "2023-10-07",
        time: "00:14:15:000000",
        type: "savings",
        userId: 1,
      },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });

    const wrapper = mount(<RoundUpTransactionHistory />);

    setImmediate(() => {
      wrapper.update();
      mockData.forEach((transaction) => {
        expect(wrapper.text()).toContain(
          `${transaction[3]} ${transaction[7]} ${transaction[8]}T${transaction[9]} ${transaction[5]} ${transaction[6]}`
        );
      });
      done();
    });
  });

  it("should display the totalRoundUp correctly", (done) => {
    const mockData = [
      {
        transactionid: 1,
        fromAccountNumber: "123345678",
        toAccountNumber: "87764312",
        toAccountHolderName: "amazon",
        fromAccountHolderName: "Joe",
        description: "Paying to Merchants",
        amountToMerchant: 123,
        amountToSavings: 0,
        date: "2023-10-06",
        time: "00:13:15:000000",
        type: "savings",
        userId: 1,
      },
      {
        transactionid: 2,
        fromAccountNumber: "123345678",
        toAccountNumber: "87764377",
        toAccountHolderName: "flipkart",
        fromAccountHolderName: "Joe",
        description: "Paying to flipkart",
        amountToMerchant: 123.5,
        amountToSavings: 0.5,
        date: "2023-10-07",
        time: "00:14:15:000000",
        type: "savings",
        userId: 1,
      },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });

    const wrapper = mount(<RoundUpTransactionHistory />);

    setImmediate(() => {
      wrapper.update();
      const totalRoundUp = mockData.reduce(
        (total, transaction) => total + transaction[6],
        0
      );
      expect(wrapper.text()).toContain(
        `Total RoundUp: £${totalRoundUp.toFixed(2)}`
      );
      done();
    });
  });
});
