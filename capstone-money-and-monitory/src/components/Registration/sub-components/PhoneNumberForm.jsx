import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Button,TextField,Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useFormik } from "formik";
import { MuiOtpInput } from "mui-one-time-password-input";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import * as Yup from "yup";
import { updateState } from "../../../redux/RegisterSlice";

export default function PhoneNumberForm({ showSnackbar }) {
  const dispatch = useDispatch();
  const registerStore = useSelector((item) => item.register.value);

  function updateStateAndShowSnackBar(newState) {
    dispatch(updateState(newState));
    showSnackbar();
  }

  const phoneValidationSchema = Yup.object().shape({
    phoneNo: Yup.string()
      .matches("^[0-9]*$", "Only numeric values are allowed")
      .min(10, "Phone number must be atleast of 10 digits.")
      .required("Phone No. is required"),
  });

  const formik = useFormik({
    initialValues: { phoneNo: "" },
    validationSchema: phoneValidationSchema,
  });

  // Sending the otp to the provided phone number
  // channel here describe where the OTP will be send it can be via sms or whatsapp
  async function sendOtp(channel) {
    dispatch(updateState({ primaryLoading: true }));
    const response = await axios
      .post(
        "getPhoneOtp",
        {},
        {
          headers: {
            "X-PHONE": registerStore.phone,
            "X-PURPOSE": "Register",
            "X-CHANNEL": channel,
          },
        }
      )
      .then((response) => response)
      .catch((error) => {
        updateStateAndShowSnackBar({
          snackbarMsg: "Something went wrong",
          snankbarType: "error",
          primaryLoading: false,
        });
      });
    if (response.status !== 200) {
      updateStateAndShowSnackBar({
        snackbarMsg: "Something went wrong",
        snankbarType: "error",
        primaryLoading: false,
      });
    } else {
      const data = response.data;
      updateStateAndShowSnackBar({
        snackbarMsg: data.message,
        snankbarType: data.code === 1 ? "success" : "error",
        isOtpSent: data.code === 1,
        primaryLoading: false,
      });
    }
  }

  // Method the verify the otp entered by the user, and the phone number provided by the user
  async function verifyOtp() {
    dispatch(updateState({ primaryLoading: true }));
    const response = await axios
      .post(
        "verifyPhoneOtp",
        {},
        {
          headers: {
            "X-OTP": registerStore.phoneOtp,
            "X-PHONE": registerStore.phone,
            "X-PURPOSE": "Register",
          },
        }
      )
      .then((response) => response)
      .catch((error) => {
        updateStateAndShowSnackBar({
          snackbarMsg: "Something went wrong",
          snankbarType: "error",
          primaryLoading: false,
        });
      });

    if (response.status !== 200) {
      updateStateAndShowSnackBar({
        snackbarMsg: "Something went wrong",
        snankbarType: "error",
        primaryLoading: false,
      });
    } else {
      const data = response.data;
      updateStateAndShowSnackBar({
        step: data.code === 1 ? 2 : 1,
        snackbarMsg: data.message,
        snankbarType: data.code === 1 ? "success" : "error",
        isOtpSent: data.code === 1,
        primaryLoading: false,
      });
    }
  }


  // to update the phone number in store and formik
  function onPhoneChange(e) {
    formik.handleChange(e);
    dispatch(updateState({ phone: e.target.value }));
  }

  function updateOtp(e) {
    dispatch(updateState({ phoneOtp: e }));
  }

  return (
    <>
      <Box
        component="form"
        sx={{
          paddingTop: "20px",
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
          // Phone Number field
          <TextField
            name="phoneNo"
            error={formik.errors.phoneNo ? true : false}
            label="Enter your phone number"
            variant="outlined"
            placeholder="XXXXX-XXXXX"
            helperText={formik.errors.phoneNo ?? ""}
            defaultValue={formik.values.phoneNo}
            onChange={onPhoneChange}
          />
        ) : (
          // Otp TextField goes here
          <MuiOtpInput
            value={registerStore.phoneOtp}
            onChange={updateOtp}
            length={6}
          />
        )}

        {registerStore.isOtpSent && (
          <Typography sx={{ textalign: "start", marginTop: "20px" }}>
            Otp sent to <strong>{registerStore.phone}</strong>, which is valid
            for next 5 minutes.{" "}
          </Typography>
        )}

        {registerStore.isOtpSent ? (
          <Button
            size="large"
            variant="contained"
            color="primary"
            sx={{ marginTop: "20px" }}
            onClick={verifyOtp}
            disabled={registerStore.phoneOtp.length !== 6}
          >
            {registerStore.primaryLoading ? <CircularProgress /> : "Verify OTP"}
          </Button>
        ) : (
          <Button
            size="large"
            variant="contained"
            color="primary"
            sx={{ marginTop: "20px" }}
            onClick={() => sendOtp("sms")}
            disabled={!(formik.isValid && formik.dirty)}
          >
            {registerStore.primaryLoading ? (
              <CircularProgress color="secondary" />
            ) : (
              "Get OTP"
            )}
          </Button>
        )}

        {registerStore.isOtpSent && (
          <Typography marginTop="20px">
            Didn't receive OTP.{" "}
            <Typography component="a" href="/register" color={"primary"}>
              {" "}
              Resend{" "}
            </Typography>{" "}
            in 30 sec.
          </Typography>
        )}
      </Box>

      {!registerStore.isOtpSent && (
        <Box width={"80%"}>
          <Typography textAlign={"center"} paddingY={"20px"}>
            OR
          </Typography>

          {/*  WhatsApp Otp button*/}
          <Button
            variant="outlined"
            fullWidth
            size="large"
            color="success"
            sx={{ borderRadius: 30 }}
            disabled={!(formik.isValid && formik.dirty)}
            startIcon={<WhatsAppIcon />}
            onClick={() => sendOtp("whatsapp")}
          >
            Get Otp on WhatsApp
          </Button>
        </Box>
      )}
    </>
  );
}
