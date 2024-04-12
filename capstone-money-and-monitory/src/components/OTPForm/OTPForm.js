import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button } from '@mui/material';
import * as Yup from "yup";
import { useFormik } from 'formik';







export default function OTPForm(props) {

  const validationSchema = Yup.object().shape({
    otp:Yup.string()
    .matches("^[0-9]{6}$","OTP should be of lenght 4. Must only contain Numbers")
    .required("OTP is required")
  })

  const formik = useFormik({
    initialValues: {
      otp:''
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
            id="otp"
            name='otp'
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.otp && formik.touched.otp ? true : false}
            helperText={formik.errors.otp && formik.touched.otp ?formik.errors.otp :null}
            label="OTP"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained'>Resend OTP</Button>
        </Grid>
        <React.Fragment>
                <Box sx={{ display: 'flex' }}>
                    <Button sx={{ mt: 3, ml: 1 }} onClick={props.goToDetailsHandler}>
                      Back
                    </Button>
                </Box>
                <Box sx={{display:'flex', marginLeft:'auto'}}>    
                  <Button
                    variant="contained"
                    onClick={()=>{
                      props.goToAckHandler(formik.values)
                      formik.handleSubmit()
                    }}
                    sx={{ mt: 3, ml: 1, float:'right'}}
                  >
                    Next
                  </Button>
                </Box>
            </React.Fragment>
      </Grid>
    </React.Fragment>
  );
}