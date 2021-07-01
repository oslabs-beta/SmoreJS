// User Sign up Component
import React, { FunctionComponent, useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { useHistory } from "react-router-dom";
import {TextField, Button} from '@material-ui/core/';
import atoms from '../atoms';

const SignUp: FunctionComponent = (props: any) => {

  // using the useHistory hook to route react components
  let history = useHistory();
  const [signupSuccess, setSignup] = useState(false);
  const [curUser, setUser] = useRecoilState(atoms.currentUser);
  // When successfully logged in, route page to app component
  useEffect(() => {
    if(signupSuccess) {
      history.push("/app");
    }
  })
  // Handle sign up request
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userData = document.getElementById('signupUsername').value;
    const passData: string | null = document.getElementById('signupPassword').value;
    
    fetch('http://localhost:3003/electron/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: userData, password: passData })
    })
      .then(res => res.json())
      .then(data => {
        setSignup(data["signed up"]);
        setUser(data.user);
      })
      .catch(err => console.log('signup err', err))
  }

  return (
    <div>
      <form id="signupForm">
        <label>
          <TextField id="signupUsername" label="Username" variant="outlined" className="userInputField"/>
        </label>
        <br></br>
        <label>
          <TextField id="signupPassword" type="password" label="Password" variant="outlined" className="userInputField"/>
        </label>
        <br></br>
        <Button variant="contained" color="primary" onClick={handleSubmit}> Sign up </Button>
      </form>
    </div>
  )
}

export default SignUp;
