import React, { FunctionComponent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ifValuesIsObject } from '../AdditionalAlgo'
import LoadLog from './LoadLog';
import atoms from '../atoms';
import lodash from 'lodash';

// Component that finds differences in logs and displays them
const StateLog: FunctionComponent = (props: any) => {
  const recoilLog = useRecoilValue(atoms.recoilLog);
  const [testLog, setTestLog] = useRecoilState(atoms.testLog);
  const username = useRecoilValue(atoms.currentUser);
  const [loadLogs, setLoadLogs] = useState([]);
  
  // Checking for updates 
  const findDifferencesInLog = (currentLog: any[]) => {
    // No data yet stored
    if (currentLog.length === 0) return "";
    const recentUpdate: any = currentLog[currentLog.length - 1].atomSelectorValuesNonDefault;
    // Initial load
    let newLog: string = `Version: ${currentLog[currentLog.length - 1].version}`;
    if (currentLog.length === 1) {
      newLog += '\n Application has been initiated'
        for (let j = 0; j < recentUpdate.length; j += 1) {
          if(recentUpdate[j].updated) {
            let curVals = lodash.cloneDeep(recentUpdate[j].values);
            let newVal = ifValuesIsObject(curVals);
            if(Array.isArray(newVal)) newVal = newVal.join(' ');
            newLog += `\n ${recentUpdate[j].key} updated to ${newVal}`
          }
        }
      return newLog += '\n';
    }
    // Look for changes in last update
    const previousUpdate: any = currentLog[currentLog.length - 2].atomSelectorValuesNonDefault;
    for (let i = 0; i < recentUpdate.length; i += 1) {
      if (recentUpdate[i].updated) {
        let previousValue; 
        previousUpdate.forEach((el: any) => {
          if (recentUpdate[i].key === el.key) previousValue = ifValuesIsObject(el.values);
        });
        if(!previousValue) previousValue = 'default';
        newLog += `\n ${recentUpdate[i].key} updated from ${previousValue} to ${ifValuesIsObject(recentUpdate[i].values)}`;
      }
    }
    return newLog += '\n';
  }

  // Set test log, run when recoilLog changes from previous render
  useEffect(() => {
    setTestLog(testLog + "\n" + findDifferencesInLog(recoilLog));
  }, [recoilLog])
  
  // Function that adds line breaks
  const addLineBreaks = (string: string) =>
    string.split('\n').map((text, index) => (
    <React.Fragment key={`${text}-${index}`}>
      {text}
      <br />
    </React.Fragment>
  ));

  const handleSaveClick = (e: any) => {
    e.preventDefault();

    const logName = document.getElementById('logName').value;
    fetch('http://localhost:3003/electron/saveLog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, log: testLog, logName: logName, time: new Date().toLocaleString() })
    })
      .then(res => res.json())
      .catch(err => console.log('login err', err))
  }

  const handleLoadClick = (e: any) => {
    e.preventDefault();

    const logName = document.getElementById('logName').value;
    fetch('http://localhost:3003/electron/getLog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username })
    })
      .then(res => res.json())
      .then(data => {
        setLoadLogs(data);
      })
      .catch(err => console.log('login err', err))
  }
  const loadingLogs: any[] = [];
  if(loadLogs[0]) {
    loadLogs.forEach((el: any) => {
      const curLog = JSON.parse(el.data);
      loadingLogs.push(<LoadLog name={el.dataName} log={addLineBreaks(curLog.log.toString().replace(/,/g,''))} date={curLog.time} />)
    })
  }

  return (
    <div>
      <h2>Data Log</h2>
      <label>
        <b> Name of Log </b>

        <input name='log-name' id='logName' />
      </label>
      <button onClick={handleSaveClick}>Save Log</button>
      <button onClick={handleLoadClick}>Load Logs</button>
      <p>{addLineBreaks(testLog.toString().replace(/,/g,''))}</p>
      {loadingLogs}
    </div>
  )
}

export default StateLog;
