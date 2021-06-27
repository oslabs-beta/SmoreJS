import React from 'react';
import ReactDom from 'react-dom';
import Login from './Authentication/Login';
import SignUp from './Authentication/SignUp';
import AppContainer from './Containers/AppContainer';
import LoginContainer from './Containers/LoginContainer';
import SignupContainer from './Containers/SignupContainer';
import Header from './Headers/LoginSignUpHeader';
import './style.css';
import logo from '../assets/fullLogoSmoreJS.png';
import { RecoilRoot } from 'recoil';
import { HashRouter, Link, Route, Switch } from 'react-router-dom'

const mainElement = document.createElement('div');
mainElement.id = 'root';
document.body.appendChild(mainElement);

const App = () => {

  const handleClick = () => {
    fetch('http://localhost:3003/electron')
      .then(res => {return res.json()})
      .then(data => console.log('data', data))
      .catch(err => console.log('err', err))
  };

  return (
    
    <HashRouter>
      <RecoilRoot>
       
        <div className="menu">
          <Link to="/"><h2>Login</h2></Link>
          <Link to="/signup"><h2>SignUp</h2></Link>
          <Link to="/app"><h2>Application</h2></Link>
        </div>
        {/* <Header/> */}
        <Switch>
          <Route exact path="/" component={LoginContainer} />
          <Route exact path="/signup" component={SignupContainer} />
          <Route exact path="/app" component={AppContainer} />
        </Switch>
      </RecoilRoot>
    </HashRouter>
  )
}



ReactDom.render(<App />, document.getElementById('root'));