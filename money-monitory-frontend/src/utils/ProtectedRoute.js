import { GoogleOAuthProvider } from '@react-oauth/google';
import { configureStore } from "@reduxjs/toolkit";
import React,{ useContext,useEffect } from "react";
import { Provider } from "react-redux";
import { useNavigate } from "react-router-dom";
import thunk from 'redux-thunk';
import Login from "../components/Login/Login";
import { LoginContext } from '../contexts/LoginContext';
import googleAuth from "../google-auth";
import loginReduxReducer from "../redux/LoginsSlice";

const loginStore = configureStore({
  reducer: {
    login: loginReduxReducer
  },
  middleware: [thunk]
});

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const loginContext = useContext(LoginContext);

  useEffect(() => {
    if(!loginContext.isLoggedIn){
      navigate("/login");
    }
  },[loginContext.isLoggedIn]);

  return (
    <React.Fragment>
      {loginContext.isLoggedIn ? props.children : <Provider store={loginStore}>
        <GoogleOAuthProvider clientId={googleAuth.client_id}>
          <Login />
        </GoogleOAuthProvider>
      </Provider>}
    </React.Fragment>
  );
}

export default ProtectedRoute;