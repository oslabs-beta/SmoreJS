import React, { FunctionComponent } from 'react';

import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from 'recoil';

import atoms from './atoms';



const ImportForm : FunctionComponent = ({}) =>{
  const [text, setText] = useRecoilState(atoms.textState)
  const [iframe, setIframe] = useRecoilState(atoms.iframeState) 
  const textValue = useRecoilValue(atoms.textState)
  const iframeValue = useRecoilValue(atoms.iframeState)
  const styleValue = useRecoilValue(atoms.styleState)
  const [reactValue, setReactValue] = useRecoilState(atoms.reactState);
  
function handleSubmit(){
  setIframe(text);
  setTimeout(() => {
    const iFrame: HTMLElement | null = document.getElementById('frameId');
    const root = iFrame?.contentDocument.getElementById('root');
    setReactValue(root._reactRootContainer._internalRoot.current)
     }, 1000)
  
}

const handleChange = (e: object) =>{
  setText(e.target.value)
}

return  (
        <>
        <div>
        <div>
          <h3>localhost app</h3>
          <input type="text" value={textValue} onChange={handleChange} />
          <button type="button" onClick={handleSubmit}> Load </button>
        </div>
        </div>
        <iframe id="frameId" src={iframeValue} style={styleValue}></iframe>
       
        </>
    )
}

export default ImportForm