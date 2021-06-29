import React, { FunctionComponent, useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

const SignUp: FunctionComponent = (props: any) => {
  
  let history = useHistory();

  const [signupSuccess, setSignup] = useState(false);

  useEffect(() => {
    console.log('signedup', signupSuccess);
    if(signupSuccess) {
      console.log('signed up');
      history.push("/app");
    }
  })

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userData = document.getElementById('signupUsername').value;
    const passData: string | null = document.getElementById('signupPassword').value;
    
    console.log('signup event', userData);
    fetch('http://localhost:3003/electron/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: userData, password: passData })
    })
      .then(res => res.json())
      .then(data => {
        console.log("signed up", data);
        setSignup(data["signed up"]);
      })
      .catch(err => console.log('signup err', err))
  }

  return (
    <div>
      <form id="signupForm" onSubmit={handleSubmit}>
        <label>
          Username: 
          <input name="username" id="signupUsername" className="userInputField"></input>
        </label>
        <br></br>
        <label>
          Password:
          <input type="password" name="password" id="signupPassword" className="userInputField"></input>
        </label>
        <br></br>
        <input type="submit" value="Sign Up"></input>
      </form>
    </div>
  )
}

export default SignUp;