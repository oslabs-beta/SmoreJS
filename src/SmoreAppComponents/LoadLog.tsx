import React, { FunctionComponent, useEffect, useState } from 'react';

const LoadLog = (props: any) => {
  
  return (
    <div>
      <h3>{props.name} {props.date}</h3>
      <div id="logData"><p>{props.log}</p></div>
    </div>
  )
}

export default LoadLog;
