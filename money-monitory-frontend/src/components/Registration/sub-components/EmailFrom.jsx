import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useFormik } from "formik";
import { MuiOtpInput } from "mui-one-time-password-input";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import * as Yup from "yup";
import googleImage from "../../../assets/google.png";
import { updateState } from "../../../redux/RegisterSlice";

export default function EmailFrom({ showSnackbar }) {
  const dispatch = useDispatch();
  const registerStore = useSelector((item) => item.register.value);

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Please provide a valid email"),
  });
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: emailValidationSchema,
  });

  function onEmailChange(e) {
    formik.handleChange(e);
    dispatch(updateState({ email: e.target.value }));
  }

  function onOtpChange(e) {
    dispatch(updateState({ emailOtp: e }));
  }

  function updateStateAndShowSnackBar(newState) {
    dispatch(updateState(newState));
    showSnackbar();
  }

  async function sendEmailOtp() {
    dispatch(updateState({ primaryLoading: true }));
    const response = await axios
      .post(
        "getEmailOtp",
        {},
        { headers: { "X-EMAIL": registerStore.email, "X-PURPOSE": "Register" } }
      )
      .then((response) => response)
      .catch((error) => {
        updateStateAndShowSnackBar({
          snackbarMsg: "Something went wrong",
          primaryLoading: false,
        });
      });
    console.log(response);
    if (response.status !== 200) {
      updateStateAndShowSnackBar({
        snackbarMsg: "Something went wrong",
        snankbarType: "error",
        primaryLoading: false,
      });
    } else {
      if (response.data?.code === 1) {
        updateStateAndShowSnackBar({
          snackbarMsg: "OTP sent to provided email",
          snankbarType: "success",
          isOtpSent: true,
          primaryLoading: false,
          sessionId: response.data.sessionID,
        });
      } else {
        dispatch(
          updateState({
            snackbarMsg: response.data.message,
            snankbarType: "error",
            primaryLoading: false,
          })
        );
        showSnackbar();
      }
    }
  }

  async function proceedWithToken(token) {
    dispatch(updateState({ secondaryLoading: true }));
    const response = await axios
      .post("googleProfile", {}, { headers: { accessToken: token } })
      .then((response) => response)
      .catch((error) => {
        updateStateAndShowSnackBar({
          snackbarMsg: "Something went wrong",
          secondaryLoading: false,
        });
      });

    if (response.status != 200) {
      updateStateAndShowSnackBar({
        snackbarMsg: response.message,
        snankbarType: "error",
        secondaryLoading: false,
      });
    } else {
      const data = response.data;
      updateStateAndShowSnackBar({
        email: data.email,
        secondaryLoading: false,
        step: 1,
        firstName: data?.given_name ?? "",
        lastName: data?.familyName ?? "",
        snackbarMsg: "Email Verified",
        snankbarType: "success",
      });
    }
  }

  async function verifyOtp() {
    dispatch(updateState({ primaryLoading: true }));
    const response = await axios
      .post(
        "verifyEmailOtp",
        {},
        {
          headers: {
            "X-OTP": registerStore.emailOtp,
            "X-SESSION-ID": registerStore.sessionId,
            "X-PURPOSE": "Register",
          },
        }
      )
      .then((response) => response.data)
      .catch((error) => {
        updateStateAndShowSnackBar({
          snackbarMsg: "Something went wrong",
          primaryLoading: false,
        });
      });
    console.log(response);
    if (response.code != 1) {
      updateStateAndShowSnackBar({
        snackbarMsg: response.message,
        primaryLoading: false,
      });
    } else {
      updateStateAndShowSnackBar({
        isOtpSent: false,
        step: 1,
        snackbarMsg: "Email verified",
        snankbarType: "success",
        primaryLoading: false,
      });
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      proceedWithToken(response.access_token);
    },
    onError: (error) => {
      console.log("This is error:");
      console.log(error);
    },
    flow: "implicit",
  });

  return (
    <>
      <Box
        sx={{
          paddingY: "20px",
          width: "80%",
          justifyContent: "center",
          textalign: "center",
          display: "flex",
          flexDirection: "column",
        }}
        noValidate
        autoComplete="off"
      >
        {!registerStore.isOtpSent ? (
          <TextField
            label="Enter your email"
            variant="outlined"
            placeholder="xxxx@example.com"
            name="email"
            error={formik.errors.email ? true : false}
            helperText={formik.errors.email ?? ""}
            defaultValue={formik.values.email}
            onChange={onEmailChange}
          />
        ) : (
          <MuiOtpInput
            value={registerStore.emailOtp}
            onChange={onOtpChange}
            length={4}
          />
        )}

        {registerStore.isOtpSent && (
          <Typography sx={{ textalign: "start", marginTop: "20px" }}>
            Otp sent to <strong>{registerStore.email}</strong>, which is valid
            for next 5 minutes.{" "}
          </Typography>
        )}

        {registerStore.isOtpSent === false ? (
          <Button
            size="large"
            variant="contained"
            color="primary"
            sx={{ margin: "20px 0px" }}
            disabled={!(formik.isValid && formik.dirty)}
            onClick={sendEmailOtp}
          >
            {registerStore.primaryLoading ? (
              <CircularProgress color="secondary" />
            ) : (
              "Get Otp"
            )}
          </Button>
        ) : (
          <Button
            size="large"
            variant="contained"
            color="primary"
            sx={{ margin: "20px 0px" }}
            disabled={registerStore.emailOtp.length !== 4}
            onClick={verifyOtp}
          >
            {registerStore.primaryLoading ? (
              <CircularProgress color="secondary" />
            ) : (
              "Verify Otp"
            )}
          </Button>
        )}
        {registerStore.isOtpSent && (
          <Typography>
            Didn't receive OTP.{" "}
            <Typography component="a" href="/register" color={"primary"}>
              Resend
            </Typography>{" "}
            in 30 sec.
          </Typography>
        )}
      </Box>
      OR
      <Box width={"80%"} paddingY={"20px"}>
        <Button
          size="large"
          variant="outlined"
          fullWidth
          sx={{ borderRadius: 30 }}
          onClick={googleLogin}
          startIcon={<img src={googleImage} alt="" style={{ width: "30px" }} />}
        >
          {registerStore.secondaryLoading ? (
            <CircularProgress color="secondary" />
          ) : (
            "Continue With Google"
          )}
        </Button>
      </Box>
    </>
  );
}
