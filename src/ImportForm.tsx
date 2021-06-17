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
  
  const [reactValue, setReactValue] = useRecoilState(atoms.reactState);
  
function handleSubmit(){
  setIframe(text);
  setTimeout(() => {
    const iFrame: HTMLElement | null = document.getElementById('frameId');
    const root = iFrame?.contentDocument.getElementById('root');
    setReactValue(root._reactRootContainer._internalRoot.current)
    console.log(root.useRecoilTransactionObserver_UNSTABLE())
     }, 1000)
  
}

const handleChange = (e: object) =>{
  setText(e.target.value)
}

return  (
        <>
        
    <div id ="importForm">
      <div id="importFormButton">
          <h3>localhost app</h3>
<<<<<<< HEAD
          <input type="text" value={this.state.textvalue} onChange={this.handleChange} />
          <button type="button" onClick={this.handleSubmit} > Load </button>
=======
          <input type="text" value={textValue} onChange={handleChange} />
          <button type="button" onClick={handleSubmit}> Load </button>
<<<<<<< HEAD
>>>>>>> 89981612b28ce46e390ecc1af163ab57f8e172ed
        </div>
        </div>
        <iframe id="frameId" src={iframeValue} style={styleValue}></iframe>
       
=======
      </div>
      
        <iframe id="frameId" src={iframeValue} ></iframe>
      </div>
>>>>>>> ba558b293ddcdca0534257f222f278a7830f7647
        </>
    )
}

export default ImportForm