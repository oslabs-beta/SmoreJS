import React, { FunctionComponent, useEffect } from 'react';
import {  useRecoilState,  useRecoilValue } from 'recoil';
import atoms from '../atoms';
import StateDisplay from './StateDisplay';
import { ifValuesIsObject, hasArray, hasVersion } from '../AdditionalAlgo'

// Component that displays state data
const StateDisplayer : FunctionComponent = ({}) =>{
  const reactData = useRecoilValue(atoms.reactState)
  const recoilObj = useRecoilValue(atoms.recoilObj)

  // Function that gets recoil state data
  const getRecoilStates = (arr: any[], components: any = []) => {
    arr?.forEach((obj) => {
      if(obj.recoilNode) {
        if (obj.recoilNode.atomSelector[0]) {
          const objOfRecoilStates: any = {};
          objOfRecoilStates.component= obj.name;
          objOfRecoilStates.recoilState = obj.recoilNode.atomSelector;
          components.push(objOfRecoilStates)
        }
      }
      getRecoilStates(obj.children, components);
    });
    return components;
  }
  const displayData: any[] = [];
  const recoilState = getRecoilStates([reactData]);

  // Iterate through state data for display
  for (let i = 0; i < recoilState.length; i += 1) {
    const currentAtoms: any[] = [];
    recoilState[i].recoilState.forEach(el => {
      currentAtoms.push(el.key);
    })
    displayData.push(<StateDisplay component={recoilState[i].component} atom={currentAtoms} key={i} />)
  }

  // Check if atom/selectors have state values
  const hasRecoilObjs = (property: any, str: any) => {
    if (property?.length) {
      return atomDiv(property)
    }
    return str 
  }
  
  // Iterate through atom/selectors to display necessary data
  const atomDiv = (arr: any[]) => {
    const display = []
    for (let i = 0; i < arr.length; i += 1){
      const {edit, key, updated, isAtom, isSelector} = arr[i]
      let {values} = arr[i]
      values = ifValuesIsObject(values)
      
      // Assign id's, differentiating between atoms and selectors
      const divId = isAtom? 'atomDiv' : 'selectorDiv';
      
        display.push(
          <div id={divId} key={i}>
            <h2>{key}</h2>
            <br/>
            <b>Updated on render:</b> {edit}
            <br/>
            <b>updated:</b>  {`${updated}`}
            <br/>
            <b>isAtom:</b> {`${isAtom}`}
            <br/>
            <b>isSelector:</b> {`${isSelector}`}
            <br/>
            <b>value(s):</b> {values}
          </div>
        )
      }
    return display;
  }
  
  // Checking if properties exist to display
  const version = hasVersion(recoilObj.version, 'Please Update State!')
  const dirtyAtoms = hasArray(recoilObj.dirtyAtoms, 'No Dirty Atoms') 
  const knownAtoms = hasArray(recoilObj.knownAtoms, 'No Atoms')
  const knownSelectors = hasArray(recoilObj.knownSelectors, 'No Selectors')
  const valuesNonDefault = hasRecoilObjs(recoilObj.atomSelectorValuesNonDefault, ' No Atoms or Selectors')
  
  return (
    <>
    <center>
      <div id="stateDataContainer">
        <h1>Recoil State Data</h1>
        <div id = "stateData">
       {knownAtoms !== 'No Atoms'? <h2>Components and Atom/ Selector Subscription</h2> : null}
        <br/>
         {displayData} 
         <br/>
         {knownAtoms !== 'No Atoms'?  <h2>React Fiber Data</h2> : null}
         <br />
           {version} 
          <br/>
          <b> Dirty atoms: </b> {dirtyAtoms}
          <br/>
          <b> Atoms: </b>{knownAtoms} 
          <br/>
          <b> Selectors: </b>{knownSelectors}
          <br/>
         <b> Atom/Selector Values: </b>
         <br/>
         <br/>
         {valuesNonDefault}
        </div>
      </div>
    </center>
    </>
  )
}
export default StateDisplayer;
