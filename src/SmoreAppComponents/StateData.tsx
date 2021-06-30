import React, { FunctionComponent, useEffect } from 'react';
import {
  atom,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import atoms from '../atoms';

// const DataLog: FunctionComponent = (props: any) => {
//   const text: string = props.text;
//   const newText = text.split('\n').map(str => <p>{str}</p>)
//   return newText;
// }

const StateData: FunctionComponent = (props: any) => {
  
  const recoilLog = useRecoilValue(atoms.recoilLog);
  const [testLog, setTestLog] = useRecoilState(atoms.testLog);
  
  const findDifferencesInLog = (currentLog: any[]) => {
    //no data yet stored
    if (currentLog.length === 0) return "";
    //initial load
    if (currentLog.length === 1) return "Application has been initiated";
    // look for changes in last update
    let newLog: string = "";
    const recentUpdate: any = currentLog[currentLog.length - 1].atomSelectorValuesNonDefault;
    const previousUpdate: any = currentLog[currentLog.length - 2].atomSelectorValuesNonDefault;
    for (let i = 0; i < recentUpdate.length; i += 1) {
      if (recentUpdate[i].updated) {
        const previousValue = previousUpdate.map(el => {
          if (recentUpdate[i].key === el.key) return el.values;
        });
        newLog += `\n ${recentUpdate[i].key} updated from ${previousValue} to ${recentUpdate[i].values}`;
      }
    }
    return newLog    
  }

  useEffect(() => {
    setTestLog(testLog + "\n" + findDifferencesInLog(recoilLog));
  }, [recoilLog])
  
  const addLineBreaks = (string: string) =>
  string.split('\n').map((text, index) => (
    <React.Fragment key={`${text}-${index}`}>
      {text}
      <br />
    </React.Fragment>
  ));

  // const displayText = testLog.toString().split('\n').map(str => <p>{str}</p>);
  console.log(typeof testLog)
  return (
    <div>
      <p>{addLineBreaks(testLog.toString())}</p>
      {/* {displayText} */}
    </div>
  )
}


export default StateData;
