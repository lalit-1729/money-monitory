import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Balance = [
  {
    accNum: 'Primary Acc',
    balance: '€9.99'
  },
  {
    accNum: 'Savings Acc',
    balance: '€9.99',
  }
];


export default function Ack(props) {
  return (
    <React.Fragment>

      <Typography variant="h6" gutterBottom>
        Payment Summary
      </Typography>
      <Typography  gutterBottom>
        Your Transaction has been successfully completed.
      </Typography>
      <List disablePadding>
          <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primary={"Account Number"} />
            <Typography variant="body1">{"New Balance"}</Typography>
          </ListItem>
        
          <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primary={"Primary Account"}  />
            <Typography variant="body2">{props.primaryBal}</Typography>
          </ListItem>
          <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primary={"Savings Account"} />
            <Typography variant="body2">{props.savingsBal}</Typography>
          </ListItem>
        
      </List>
      <br></br>
      <Link to="/">
      <Button variant='contained'>Go To Home</Button>
      </Link>
    </React.Fragment>
  );
}