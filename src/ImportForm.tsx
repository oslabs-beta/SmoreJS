import React, { FunctionComponent } from 'react';

import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from 'recoil';

import {TextField, Button} from '@material-ui/core/';
import atoms from './atoms';
import 'typeface-roboto'

import { getFiberRoot, reactHooksData } from './FiberParsingAlgo';

const ImportForm : FunctionComponent = ({}) =>{
  const [text, setText] = useRecoilState(atoms.textState)
  const [iframe, setIframe] = useRecoilState(atoms.iframeState) 
  const textValue = useRecoilValue(atoms.textState)
  const iframeValue = useRecoilValue(atoms.iframeState)
  
  const [reactValue, setReactValue] = useRecoilState(atoms.reactState);
  
function handleSubmit(){
  setIframe(text);
}

const handleChange = (e: object) =>{
  setText(e.target.value)
}

const handleClick = () => {
  setReactValue(getFiberRoot());
}

return  (
        <>
        
    <div id ="importForm">
      <div id="importFormButton">
          <h3>localhost app</h3>
          <div id="dash">
          <form noValidate autoComplete="off">
          <TextField id="standard-basic" value={textValue} label='App address' onChange={handleChange}  />
          </form>
          
          <Button variant="contained" color="primary"onClick={handleSubmit}> Load </Button>
          <Button variant="contained" color="primary" onClick={handleClick}> Update</Button>
          </div>
      </div>
        <iframe id="frameId" src={iframeValue} ></iframe>
    </div>
        </>
    )
}

export default ImportForm