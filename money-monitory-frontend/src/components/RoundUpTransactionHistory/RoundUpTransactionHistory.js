import React,{ useEffect,useState } from "react";
import { Grid,Typography } from "@mui/material";
import TotalSavings from "../TotalSavings/TotalSavings";
import TransactionHistoryTable from "../TransactionHistoryTable/TransactionHistoryTable";

export default function RoundUpTransactionHistory() {
  const [transactionsList,settransactionsList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8020/api/transactionsJWT",{
      method: 'get',
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let start = 0;
        let end = data.length - 1;

        while (start < end) {
          // Swap the elements at start and end positions
          let temp = data[start];
          data[start] = data[end];
          data[end] = temp;

          // Move the pointers towards the center of the array
          start++;
          end--;
        }
        settransactionsList(data);
      }).catch(error => {
        console.log(error);
      });
  },[]);

  let totalRoundUp = 0;
  let transactionDetailsArray = [];
  for (const element of transactionsList) {
    let transactionArray = [];
    const transactionDetails = Object.values(element);

    transactionArray.push(transactionDetails[3]);
    transactionArray.push(transactionDetails[7]);
    transactionArray.push(transactionDetails[8] + "T" + transactionDetails[9]);
    transactionArray.push(transactionDetails[5]);
    transactionArray.push(transactionDetails[6]);
    transactionDetailsArray.push(transactionArray);
    totalRoundUp += transactionDetails[6];
  }

  return (
    <div>
      <Typography variant="h4" sx={{ mt: 2,textAlign: 'center' }} gutterBottom>
        Transactions and Savings
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {transactionsList.length != 0 ? <TransactionHistoryTable
            transactionDetailsArray={transactionDetailsArray}
          /> : <Typography
            sx={{ fontSize: "2.975rem",color: "#ffffff" }}
            variant="h5"
            component="div"

          >
            No transactions Yet.
          </Typography>}

        </Grid>
        <Grid item xs={12} md={4}>
          <TotalSavings totalSavings={totalRoundUp} />
        </Grid>
      </Grid>
    </div>
  );
}
