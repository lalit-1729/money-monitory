import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useFormik } from "formik";
import { MuiOtpInput } from "mui-one-time-password-input";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import googleImage from "../../assets/google.png";
import logo from "../../assets/logo3.png";
import savingsPiggy from "../../assets/savingsPiggy.png";
import { LoginContext } from "../../contexts/LoginContext";
import { reset, updateState } from "../../redux/LoginsSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  function showSuccessToast(msg) {
    setTimeout(() => {
      toast.success(msg, {
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

  function showErrorToast(msg) {
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

  const dispatchAction = useDispatch();
  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:8020/api/v1/users/";
    dispatchAction(reset());
  }, []);
  const loginStore = useSelector((item) => item.login.value);
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const showSnackbar = () => setOpen(true);

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Please provide a valid email"),
  });
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: emailValidationSchema,
  });

  function updateStateAndShowSnackBar(newState) {
    dispatchAction(updateState(newState));
    showSnackbar();
  }

  function onEmailChange(e) {
    formik.handleChange(e);
    dispatchAction(updateState({ email: e.target.value }));
  }

  function updateOtp(e) {
    dispatchAction(updateState({ otp: e }));
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };


  // This methods gets the token from the the google side 
  // and that token is sent to the backend for the profile
  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      loginWithGoogle(response.access_token);
    },
    onError: (error) => {
      showErrorToast("Unable to login using google account");
    },
    flow: "implicit",
  });

  // This method is used to log the used into the application
  // using it's google account
  async function loginWithGoogle(token) {
    dispatchAction(updateState({ secondaryLoading: true }));
    const response = await axios
      .post("googleLogin", {}, { headers: { "X-TOKEN": token } })
      .then((response) => response)
      .catch((error) => {
        updateStateAndShowSnackBar({
          snackbarMsg: "Something went wrong",
          snackbarType: "error",
          secondaryLoading: false,
        });
      });
    if (
      response === undefined ||
      response === null ||
      response?.status !== 200
    ) {
      updateStateAndShowSnackBar({
        snackbarMsg: response?.message,
        snackbarType: "error",
        secondaryLoading: false,
      });
    } else {
      const data = response.data;
      updateStateAndShowSnackBar({
        snackbarMsg: response.message,
        snackbarType: data.code == 1 ? "success" : "error",
        secondaryLoading: false,
      });
      if (data.code == 1) {
        loginContext.login();
        localStorage.setItem("jwtToken", data.authToken);
        localStorage.setItem("UTC timeStamp", new Date().toISOString());
        localStorage.setItem("loginTime", Math.floor(Date.now() / 1000));
        localStorage.setItem("name", data.name);
        navigate("/Home");
        showSuccessToast("Successfully LoggedIn");
      }
    }
  }

  // This method will send the otp to user to email entered via user
  // the user will only receive the otp mail if his/her account exists
  async function sendOtp() {
    dispatchAction(updateState({ loading: true }));
    const response = await axios
      .post(
        "getEmailOtp",
        {},
        { headers: { "X-EMAIL": loginStore.email, "X-PURPOSE": "Login" } }
      )
      .then((response) => response)
      .catch((error) => {
        updateStateAndShowSnackBar({
          snackbarMsg: "Something went wrong",
          loading: false,
        });
      });

    if (
      response === null ||
      response === undefined ||
      response.status !== 200
    ) {
      updateStateAndShowSnackBar({
        snackbarMsg: "Something went wrong",
        snankbarType: "error",
        loading: false,
      });
    } else {
      if (response.data?.code === 1) {
        updateStateAndShowSnackBar({
          snackbarMsg: "OTP sent to provided email",
          snankbarType: "success",
          isOtpSent: true,
          loading: false,
          sessionId: response.data.sessionID,
        });
      } else {
        updateStateAndShowSnackBar({
          snackbarMsg: response.data.message,
          snankbarType: "error",
          loading: false,
        });
      }
    }
  }

  // This function takes the OTP as input from user and verifies
  // it using the sessionId received in the sendOTP response
  async function verifyOtp() {
    dispatchAction(updateState({ loading: true }));
    const response = await axios
      .post(
        "verifyEmailOtp",
        {},
        {
          headers: {
            "X-OTP": loginStore.otp,
            "X-SESSION-ID": loginStore.sessionId,
            "X-PURPOSE": "Login",
          },
        }
      )
      .then((response) => response)
      .catch((error) => {
        updateStateAndShowSnackBar({
          snackbarMsg: "Something went wrong",
          loading: false,
        });
      });
    console.log(response);
    if (
      response === null ||
      response === undefined ||
      response.status !== 200
    ) {
      updateStateAndShowSnackBar({
        snackbarMsg: response?.message ?? "Something went wrong",
        loading: false,
      });
    } else {
      const data = response.data;
      updateStateAndShowSnackBar({
        step: 1,
        snackbarMsg: "Email verified",
        snankbarType: "success",
        loading: false,
      });

      if (data.code == 1) {
        loginContext.login();
        localStorage.setItem("name", data.name);
        localStorage.setItem("jwtToken", data.authToken);
        localStorage.setItem("loginTime", Math.floor(Date.now() / 1000));
        navigate("/Home");
        showSuccessToast("Successfully LoggedIn");
      }
    }
  }

  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            padding: "50px 0px",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            sx={{ width: "60%" }}
            alt="piggy"
            src={savingsPiggy}
          />
          <Typography variant="h5" paddingTop={"20px"} paddingBottom={"20px"}>
            Your Mircosavings Start here
          </Typography>
          <Box sx={{ height: "50px" }} component="img" alt="logo" src={logo} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            padding: "20px 0px",
            justifyContent: "center",
            alignItems: "center",
            textalign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <LockOutlinedIcon color="primary" />
          </Avatar>
          <Typography variant="h4" paddingTop={"20px"} paddingBottom={"20px"}>
            Login
          </Typography>
          <Typography variant="h6" color={"primary"} paddingBottom={"20px"}>
            Welcome Back...!!
          </Typography>
          <Box
            sx={{
              width: "80%",
              justifyContent: "center",
              textalign: "center",
              display: "flex",
              flexDirection: "column",
            }}
            noValidate
            autoComplete="off"
          >
            {!loginStore.isOtpSent ? (
              <TextField
                label="Enter your registered email"
                variant="outlined"
                name="email"
                placeholder="xxxx@example.com"
                error={formik.errors.email ? true : false}
                helperText={formik.errors.email ?? ""}
                defaultValue={formik.values.email}
                onChange={onEmailChange}
              />
            ) : (
              <MuiOtpInput
                value={loginStore.otp}
                onChange={updateOtp}
                length={4}
              />
            )}
            {loginStore.isOtpSent && (
              <Typography sx={{ textalign: "start", marginTop: "20px" }}>
                Otp sent to <strong>{loginStore.fieldValue}</strong>, which is
                valid for next 5 minutes.{" "}
              </Typography>
            )}
            {buildOtpButton()}
          </Box>
          OR
          {buildContinueWithGoogleButton()}
          {!loginStore.isOtpSent && (
            <Typography>
              Haven't registered yet? Click here to{" "}
              <Typography component="a" href="/register" color={"primary"}>
                <strong>Register</strong>
              </Typography>
            </Typography>
          )}
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={loginStore.snankbarType}
          sx={{ width: "100%" }}
        >
          {loginStore.snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );

  function buildContinueWithGoogleButton() {
    return (
      <Box width={"80%"} paddingY={"20px"}>
        <Button
          size="large"
          variant="outlined"
          fullWidth
          sx={{ borderRadius: 30 }}
          onClick={googleLogin}
          startIcon={<img src={googleImage} alt="" style={{ width: "30px" }} />}
        >
          {loginStore.secondaryLoading ? (
            <CircularProgress color="secondary" />
          ) : (
            "Continue With Google"
          )}
        </Button>
      </Box>
    );
  }

  function buildOtpButton() {
    const inButtonDisabled = loginStore.isOtpSent
      ? loginStore.otp.length !== 4
      : !(formik.isValid && formik.dirty);
    return (
      <Button
        size="large"
        variant="contained"
        color="primary"
        sx={{ margin: "20px 0px" }}
        disabled={inButtonDisabled}
        onClick={loginStore.isOtpSent ? verifyOtp : sendOtp}
      >
        {loginStore.loading ? (
          <CircularProgress color="secondary" />
        ) : loginStore.isOtpSent ? (
          "Verify OTP"
        ) : (
          "Get OTP"
        )}
      </Button>
    );
  }
}
