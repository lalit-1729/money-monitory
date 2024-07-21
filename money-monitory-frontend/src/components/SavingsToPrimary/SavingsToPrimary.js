import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PaymentDetails from '../PaymentDetails/PaymentDetails';
import PaymentBreakup from '../PaymentBreakup/PaymentBreakup';
import PaymentOTP from '../PaymentOTP/PaymentOTP';
import { Await,Link,useNavigate } from "react-router-dom"
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import Details from '../Details/Details';
import OTPForm from '../OTPForm/OTPForm';
import Ack from '../Acknowledgement/Ack';
import { logDOM } from '@testing-library/react';
import axios from 'axios';



export default function SavingsToPrimary() {

  const navigate = useNavigate();


  const [activeStep,setactiveStep] = useState(0);
  const [primaryAccountNumber,setprimaryAccountNumber] = useState(0)
  const [savingsAccountNumber,setsavingsAccountNumber] = useState(0)

  const [primaryBalance,setprimaryBalance] = useState(0)
  const [savingsBalance,setsavingsBalance] = useState(0)


  const [formValue,setformValue] = useState({})

  const goToOtpForm = async (values) => {
    console.log('values',values);
    await setformValue(values)
    setactiveStep(1);
  }

  const goToDetails = async (values) => {
    console.log(values,"hello");
    setactiveStep(0);

  }


  const goToAck = async (valuesOtp) => {
    let balancePri = 0
    let balanceSav = 0
    console.log(formValue,"testing formvalue");
    console.log("inside ACK",valuesOtp);
    let primaryAccount = null;
    await axios.get(`http://localhost:8015/api/account/${formValue.primary}`).then((data) => primaryAccount = data.data)
    console.log("Primary Account",primaryAccount);
    let otpResponse = null

    await axios.post("http://localhost:8010/api/v1/users/verifyPhoneOtp",{},{
      headers: {
        "X-OTP": valuesOtp.otp,
        "X-PHONE": primaryAccount.phoneNumber,
        "X-PURPOSE": "Transaction"
      }
    }).then((data) => otpResponse = data.data)
    if (otpResponse.code == 1) {

      if (primaryAccount.linkedSavingsAccounts[0] == formValue.savings) {
        await axios.post(`http://localhost:8015/api/savingsAccount/subtractAmount/${formValue.savings}/${formValue.amount}`).then((data) => {
          console.log(data);
          balanceSav = data.data.balanceSavingsAccount
        }).catch(function (error) {
          navigate("balanceLow");
        })
        await axios.post(`http://localhost:8015/api/account/addAmount/${formValue.primary}/${formValue.amount}`).then((data) => {
          console.log(data);
          balancePri = data.data.balance
        })
        console.log("amtTOSaving",formValue.amount);
        ;
        await axios.post(`http://localhost:8020/api/transactionJWT`,{
          "fromAccountNumber": formValue.savings,
          "toAccountNumber": formValue.primary,
          "toAccountHolderName": primaryAccount.cardName,
          "type": "savings",
          "amountToSavings": formValue.amount,
          "amountToMerchant": 0,
          "description": formValue.description,
        },{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
          }
        }).then((data) => console.log(data));
      }
    }
    console.log('balance',balancePri,balanceSav);
    await setprimaryBalance(balancePri)
    await setsavingsBalance(balanceSav)
    setactiveStep(2);
    console.log("States balance",primaryBalance,savingsBalance);
  }

  return (
    <React.Fragment>

      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3,md: 6 },p: { xs: 2,md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <br />
          <Stepper activeStep={activeStep}>
            <Step>
              <StepLabel>Payment Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>OTP Verification</StepLabel>
            </Step>
            <Step>
              <StepLabel>Payment Summary</StepLabel>
            </Step>
          </Stepper>
          <br></br>
          {activeStep == 0 ? <Details goToOtpFormHandler={(values) => goToOtpForm(values)} /> : null}
          {activeStep == 1 ? <OTPForm goToDetailsHandler={(values) => goToDetails(values)} goToAckHandler={(valuesOtp) => goToAck(valuesOtp)} /> : null}
          {activeStep === 2 ? <Ack primaryBal={primaryBalance} savingsBal={savingsBalance} /> : null}
          {activeStep === 3 ? <Typography variant="subtitle1">
            Your Transaction has been Successfully completed.
            <Link to="/">
              <Button
                variant="contained"
                sx={{ mt: 3,ml: 1 }}

              >Go to Home</Button>
            </Link>

          </Typography> : null}
        </Paper>
      </Container>
    </React.Fragment>

  );
}