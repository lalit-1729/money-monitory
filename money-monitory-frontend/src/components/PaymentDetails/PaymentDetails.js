import CloseIcon from '@mui/icons-material/Close';
import { Box,Button,Snackbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useFormik } from 'formik';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import * as Yup from "yup";


export default function PaymentDetails(props) {

  const [open,setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event,reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  let navigate = useNavigate()


  const validationSchema = Yup.object().shape({
    MerchantAccNum: Yup.string()
      .length(8,"Account Number should be of lenght 8!")
      .matches('[0-9]{8}',"Should Only Contain Numbers")
      .required("Account Number is required"),
    MerchantName: Yup.string()
      .required("Merchant Name is required")
      .matches(["^[A-Z a-z]*$"],"Merchant Name cannot contain numbers"),
    Amount: Yup.string().matches('^[0-9 .]*$',"Amount Cannot Contain Alphabets"),
    NameOnCard: Yup.string()
      .matches(["^[A-Z a-z]*$"],"Name cannot contain numbers")
      .required("Name is required"),
    cardNumber: Yup.string()
      .length(16,"Card number must contain 16 digits")
      .required("Card Number is required")
      .matches("^[0-9]*$"),
    expDate: Yup.string()
      .matches("^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$","Use MM/YY or MM/YYYY pattern")
      .required("Expiry date is required"),
    cvv: Yup.string()
      .matches("^[0-9]{3}$","CVV should be of lenght 3. Must only contain Numbers")
      .required("CVV is required"),
    desc: Yup.string().required("description is required")

  })

  function showToast(msg) {
    setTimeout(() => {
      toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }, 1);
  }



  const formik = useFormik({
    initialValues: {
      MerchantAccNum: '',
      MerchantName: '',
      Amount: '',
      NameOnCard: '',
      cardNumber: '',
      expDate: '',
      cvv: '',
      desc: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (value) => {
      let cardAccount = null
      let cardValidated = false;
      let error = null;
      let amountSubtracted = false;
      let toBreak = false
      console.log("Hello Bro");
      console.log(formik.values);
      await axios.post("http://localhost:8015/api/findAccountUsingCard",{
        "cardName": formik.values.NameOnCard,
        "cardNumber": formik.values.cardNumber,
        "cvv": formik.values.cvv,
        "expiryDate": formik.values.expDate
      }).then((data) => {
        console.log(data);
        cardAccount = data.data
        if (data.status == 200) {
          cardValidated = true;
        }
      }).catch(function (error) {
        // handleClick()
        navigate("/UserNotFound")
        showToast("Invalid details");
      })
    },
  });

  return (


    <React.Fragment>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Invalid Account Number"
        action={action}
      />

      <Typography variant="h6" gutterBottom>
        Enter Payment Details
      </Typography>
      <form >
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <TextField

              required
              id="MerchantAccNum"
              name="MerchantAccNum"
              label="Merchant Account Number"
              onBlur={formik.handleBlur}
              error={formik.errors.MerchantAccNum && formik.touched.MerchantAccNum ? true : false}
              helperText={formik.errors.MerchantAccNum && formik.touched.MerchantAccNum ? formik.errors.MerchantAccNum : null}
              fullWidth
              autoComplete="cc-name"
              variant="outlined"
              value={formik.values.MerchantAccNum}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              id="MerchantIFSCCode"
              name="MerchantName"
              label="Merchant Name"
              onBlur={formik.handleBlur}
              error={formik.errors.MerchantName && formik.touched.MerchantName ? true : false}
              helperText={formik.errors.MerchantName && formik.touched.MerchantName ? formik.errors.MerchantName : null}
              fullWidth
              autoComplete="cc-name"
              variant="outlined"
              value={formik.values.MerchantName}
              onChange={formik.handleChange}

            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              id="Amount"
              name='Amount'
              label="Amount to be Transferred"
              onBlur={formik.handleBlur}
              error={formik.errors.Amount && formik.touched.Amount ? true : false}
              helperText={formik.errors.Amount && formik.touched.Amount ? formik.errors.Amount : null}
              fullWidth
              autoComplete="cc-name"
              variant="outlined"
              value={formik.values.Amount}
              onChange={formik.handleChange}

            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="NameOnCard"
              name='NameOnCard'
              label="Name on Card"
              onBlur={formik.handleBlur}
              error={formik.errors.NameOnCard && formik.touched.NameOnCard ? true : false}
              helperText={formik.errors.NameOnCard && formik.touched.NameOnCard ? formik.errors.NameOnCard : null}
              fullWidth
              autoComplete="cc-name"
              variant="outlined"
              value={formik.values.NameOnCard}
              onChange={formik.handleChange}

            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              name='cardNumber'
              onBlur={formik.handleBlur}
              error={formik.errors.cardNumber && formik.touched.cardNumber ? true : false}
              helperText={formik.errors.cardNumber && formik.touched.cardNumber ? formik.errors.cardNumber : null}
              label="Card number"
              fullWidth
              autoComplete="cc-number"
              variant="outlined"
              value={formik.values.cardNumber}
              onChange={formik.handleChange}

            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="expDate"
              name='expDate'
              onBlur={formik.handleBlur}
              error={formik.errors.expDate && formik.touched.expDate ? true : false}
              helperText={formik.errors.expDate && formik.touched.expDate ? formik.errors.expDate : null}
              label="Expiry date"
              fullWidth
              autoComplete="cc-exp"
              variant="outlined"
              value={formik.values.expDate}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              name='cvv'
              label="CVV"
              onBlur={formik.handleBlur}
              error={formik.errors.cvv && formik.touched.cvv ? true : false}
              helperText={"Last three digits on signature strip"}
              fullWidth
              autoComplete="cc-csc"
              variant="outlined"
              value={formik.values.cvv}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              id="desc"
              name='desc'
              label="Description"
              onBlur={formik.handleBlur}
              error={formik.errors.desc && formik.touched.desc ? true : false}
              helperText={formik.errors.desc && formik.touched.desc ? formik.errors.desc : null}
              fullWidth
              variant="outlined"
              value={formik.values.desc}
              onChange={formik.handleChange}
            />
          </Grid>
          <React.Fragment>
            <Box sx={{ display: 'flex',marginLeft: 'auto' }}>
              <Button
                // disabled={(formik.values.MerchantAccNum === '' || formik.values.Amount === '' || formik.values.MerchantName === '' || formik.values.NameOnCard === '' || formik.values.cardNumber === '' || formik.values.expDate === '' || formik.values.cvv === '' || formik.values.desc === '') ? true : false}
                type='submit'
                disabled={!(formik.isValid && formik.dirty)}
                variant="contained"
                onClick={async () => {
                  formik.handleSubmit(props)
                  props.goToReviewHandler(formik.values)
                }}
                sx={{ mt: 3,ml: 1,float: 'right' }}
              >
                Next
              </Button>
            </Box>
          </React.Fragment>
        </Grid>
      </form>
    </React.Fragment>
  );

}