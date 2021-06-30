import React, { FunctionComponent, useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState } from 'recoil';
import logo from '../../assets/fullLogoSmoreJS.png';
import atoms from '../atoms'

const AppHeader: FunctionComponent = (props: any) => {
    let history = useHistory();

    const [loginSuccess, setLogin] = useState(true);
    const [url, setUrl] = useRecoilState(atoms.textState)
    const [iframe, setIframe] = useRecoilState(atoms.iframeState)
    const [reactState, setReactState] = useRecoilState(atoms.reactState)
    const [recoilLog, setRecoilLog] = useRecoilState(atoms.recoilLog)
    const [user, setUser] = useRecoilState(atoms.currentUser)

    useEffect(() => {
      console.log('logged in', loginSuccess);
      if(!loginSuccess) {
        console.log('logged out');
        // reset state on logout
        setUrl('http://localhost:3000')
        setIframe('')
        setReactState({})
        setRecoilLog([])

        // go back to signout page on logout
        history.push("/");
      }
    })

    
    const handleClick = (e: any) => {
      setLogin(false);
    }
    
  
    return (
      <div>
        <img id="SmoreLogo" src={logo}/>
        <button onClick={handleClick}>Logout</button>
        <p>Welcome {user}</p>
      </div>
    )
  };

  export default AppHeader;
