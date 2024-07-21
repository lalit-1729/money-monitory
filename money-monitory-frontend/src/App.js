import { Box } from "@mui/material";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { configureStore } from "@reduxjs/toolkit";
import React,{ Component } from 'react';
import { Provider } from "react-redux";
import { Route,Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import thunk from 'redux-thunk';
import Dashboard from "./components/DashBoard/Dashboard";
import FAQs from "./components/FAQs/FAQs";
import Home from "./components/Home/Home";
import LinkSavings from "./components/LinkSavings/LinkSavings";
import Login from "./components/Login/Login";
import LogoutPage from "./components/Logout/Logout";
import NotFound from "./components/NotFound/NotFound";
import PageLayout from "./components/PageLayout/PageLayout";
import Payment from "./components/Payment/Payment";
import Registration from "./components/Registration/Registration";
import RoundUpTransactionHistory from "./components/RoundUpTransactionHistory/RoundUpTransactionHistory";
import SavingsToPrimary from "./components/SavingsToPrimary/SavingsToPrimary";
import Services from "./components/Services/Services";
import { LoginContext } from "./contexts/LoginContext";
import googleAuth from "./google-auth";
import loginReduxReducer from "./redux/LoginsSlice";
import registerReduxReducer from "./redux/RegisterSlice";
import ProtectedRoute from "./utils/ProtectedRoute";
import UserNotFound from "./components/UserNotFound/UserNotFound";

const loginStore = configureStore({
  reducer: {
    login: loginReduxReducer
  },
  middleware: [thunk]
});

const registerStore = configureStore({
  reducer: {
    register: registerReduxReducer
  }
});



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: this.checkUserToken() };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.checkUserToken = this.checkUserToken.bind(this);
    console.log(this.state.isLoggedIn);
  }


  checkUserToken = () => {
    const userToken = localStorage.getItem('jwtToken');
    const loginTime = localStorage.getItem('loginTime');
    if (!userToken || userToken === undefined ||((Date.now() / 1000) - loginTime) >= 900) {
      return false;
    }
    return true;
  }


  logout = () => {
    this.setState({ isLoggedIn: false });
    localStorage.clear();
  };

  login = () => {
    this.setState({ isLoggedIn: true });
  }
  render() {
    const value = {
      isLoggedIn: this.state.isLoggedIn,
      logout: this.logout,
      login: this.login
    }
    
    return (
      <LoginContext.Provider value={value}>
        <>
          <Box
            className="App"
            bgcolor={"background.default"}
            color={"text.primary"}
          >
            <Routes>
              <Route element={<PageLayout />}>
                <Route path="/LinkSavings" element={<ProtectedRoute><LinkSavings /></ProtectedRoute>} />
                <Route path="/RoundUpTransactionHistory" element={<RoundUpTransactionHistory />} />
                <Route path="/login" element={
                  <Provider store={loginStore}>
                    <GoogleOAuthProvider clientId={googleAuth.client_id}>
                      <Login />
                    </GoogleOAuthProvider>
                  </Provider>
                } />
                <Route path="/register" element={
                  <Provider store={registerStore}>
                    <GoogleOAuthProvider clientId={googleAuth.client_id} >
                      <Registration />
                    </GoogleOAuthProvider>
                  </Provider>} />
                <Route path="/Services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/" element={<Home />} />
                <Route path="/transferToPrimary" element={<SavingsToPrimary />} />
                <Route path="/transfer" element={<Payment />} />
                <Route path="/UserNotFound" element={<UserNotFound />} />
                <Route path="/faqs" element={<FAQs />} />
                {/* <Route path="/profile" element={<UserProfile />} /> */}
                <Route path="/logout" element={<LogoutPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer />
          </Box>
        </>
      </LoginContext.Provider>

    );
  }
}

