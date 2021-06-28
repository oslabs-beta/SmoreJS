import React, { FunctionComponent, useEffect } from 'react';
import {
  atom,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import atoms from '../atoms';
import { getNodes, checkChild } from '../FiberParsingAlgo.tsx';

const State : FunctionComponent = (props) => {
  return (
    <div>
      Component {props.component} has atom {props.atom}
    </div>
  )
}

const StateDisplay : FunctionComponent = ({}) =>{
  const reactData = useRecoilValue(atoms.reactState)

// const getReact = getNodes(reactData);

  function getRecoilStates(arr, components: any = []) {
    arr?.forEach((obj) => {
      if(obj.recoilNode) {
        if (obj.recoilNode.atomSelector[0]) {
          const objOfRecoilStates: any = {};
            objOfRecoilStates.component= obj.name;
            objOfRecoilStates.recoilState = obj.recoilNode.atomSelector;
          // arrayOfRecoilStates.children.push(obj.children) 
          // arrayOfElements.push(newElements)
          // namedComponents.push(obj);
          components.push(objOfRecoilStates)
        }
      }
      getRecoilStates(obj.children, components);
    });
    return components;
  }
  const displayData: any = [];
  

  const recoilState = getRecoilStates([reactData]);
  console.log(recoilState);
  for (let i = 0; i < recoilState.length; i += 1) {
    displayData.push(<State component={recoilState[i].component} atom={recoilState[i].recoilState[0].key} key={i} />)
  }
  
  return (
    <>
    <center>
      <div id="stateData">
        <h1>Recoil Atoms</h1>
        <div>
          {displayData}
        </div>
      </div>
    </center>
    </>
  )
}
export default StateDisplay
