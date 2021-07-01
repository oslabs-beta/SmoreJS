/*
** Contains Application data that was pull from iframe and parsed
*/
import React, { FunctionComponent } from "react";
import StateDisplayer from "../SmoreAppComponents/StateDisplayer";
import StateLog from "../SmoreAppComponents/StateLog";

const StateDataContainer = (props: any) => {
  
  return (
    <div className='StateDataContainer' >
      <div id="stateDataDiv">
        <StateDisplayer />
      </div>
      <div id="logDiv">
        <StateLog />
      </div>
    </div>
  )
}

export default StateDataContainer;
