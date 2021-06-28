import React, { FunctionComponent, useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

const Login: FunctionComponent = (props: any) => {

  let history = useHistory();

  const [loginSuccess, setLogin] = useState(false);

  useEffect(() => {
    console.log('loggedin', loginSuccess);
    if(loginSuccess) {
      console.log('logged in');
      history.push("/app");
    }
  })

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userData = document.getElementById('loginUsername').value;
    const passData = document.getElementById('loginPassword').value;
    
    console.log('login event', userData);
    fetch('http://localhost:3003/electron/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: userData, password: passData })
    })
      .then(res => res.json())
      .then(data => {
        console.log('login data', data);
        setLogin(data['logged in']);
      })
      .catch(err => console.log('login err', err))
  }

  return (
    <div>
      <form id="loginForm" onSubmit={handleSubmit}>
        <label>
          Username: 
          <input name="username" id="loginUsername" className="userInputField"></input>
        </label>
        <br></br>
        <label>
          Password:
          <input type="password" name="password" id="loginPassword" className="userInputField"></input>
        </label>
        <br></br>
        <input type="submit" value="Login"></input>
      </form>
      <br></br>
      <Link to = "/SignUp">
        <button>Sign up</button>
      </Link>
    </div>
  )
}

export default Login;