/*
  Contains login page components 
*/
import React, { FunctionComponent } from "react";
import Login from "../Authentication/Login";
import LoginSignupHeader from "../Headers/LoginSignUpHeader";

const LoginContainer: FunctionComponent = (props: any) => {
  return (
    <div className = "loginContainer">
        <LoginSignupHeader />
      <div className = "loginForm">
        <Login />
      </div>
    </div>
    )
}

export default LoginContainer;
