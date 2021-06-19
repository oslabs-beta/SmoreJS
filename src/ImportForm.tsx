import React, { FunctionComponent } from 'react';

import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from 'recoil';

import atoms from './atoms';
import { getFiberRoot } from './FiberParsingAlgo';

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
          <input type="text" value={textValue} onChange={handleChange} />
          <button type="button" onClick={handleSubmit}> Load </button>
          <button type="button" onClick={handleClick}> Update </button>
      </div>
        <iframe id="frameId" src={iframeValue} ></iframe>
    </div>
        </>
    )
}

export default ImportForm