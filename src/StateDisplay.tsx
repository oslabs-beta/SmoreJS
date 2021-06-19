import React, { FunctionComponent } from 'react';
import {
  atom,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import atoms from './atoms';
import { getNodes, checkChild } from './FiberParsingAlgo';

const State : FunctionComponent = (props) => {
  return (
    <div>
      Component {props.component} has atom {props.atom}
    </div>
  )
}

const StateDisplay : FunctionComponent = ({}) =>{
const reactData = useRecoilValue(atoms.reactState)

const getReact = getNodes(reactData);

function getRecoilStates(arr, components: any = []) {
  arr.forEach((obj) => {
    // console.log(obj.name);
    if (obj.recoilNode[0]) {
      const objOfRecoilStates: any = {};
        objOfRecoilStates.component= obj.name;
        objOfRecoilStates.recoilState = obj.recoilNode;
      // arrayOfRecoilStates.children.push(obj.children) 
      // arrayOfElements.push(newElements)
      // namedComponents.push(obj);
      components.push(objOfRecoilStates)
    }
    getRecoilStates(obj.children, components);
  });
  return components;
}

const recoilState = getRecoilStates([getReact]);
console.log(recoilState);
const displayData: any = [];

recoilState.forEach(el => {
  displayData.push(<State component={el.component} atom={el.recoilState[0].key} />)
})

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
