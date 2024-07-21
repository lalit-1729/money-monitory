import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button } from '@mui/material';
import * as Yup from "yup";
import { useFormik } from 'formik';

export default function PaymentOTP(props) {
  
  const validationSchema = Yup.object().shape({
    Otp: Yup.string()
    .matches('^[0-9]{6}$', "Should Only Contain Numbers")
    .length(6, "Account Number should be of lenght 4!")
    .required("OTP is required")
  })

  const formik = useFormik({
    initialValues: {
      Otp: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log(formik.values);
    },

  });


  return (
    <React.Fragment>
      <Typography gutterBottom>
        OTP has been successfully sent to your mobile number XXXXXXXXX
      </Typography>
      <br></br>
      <Typography variant="h6" gutterBottom>
        Enter OTP
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="Otp"
            name='Otp'
            label="OTP"
            fullWidth
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.Otp && formik.touched.Otp ? true : false}
            helperText={formik.errors.Otp && formik.touched.Otp ?formik.errors.Otp :null}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained'>Resend OTP</Button>
        </Grid>
        <React.Fragment>
                <Box>
                    <Button sx={{ mt: 3, ml: 1 }} onClick={props.goToReviewHandler}>
                      Back
                    </Button>
                </Box>
                <Box sx={{display:'flex', marginLeft:'auto'}}>
                    <Button
                    disabled={!formik.isValid}
                    variant="contained"
                    onClick={()=>{
                      props.goToSuccessfulTransferHandler(formik.values.Otp)
                    }
                    }
                    sx={{ mt: 3, ml: 1, float:'right'}}>
                    Next
                  </Button>
                </Box>
            </React.Fragment>
      </Grid>
    </React.Fragment>
  );
}