import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { Link,useNavigate } from "react-router-dom";
import PaymentBreakup from '../PaymentBreakup/PaymentBreakup';
import PaymentDetails from '../PaymentDetails/PaymentDetails';
import PaymentOTP from '../PaymentOTP/PaymentOTP';


export default function Payment() {


  let navigate = useNavigate()

  const [activeStep,setactiveStep] = useState(0);
  const [formValue,setformValue] = useState({})


  const goToReview = async (value) => {
    console.log(value,"Value");
    await setformValue(value);
    console.log("State value",formValue);
    setactiveStep(1);
    //   await setsavingsAmount(savings);
    //   await setmerchantAmount(merchant);
    //   await settotalAmount(total)
    //   console.log(savingsAmount,merchantAmount,total,"testing states");
  }

  const goToSuccessfulTransfer = async (otp) => {
    console.log("OTP",otp);
    let AccountFromCard = null;
    let phoneNumber = null;
    console.log(formValue);
    await axios.post("http://localhost:8015/api/findAccountUsingCard",{
      "cardName": formValue.NameOnCard,
      "cardNumber": formValue.cardNumber,
      "cvv": formValue.cvv,
      "expiryDate": formValue.expDate
    }).then((data) => {
      console.log(data,"Data from goToOtp")
      AccountFromCard = data.data;
      phoneNumber = data.data.phoneNumber;
    })
    let otpResponse = null
    await axios.post("http://localhost:8010/api/v1/users/verifyPhoneOtp",{},{
      headers: {
        "X-OTP": otp,
        "X-PHONE": AccountFromCard.phoneNumber,
        "X-PURPOSE": "Transaction"
      }
    }).then((data) => otpResponse = data.data)
    if (otpResponse.code == 1) {
      await axios.post(`http://localhost:8015/api/account/subtractAmount/${AccountFromCard.accountNumber}/${formValue.Amount}`).then((data) => {
        console.log(data,"vandha mass");
      }).catch(function (error) {
        navigate("balanceLow")
      })
      await axios.post(`http://localhost:8015/api/savingsAccount/addAmount/${AccountFromCard.linkedSavingsAccounts[0]}/${(Math.floor(formValue.Amount)) + 1 - formValue.Amount}`).then((data) => {
        console.log(data);
      })


      await axios.post("http://localhost:8020/api/transactionJWT",{
        "fromAccountNumber": AccountFromCard.accountNumber,
        "toAccountNumber": formValue.MerchantAccNum,
        "toAccountHolderName": formValue.MerchantName,
        "type": "merchant",
        "amountToMerchant": formValue.Amount,
        "description": formValue.desc,
      },{
        headers: {
          Authorization: "Bearer " + localStorage.getItem('jwtToken')
        }
      }).then((data) => console.log(data,"vandha mass3"));

    }
    setactiveStep(3);
  }

  const goToOtp = async () => {
    let AccountFromCard = null;
    let phoneNumber = null;
    console.log("Inside goToOtp fn");
    console.log(formValue,"inside otp handler");
    await axios.post("http://localhost:8015/api/findAccountUsingCard",{
      "cardName": formValue.NameOnCard,
      "cardNumber": formValue.cardNumber,
      "cvv": formValue.cvv,
      "expiryDate": formValue.expDate
    }).then((data) => {
      console.log(data,"Data from goToOtp")
      AccountFromCard = data.data;
      phoneNumber = data.data.phoneNumber;
    })
    let header = {
      "X-PHONE": phoneNumber,
      "X-CHANNEL": "sms",
      "X-PURPOSE": "Transaction"
    }
    console.log(activeStep);
    axios.post("http://localhost:8010/api/v1/users/getPhoneOtp",null,{ headers: header })
    setactiveStep(2);
    console.log(phoneNumber,AccountFromCard,"checkinggggg");
  }

  const goToPaymentDetails = () => {
    console.log("iniside go to paymentDetails fn");
    setactiveStep(0);
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
            Transfer Funds to Merchants
          </Typography>
          <br />
          <Stepper activeStep={activeStep}>
            <Step>
              <StepLabel>Payment Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Payment Review</StepLabel>
            </Step>
            <Step>
              <StepLabel>OTP Verification</StepLabel>
            </Step>
          </Stepper>
          <br></br>
          {activeStep == 0 ? <PaymentDetails goToReviewHandler={(values) => goToReview(values)} /> : null}
          {activeStep == 1 ? <PaymentBreakup formValue={formValue} goToOtpHandler={() => goToOtp()} goToPaymentDetailsHandler={() => goToPaymentDetails()} /> : null}
          {activeStep === 2 ? <PaymentOTP formValue={formValue} goToReviewHandler={() => goToReview()} goToSuccessfulTransferHandler={(otp) => goToSuccessfulTransfer(otp)} /> : null}
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