import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Autocomplete, Box, Button, Snackbar } from '@mui/material';
import axios from 'axios';
import { Form, Formik, useFormik } from 'formik';
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';





export default function Details(props) {

  const [error, seterror] = React.useState(false)
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
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

  const navigate = useNavigate();


  const validationSchema = Yup.object().shape({
    savings: Yup.string()
      .required("Savings Account Number is required"),
    primary: Yup.string()
      .required("Primary Account Number is required"),
    amount: Yup.string().matches('^[0-9 .]*$', "Amount Cannot Contain Alphabets").required('amount is required'),
    description: Yup.string()
      .required("Description is required")
  })


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
        Payment Details
      </Typography>
      <Formik
        initialValues={{ savings: '', primary: '', amount: '', description: '' }}
        onSubmit={async (data) => {
          let error = false;
          console.log(data)
          let primaryAccount = null;

          console.log("Hey bro");
          await axios.get(`http://localhost:8015/api/account/${data.primary}`).then((data) => {
            console.log(data.status,"status");
            primaryAccount = data.data
          }).catch(  function (error) {
            console.log("before setting");
            error = true;
            console.log("after setting");
            handleClick()
          })
          if(error){
            console.log('hi inside error');
            return
          }
          console.log("Primary Account", primaryAccount);
          let header = {
            "X-PHONE":primaryAccount.phoneNumber,
            "X-CHANNEL":"sms",
            "X-PURPOSE":"Transaction"
          }
          axios.post("http://localhost:8010/api/v1/users/getPhoneOtp",null,{headers:header})
          props.goToOtpFormHandler(data)

        }}
        validationSchema={validationSchema}
      >
        {({ values, errors, setFieldValue, handleChange, handleBlur, handleSubmit, touched }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="savings"
                  name="savings"
                  value={values.savings}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleBlur(e)}
                  error={errors.savings && touched.savings ? true : false}
                  helperText={errors.savings && touched.savings ? errors.savings : null}
                  label="Savings Account Number"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="primary"
                  name="primary"
                  value={values.primary}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleBlur(e)}
                  error={errors.primary && touched.primary ? true : false}
                  helperText={errors.primary && touched.primary ? errors.primary : null}
                  label="Primary Account Number"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="amount"
                  name="amount"
                  value={values.amount}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleBlur(e)}
                  error={errors.amount && touched.amount ? true : false}
                  helperText={errors.amount && touched.amount ? errors.amount : null}
                  label="Amount"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleBlur(e)}
                  error={errors.description && touched.description ? true : false}
                  helperText={errors.description && touched.description ? errors.description : null}
                  label="Transfer Description"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <React.Fragment>
                {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                </Box> */}
                <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
                  <Button
                    variant="contained"
                    type='submit'
                    onClick={async(data) => {
                      console.log(values);
                      await handleSubmit(data)
                      console.log(error,"errorrrr");
                      // props.goToOtpFormHandler(values)
                      
                    }}
                    sx={{ mt: 3, ml: 1, float: 'right' }}
                  >
                    Next
                  </Button>
                </Box>
              </React.Fragment>
            </Grid>
          </Form>

        )}

      </Formik>

    </React.Fragment>
  );
}