import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Avatar, Container, Grid, Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Step from "@mui/material/Step";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { reset } from "../../redux/RegisterSlice";
import EmailFrom from "./sub-components/EmailFrom";
import NameFrom from "./sub-components/NameFrom";
import PhoneNumberForm from "./sub-components/PhoneNumberForm";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.mode === "light" ? "#3c1454" : grey[600],
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.mode === "light" ? "#3c1454" : grey[600],
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const steps = [
  "Verify your Email",
  "Verify your Phone No.",
  "Provide your Name",
];

const RegistrationStep = {
  email: 0,
  phoneNumber: 1,
  name: 2,
};

export default function Registration() {
  const registerStore = useSelector((item) => item.register.value);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const showSnackbar = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:8020/api/v1/users/";
    dispatch(reset());
  }, []);

  return (
    <Container>
      <Grid
        container
        sx={{
          justifyContent: "center",
          textalign: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            marginTop: "50px",
            textalign: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <HowToRegIcon color="primary" />
          </Avatar>
          <Typography variant="h5" paddingY={"20px"}>
            Sign Up in just 3 steps
          </Typography>
          <Box sx={{ width: "100%", paddingY: "20px" }}>
            <Stepper
              activeStep={registerStore.step}
              alternativeLabel
              connector={<QontoConnector />}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {registerStore.step === RegistrationStep.email && (
            <EmailFrom showSnackbar={showSnackbar} />
          )}

          {registerStore.step === RegistrationStep.phoneNumber && (
            <PhoneNumberForm showSnackbar={showSnackbar} />
          )}

          {registerStore.step === RegistrationStep.name && (
            <NameFrom showSnackbar={showSnackbar} />
          )}

          <Typography paddingY={"20px"} marginBottom={"40px"}>
            Already have an account? Click here to{" "}
            <Typography component="a" href="/login" color={"primary"}>
              <strong>Login</strong>
            </Typography>
          </Typography>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={registerStore.snankbarType}
          sx={{ width: "100%" }}
        >
          {registerStore.snackbarMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
}
