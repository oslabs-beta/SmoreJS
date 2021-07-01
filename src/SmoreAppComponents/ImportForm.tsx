import React, { FunctionComponent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {TextField, Button} from '@material-ui/core/';
import 'typeface-roboto'
import atoms from '../atoms';
import { getFiberRoot, getRecoilData } from '../FiberParsingAlgo';
import { atomSelectorValuesNonDefault, recoilObj } from '../types';

// Component that gets state data on updates
const ImportForm : FunctionComponent = ({}) =>{
  const [url, setURL] = useRecoilState(atoms.urlState)
  const [iframe, setIframe] = useRecoilState(atoms.iframeState) 
  const urlValue = useRecoilValue(atoms.urlState)
  const iframeValue = useRecoilValue(atoms.iframeState)
  const [testLog, setTestLog]: any[] = useRecoilState(atoms.recoilLog);
  const [reactValue, setReactValue] = useRecoilState(atoms.reactState);
  const [recoilObject, setRecoilObject] = useRecoilState(atoms.recoilObj)

  // Load URL on handle submit
  function handleSubmit(){
    setIframe(url);
  }

  // Set URL text value handle change
  const handleChange = (e: object) =>{
    setURL(e.target.value)
  }

  // Iterate through sets within fiber tree data
  const setIterator = (setObj: any ) => {
    const result: any[] = []
    setObj.forEach(el => {
      result.push(el);
    })
    return result;
  }

  // Create object filtering necessary atom/selector data
  const getAtomSelectorValues = (children: any, referenceObject: recoilObj) => {

    // Functions for checking if update, isAtom, isSelector
    function updated(childName: any){
      if (referenceObject.currentEdit === childName) return true;
      return false
    }
    function isAtom (childName: any){
      if (referenceObject.knownAtoms.includes(childName)) return true;
      return false
    }
    function isSelector (childName: any){
      if (referenceObject.knownSelectors.includes(childName)) return true;
      return false
    }

    const result : any[] = [];
    for (let i = 0; i < children.length; i += 1){
      const child: atomSelectorValuesNonDefault = {
        edit: children[i]?.edit,
        key: children[i]?.key,
        values: children[i].value?.contents,
        updated: updated(children[i]?.edit),
        isAtom: isAtom(children[i]?.key),
        isSelector: isSelector(children[i]?.key),
      }
      result.push(child);
    }
    return result;
  }

  // Check for changes in recoil data on updates 
  const handleClick = () => {
    const checkRecoil: any = getFiberRoot();
    if (JSON.stringify(checkRecoil) !== JSON.stringify(reactValue)) {
      const currentRecoilData = getRecoilData(checkRecoil); // --> currentRecoil Data
      const recoilObj: recoilObj = {
        version: currentRecoilData.currentTree.version,
        stateID: currentRecoilData.currentTree.stateID,
        dirtyAtoms: setIterator(currentRecoilData.currentTree.dirtyAtoms),
        currentEdit: currentRecoilData.currentTree.atomValues._hamt?._edit,
        knownAtoms: setIterator(currentRecoilData.knownAtoms),
        knownSelectors: setIterator(currentRecoilData.knownSelectors),
        atomSelectorValuesNonDefault: [],
      }
      recoilObj.atomSelectorValuesNonDefault = getAtomSelectorValues(currentRecoilData.currentTree.atomValues._hamt._root.children, recoilObj)
      
      testLog[0] ? setTestLog([...testLog ,recoilObj]) : setTestLog([recoilObj])
  
      setRecoilObject(recoilObj);
      setReactValue(checkRecoil);
    }
  }

  return (
    <>
      <div id ="importForm">
        <div id="importFormButton">
          <h3>localhost app</h3>
            <div id="dash">
              <form noValidate autoComplete="off">
                <TextField id="urlInputField" value={urlValue} label='App address' onChange={handleChange}  />
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
