import React, { FunctionComponent, useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState } from 'recoil';
import {TextField, Button} from '@material-ui/core/';
import atoms from '../atoms'

// Login component 
const Login: FunctionComponent = (props: any) => {
  
  // using the useHistory hook to route react components
  let history = useHistory();
  const [loginSuccess, setLogin] = useState(false); 
  const [user, setUser] = useRecoilState(atoms.currentUser);
  // When successfully logged in, route page to app component
  useEffect(() => {
    if(loginSuccess) {
      history.push("/app");
    }
  });
  // Send login data to server side endpoint and retreive user data
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userData = document.getElementById('loginUsername').value;
    const passData = document.getElementById('loginPassword').value;
    
    fetch('http://localhost:3003/electron/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: userData, password: passData })
    })
      .then(res => res.json())
      .then(data => {
        setLogin(data['logged in']);
        setUser(data.user)
      })
      .catch(err => console.log('login err', err))
  }
  return (
    <div className = "loginContainer">
      <center>
        <form id="loginForm">
          <label>
            <TextField id="loginUsername" label="Username" variant="outlined" className="userInputField"/>
          </label>
          <br></br>
          <label>
            <TextField id="loginPassword" type="password" label="Password" variant="outlined" className="passwordInputField"/>
          </label>
          <br></br>
          <br></br>
          <br></br>
          <Button variant="contained" color="primary" onClick={handleSubmit}> Login </Button>
        </form>
        <div>
        <Link to = "/SignUp">
          <Button variant="contained" color="primary"> Sign up </Button>
        </Link>
        </div>
      </center>
    </div>
  )
}

export default Login;
