import React from 'react';
import ReactDom from 'react-dom';
import ImportForm from './ImportForm';
import OverviewFlow from './OverviewFlow';
import {RecoilRoot} from 'recoil';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const App = () => {
  return (
    <><h1>State Management Optimizer of React and Recoil</h1>
      <RecoilRoot>
      <ImportForm />
      <OverviewFlow />
      </RecoilRoot>
    </>

  )
}



ReactDom.render(<App />, mainElement);