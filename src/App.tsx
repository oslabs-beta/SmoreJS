import React from 'react';
import ReactDom from 'react-dom';
import ImportForm from './ImportForm';
import OverviewFlow from './OverviewFlow';
import StateDisplay from './StateDisplay';
import './style.css';
import logo from '../assets/fullLogoSmoreJS.png';
import { RecoilRoot } from 'recoil';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const App = () => {
  return (

    <>
      <center>
        <img id="SmoreLogo" src={logo}/>
      </center>
      <center><h3>State Management Optimization for Recoil</h3></center>
      <RecoilRoot>
<<<<<<< HEAD
        <ImportForm />
        <OverviewFlow /> 
        <StateDisplay/>
=======
      
      <div id="middle">
      <ImportForm />
      <OverviewFlow />
      </div>
      <StateDisplay/>
>>>>>>> main
      </RecoilRoot>
    </>

  )
}



ReactDom.render(<App />, mainElement);