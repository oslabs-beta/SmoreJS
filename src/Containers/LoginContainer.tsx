import React, { FunctionComponent, useEffect, useState } from "react";
import Login from "../Authentication/Login.tsx";
import LoginSignupHeader from "../Headers/LoginSignUpHeader.tsx";

const LoginContainer: FunctionComponent = (props: any) => {
  return (
    <div>
      <LoginSignupHeader />
      <Login />
    </div>
    )
}

export default LoginContainer;