import { Button,TextField,Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { updateState } from "../../../redux/RegisterSlice";

export default function NameFrom({ showSnackbar }) {
  const dispatch = useDispatch();
  const registerStore = useSelector((item) => item.register.value);
  const navigator = useNavigate();
  const nameValidationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(
        /^[A-Za-z ]*$/,
        "First name must contain only alphabets and space"
      )
      .min(3, "First must contain at least 3 characters.")
      .required("First name is required"),
    lastName: Yup.string()
      .matches(
        /^[A-Za-z ]*$/,
        "Last name must contain only alphabets and space"
      )
      .min(3, "Last name must contain at least 3 characters.")
      .required("Last name is required"),
  });

  function showToast(msg) {
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

  const formik = useFormik({
    initialValues: {
      firstName: registerStore.firstName,
      lastName: registerStore.lastName,
    },
    validationSchema: nameValidationSchema,
  });
  function updateFirstName(e) {
    dispatch(updateState({ firstName: e.target.value }));
    formik.setFieldValue("firstName", e.target.value);
  }

  function updateLastName(e) {
    dispatch(updateState({ lastName: e.target.value }));
    formik.setFieldValue("lastName", e.target.value);
  }

  async function registerUser() {
    dispatch(updateState({ primaryLoading: true }));
    const response = await axios({
      method: "post",
      url: "register",
      data: {
        phone: registerStore.phone,
        email: registerStore.email,
        firstName: registerStore.firstName,
        lastName: registerStore.lastName,
      },
    })
      .then((response) => response)
      .catch((error) => {
        dispatch(
          updateState({
            snackbarMsg: "Something went wrong",
            snankbarType: "error",
            primaryLoading: false,
          })
        );
        showSnackbar();
      });
    if (response.status === 200) {
      dispatch(
        updateState({
          snackbarMsg: response.data.message,
          snankbarType: "error",
          primaryLoading: false,
        })
      );
      showSnackbar();
    } else if (
      response === null ||
      response === undefined ||
      response.status !== 201
    ) {
      dispatch(
        updateState({
          snackbarMsg: "Something went wrong",
          snankbarType: "error",
          primaryLoading: false,
        })
      );
      showSnackbar();
    } else {
      dispatch(
        updateState({
          snackbarMsg: "Registered Successfully",
          snankbarType: "success",
        })
      );
      navigator("/login");
      showToast("Registered Successfully");
    }
  }

  return (
    <Box
      component="form"
      sx={{
        paddingY: "30px",
        width: "80%",
        justifyContent: "center",
        textalign: "center",
        display: "flex",
        flexDirection: "column",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Enter your first name"
        variant="outlined"
        name="firstName"
        placeholder="Mangal"
        defaultValue={formik.values.firstName}
        error={formik.errors.firstName ? true : false}
        helperText={formik.errors.firstName}
        onChange={updateFirstName}
      />

      <br />

      <TextField
        label="Enter your last name"
        variant="outlined"
        name="lastName"
        placeholder="Singh"
        defaultValue={formik.values.lastName}
        error={formik.errors.lastName ? true : false}
        helperText={formik.errors.lastName}
        onChange={updateLastName}
      />

      <Typography
        paddingY={"10px"}
        paddingTop={"20px"}
        sx={{ textalign: "start", fontSize: "12px" }}
        color={"primary"}
      >
        By creating an account you agree to the Terms of Service and our Privacy
        Policy. We'll occasionally send you emails about news, products, and
        services; you can opt-out anytime.
      </Typography>

      <Button
        size="large"
        variant="contained"
        color="primary"
        sx={{ marginY: "20px" }}
        onClick={registerUser}
        disabled={!(formik.isValid && formik.dirty)}
      >
        {registerStore.primaryLoading ? (
          <CircularProgress color="secondary" />
        ) : (
          "Complete Registration"
        )}
      </Button>
    </Box>
  );
}
