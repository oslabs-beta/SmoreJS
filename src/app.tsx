import React from 'react';
import ReactDom from 'react-dom';
import ImportForm from './ImportForm';
import OverviewFlow from './OverviewFlow';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const App = () => {
  return (
    <><h1>
      State Management Optimizer of React and Recoil
      <ImportForm />
    </h1>
    <OverviewFlow /></>
  )
}



ReactDom.render(<App />, mainElement);