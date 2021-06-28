import React, { FunctionComponent } from 'react';
import AppHeader from '../Headers/AppHeader.tsx';
import ImportForm from '../SmoreAppComponents/ImportForm.tsx';
import OverviewFlow from '../SmoreAppComponents/OverviewFlow.tsx';
import StateDisplay from '../SmoreAppComponents/StateDisplay.tsx';

const AppContainer: FunctionComponent = (props: any) => {
  return (
    <>
      <AppHeader />
      <div id="middle">
        <ImportForm />
        <OverviewFlow />
      </div>
      <StateDisplay/>
    </>
  )
}

export default AppContainer;
