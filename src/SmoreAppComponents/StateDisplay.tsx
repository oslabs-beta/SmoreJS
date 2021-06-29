import React, { FunctionComponent, useEffect } from 'react';
import {
  atom,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import atoms from '../atoms';
import { getNodes, checkChild } from '../FiberParsingAlgo.tsx';

const State : FunctionComponent = (props: any) => {
//stringify array passed from props
const recoilObj = useRecoilValue(atoms.recoilObj)
const arrToString = (arr: any[]) => {
  let result: string = "";
  for (let i = 0; i < arr.length; i += 1) {
    let el = arr[i]
    if(recoilObj.knownAtoms.includes(arr[i])){
       el  = 'Atom: ' + arr[i];
    }
    if(recoilObj.knownSelectors.includes(arr[i])){
      el  = 'Selector: ' + arr[i];
   }

    if( i === 0 ){
      
      result = el
    } 
    else if(i === arr.length - 1) result += ", and " + el;
    else result += ", " + el;
  }
  return result;
}
return (
  <div>
    Component {props.component} is subscribed to {arrToString(props.atom)}
  </div>
)
}
  const StateDisplay : FunctionComponent = ({}) =>{
  const reactData = useRecoilValue(atoms.reactState)
  const recoilObj = useRecoilValue(atoms.recoilObj)
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
    const currentAtoms: any[] = [];
    recoilState[i].recoilState.forEach(el => {
      currentAtoms.push(el.key);
    })
    displayData.push(<State component={recoilState[i].component} atom={currentAtoms} key={i} />)
  }
  console.log('recoilObj', recoilObj)
//new Code

  function hasVersion(property, str){
    if (property) return 'Virtual Dom has Been updated ' + property + ' time(s)'; 
    return str }
  
  function hasArray(property, str){
    if (property?.length) return property.map((el) => el + ', '); 
    return str }

    function hasRecoilObjs(property, str){
      if (property?.length) return atomDiv(property)
      return str }
  
  function atomDiv(arr){
    const display = []
    
   
    for (let i = 0; i < arr.length; i += 1){
      const {edit, key, updated, isAtom, isSelector} = arr[i]
      let {values} = arr[i]
      values = ifValuesIsObject(values)
      function ifValuesIsObject(values: any){
        if(typeof values === 'object'){
          const info = []
          for (const [keyv, valuev] of Object.entries(values) ){
            if(typeof valuev === 'object'){
                return ifValuesIsObject(valuev)
            }
  
          const text = `${keyv} : ${valuev}`
          text.replace(/$/g, '')
          
           info.push( 
           <div key={i +' values'}>
               {text}
             </div>
            ) 
          }
          return info;
        }
        return values;
      }
      
      const divId = isAtom? 'atomDiv' : 'selectorDiv';
      
        display.push(
          <div id={divId} key={i}>
            <h3>{key}</h3>
            <br/>
            Updated on render: {edit}
            <br/>
            updated:  {`${updated}`}
            <br/>
            isAtom: {`${isAtom}`}
            <br/>
            isSelector: {`${isSelector}`}
           
            <br/>
            value(s): {values}
          </div>
        )
      }
    
    return display;
  }
  
  const version = hasVersion(recoilObj.version, 'Please Update State!')
  const dirtyAtoms = hasArray(recoilObj.dirtyAtoms, 'No Dirty Atoms') 
  const knownAtoms = hasArray(recoilObj.knownAtoms, 'No Atoms')
  const knownSelectors = hasArray(recoilObj.knownSelectors, 'No Selectors')
  const valuesNonDefault = hasRecoilObjs(recoilObj.atomSelectorValuesNonDefault, ' No Atoms or Selectors')
  return (
    <>
    <center>
      <div id="stateData">
        <h1>Recoil Atoms</h1>
        <div id ='atoms'>
       {knownAtoms !== 'No Atoms'? <h3>Components and Atom/ Selector Subscription</h3> : null}
        <br/>
         {displayData} 
         <br/>
         {knownAtoms !== 'No Atoms'?  <h3>React Fiber Data</h3> : null}
         <br />
           {version} 
          <br/>
          Dirty atoms: {dirtyAtoms}
          <br/>
          Atoms: {knownAtoms} 
          <br/>
          Selectors: {knownSelectors}
          <br/>
         Atom/Selector Values:
         <br/>
         <br/>
         {valuesNonDefault}
        </div>
      </div>
    </center>
    </>
  )
}
export default StateDisplay
