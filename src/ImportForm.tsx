import React, { FunctionComponent } from 'react';
import {
  atom,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const textState = atom({
  key: 'text',
  default: 'http://localhost:3000'
});

const iframeState = atom({
  key: 'iframe',
  default: ''
})

const styleState = atom({
  key: 'style',
  default: {width: '600px',
  height: '900px'}
})




const ImportForm : FunctionComponent = ({}) =>{
  const [text, setText] = useRecoilState(textState)
  const [iframe, setIframe] = useRecoilState(iframeState) 
  const textValue = useRecoilValue(textState)
  const iframeValue = useRecoilValue(iframeState)
  const styleValue = useRecoilValue(styleState)

  
function handleSubmit(){
  setIframe(text);
  setTimeout(() => {
    const iFrame: HTMLElement | null = document.getElementById('frameId');
    const root = iFrame?.contentDocument.getElementById('root');
    console.log(root._reactRootContainer._internalRoot.current);
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