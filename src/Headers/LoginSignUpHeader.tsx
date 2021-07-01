/*
  Separate style for sign up and login header  
*/
import React, { FunctionComponent, useEffect, useState } from "react";
import logo from '../../assets/fullLogoSmoreJS.png';

const LoginSignUpHeader: FunctionComponent = (props: any) => {
  return (
    <div>
      <center>
        <img id="SmoreLogo" src={logo}/>
      </center>
      <center>
        <h3>State Management Optimization for Recoil</h3>
      </center>  
    </div>
  )
};

export default LoginSignUpHeader;
