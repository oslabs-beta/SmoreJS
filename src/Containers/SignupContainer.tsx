import React, { FunctionComponent, useEffect, useState } from "react";
import SignUp from "../Authentication/SignUp.tsx";
import LoginSignupHeader from "../Headers/LoginSignUpHeader.tsx";

const SignupContainer: FunctionComponent = (props: any) => {
  return (
    <div>
      <LoginSignupHeader />
      <SignUp />
    </div>
    )
}

export default SignupContainer;