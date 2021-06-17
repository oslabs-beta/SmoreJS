import React, { FunctionComponent, useEffect } from 'react';

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
  const styleValue = useRecoilValue(atoms.styleState)
  const [reactValue, setReactValue] = useRecoilState(atoms.reactState);
  
function handleSubmit(){
  setIframe(text);
  // setTimeout(() => {
  //   const iFrame: HTMLElement | null = document.getElementById('frameId');
  //   const root = iFrame?.contentDocument.getElementById('root');
  //   setReactValue(root._reactRootContainer._internalRoot.current)
  //    }, 1000)
}

const handleChange = (e: any) =>{
  setText(e.target.value)
}

const handleClick = () => {
  setReactValue(getFiberRoot());
}

return  (
        <>
        <div>
        <div>
          <h3>localhost app</h3>
          <input type="text" value={textValue} onChange={handleChange} />
          <button type="button" onClick={handleSubmit}> Load </button>
          <button type="button" onClick={handleClick}>Update</button>
        </div>
        </div>
        <iframe id="frameId" src={iframeValue} style={styleValue} ></iframe>
       
        </>
    )
}

export default ImportForm