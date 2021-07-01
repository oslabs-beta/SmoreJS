/*
  Separate style for application's header upon successful login
*/
import React, { FunctionComponent, useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { Button } from '@material-ui/core/';
import logo from '../../assets/fullLogoSmoreJS.png';
import atoms from '../atoms'

const AppHeader: FunctionComponent = (props: any) => {
    
  let history = useHistory();

  const [loginSuccess, setLogin] = useState(true);
  const [url, setUrl] = useRecoilState(atoms.urlState)
  const [iframe, setIframe] = useRecoilState(atoms.iframeState)
  const [reactState, setReactState] = useRecoilState(atoms.reactState)
  const [recoilLog, setRecoilLog] = useRecoilState(atoms.recoilLog)
  const [user, setUser] = useRecoilState(atoms.currentUser)

  useEffect(() => {
    if(!loginSuccess) {
      // reset state upon logout
      setUrl('');
      setIframe('');
      setReactState({});
      setRecoilLog([]);
      setUser('');
      // go back to signout page on logout
      history.push("/");
    }
  })

  const handleClick = (e: any) => {
    setLogin(false);
  }
  
  return (
    <div className="appHeaderContainer">
      <div>
        <img id="SmoreLogo" src={logo}/>
      </div>
      <div id="rightHeader">
        <h1>Welcome {user}</h1> &nbsp;&nbsp;
        <Button variant="contained" id="logoutBtn" onClick={handleClick}>Logout</Button>
      </div>
    </div>
  )
};

export default AppHeader;
