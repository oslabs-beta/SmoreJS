import React from 'react';
import ReactDom from 'react-dom';
import AppContainer from './Containers/AppContainer';
import LoginContainer from './Containers/LoginContainer';
import SignupContainer from './Containers/SignupContainer';
import './style.css';
import { RecoilRoot } from 'recoil';
import { HashRouter, Route, Switch } from 'react-router-dom'

const mainElement = document.createElement('div');
mainElement.id = 'root';
document.body.appendChild(mainElement);

const App = () => {

  return (
    <HashRouter>
      <RecoilRoot>
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
