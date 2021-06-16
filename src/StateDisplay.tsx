import React, { FunctionComponent } from 'react';
import {
  atom,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import atoms from './atoms';

const StateDisplay : FunctionComponent = ({}) =>{
const reactData = useRecoilValue(atoms.reactState)



return (
  <>
  <h1> State Data</h1>
  
  </>
)
}
export default StateDisplay
