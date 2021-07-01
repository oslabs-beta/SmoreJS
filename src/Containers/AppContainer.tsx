/*
  Contains all of the main functionalities of the electron app
*/
import React, { FunctionComponent } from 'react';
import AppHeader from '../Headers/AppHeader';
import ImportForm from '../SmoreAppComponents/ImportForm';
import ComponentTree from '../SmoreAppComponents/ComponentTree';
import StateDataContainer from './StateDataContainer';
import StateDisplayer from '../SmoreAppComponents/StateDisplayer';
import StateLog from '../SmoreAppComponents/StateLog';

const AppContainer: FunctionComponent = (props: any) => {
  return (
    <>
      <AppHeader />
      <div id="middle">
        <ImportForm />
        <ComponentTree />
      </div>
      <StateDataContainer />
    </>
  )
}

export default AppContainer;
