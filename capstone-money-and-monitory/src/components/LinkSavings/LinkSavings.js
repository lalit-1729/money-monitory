import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { useContext, useState} from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Popover from '@mui/material/Popover';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useFormik } from "formik";
import * as Yup from "yup";




const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LinkSavings() {

  const [formValue, setformValue] = useState({})

  
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
 
  const { vertical, horizontal, open } = state;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const id = open ? 'simple-popover' : undefined;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

 const [confirm, setConfirm] = useState(false);
 const [primaryAccountNumber, setprimaryAccountNumber] = useState("hi");

//  const onSubmit= async (e)=>{
//    e.preventDefault();
//    await axios.post("http://localhost:9000/api/v1/accounts/register", account)
//    navigate("/Home")
//    alert("You have successfully enabled the ROUND_UP service!")
//  }

  const validationSchema=Yup.object({
      
      firstName:Yup.string()
      .required("Name is mandatory")
      .min(5,"Name is short")
      .max(20,"Maximum character limit for name exceeded"),
  
      lastName:Yup.string()
      
      .min(5,"Name is short")
      .max(20,"Maximum character limit for name exceeded")
      .required("Name is mandatory"),

      primaryAccountNumberOne:Yup.string()
      .required("Primary Account number is mandatory")
      .matches("^[0-9]{8}$", "Maximum Limit is 8 digits"),
      
      primaryAccountNumberTwo:Yup.string()
      .required("Primary Account number is mandatory")
      .matches("^[0-9]{8}$", "Maximum Limit is 8 digits"),

      email: Yup.string()
      .email()
      .matches(/@[^.]*\./)
      .required("Email Id is mandatory")
      
    });

  const formik = useFormik({
    initialValues: {
      primaryAccountNumberOne:'',
      primaryAccountNumberTwo:'',
      email:'',
      firstName:'',
      lastName:'',
      balanceSavingsAccount:'',
      customerId:''

    },
    validationSchema: validationSchema,
    onSubmit:async(item)=>{
      console.log("hi");
     await fetch('http://localhost:8015/api/register',{
          method:'POST',
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
            
              "firstName":item.firstName,
              "lastName":item.lastName,
              "primaryAccounts":[item.primaryAccountNumberOne,item.primaryAccountNumberTwo],
              "email":item.email,
              "customerId":item.customerId,
              "balanceSavingsAccount":item.balanceSavingsAccount
          })
      }).then(res=>res.json())
      .then(data=>{
        console.log(data);
      })
      alert('Savings Account created!')
 
  },
     
  });
  
  return (
        
      <React.Fragment>
        <form>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 3,
            borderRadius: 2,
            px:6,
            py:6
          }}
        >
          
          <Typography component="h1" variant="h5" gutterBottom>
            <InsertLinkIcon sx={{color:'purple'}}/>
           Link Primary Accounts with Savings Account!
          </Typography>
          <Box noValidate sx={{ mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.firstName && formik.errors.firstName?true:false}
                  helperText={formik.touched.firstName && formik.errors.firstName? formik.errors.firstName:null}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                 />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lastName && formik.errors.lastName ? true:false}
                  helperText={formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName:null}
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
          
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={formik.values.balanceSavingsAccount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="balanceSavingsAccount"
                  label="Savings Account balance"
                  name="balanceSavingsAccount"
                
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={formik.values.customerId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="customerId"
                  label="Customer Id"
                  name="customerId"
              
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                 value={formik.values.primaryAccountNumberOne}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 error={formik.touched.primaryAccountNumberOne && Boolean(formik.errors.primaryAccountNumberOne)}
                 helperText={formik.touched.primaryAccountNumberOne && formik.errors.primaryAccountNumberOne}
                 fullWidth
                 id="primaryAccountNumberOne"
                 label="Primary Account Number-1"
                 name="primaryAccountNumberOne"
              
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  value={formik.values.primaryAccountNumberTwo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.primaryAccountNumberTwo && Boolean(formik.errors.primaryAccountNumberTwo)}
                  helperText={formik.touched.primaryAccountNumberTwo && formik.errors.primaryAccountNumberTwo}
                  fullWidth
                  id="primaryAccountNumberTwo"
                  label="Primary Account Number-2"
                  name="primaryAccountNumberTwo"
            
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  fullWidth
                  id="email"
                  label="Email-ID"
                  name="email"
                  autoComplete='email'
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="enableRoundUp" onChange={() => setConfirm(!confirm)} color="primary" />}
                  label="I wish to enable the Round Up service and transfer the extras to my savings account."
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={!confirm || !(formik.isValid && formik.dirty)}
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>{
                formik.handleSubmit()
              }}
              
            >
                Link Accounts
            </Button>
            <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>Sucessfully Linked Accounts!</Typography>
      </Popover>
          
            <Grid container justifyContent="flex-end">
            </Grid>
          </Box>
         
        </Box>
        
        </form>
        </React.Fragment>
 
  );
}