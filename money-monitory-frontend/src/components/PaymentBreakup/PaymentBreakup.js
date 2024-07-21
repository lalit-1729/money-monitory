import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';




const transactions = [
  {
    AccountNumber: 'Merchant Account',
    Amount:'€99.02'
  },
  {
    AccountNumber: 'Savings Account',
    Amount:'€0.98'
  }
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

export default function PaymentBreakup(props) {

  const [lastTransaction, setlastTransaction] = useState({})

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment summary
      </Typography>
      {lastTransaction.amoutToMerchant} 
      {lastTransaction.amountToSavings}
      <List disablePadding>
        <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primary={"Merchant"}/>
            <Typography variant="body2">{props.formValue.Amount}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary={"savings"}/>
            <Typography variant="body2">{(Math.ceil(props.formValue.Amount))-props.formValue.Amount}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            €{Math.ceil(props.formValue.Amount)}
          </Typography>
        </ListItem>
      </List>
      <React.Fragment>
                <Box>
                    <Button sx={{ mt: 3, ml: 1 }} onClick={props.goToPaymentDetailsHandler}>
                      Back
                    </Button>
                    <Button
                    variant="contained"
                    onClick={props.goToOtpHandler}
                    sx={{ mt: 3, ml: 1, float:'right'}}>
                    Next
                  </Button>
                </Box>
            </React.Fragment>

    </React.Fragment>
  );
}