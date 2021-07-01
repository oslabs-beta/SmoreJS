/*
  Contains sign up page components
*/
import React, { FunctionComponent, useEffect, useState } from "react";
import SignUp from "../Authentication/SignUp";
import LoginSignupHeader from "../Headers/LoginSignUpHeader";

const SignupContainer: FunctionComponent = (props: any) => {
  return (
    <div>
      <LoginSignupHeader />
      <div className="signupForm">
        <SignUp />
      </div>
    </div>
    )
}

export default SignupContainer;
