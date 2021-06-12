import React from 'react';
import ReactDom from 'react-dom';
import ImportForm from './ImportForm';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const App = () => {
  return (
    <h1>
      State Management Optimizer of React and Recoil
      <ImportForm />
    </h1>
  )
}

ReactDom.render(<App />, mainElement);
