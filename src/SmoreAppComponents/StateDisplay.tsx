import React, { FunctionComponent } from 'react';
import { useRecoilValue } from 'recoil';
import atoms from '../atoms';
import { recoilObj } from '../types';

// Component that displays what atom/selectors each component is subscribed to
const StateDisplay : FunctionComponent = (props: any) => {
  // Stringify array passed from props
  const recoilObj: recoilObj = useRecoilValue(atoms.recoilObj)

  // Differentiate whether component is subscribed to an atom or selector
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
      Component <b>{props.component}</b> is subscribed to <b>{arrToString(props.atom)}</b>
    </div>
  )
}

export default StateDisplay;
