import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


export default function ImportForm() {
const state = {
  textvalue : 'localhost:3000',
  loadIframe : ()=>{console.log(state.textvalue)}
}

const style = {
  width: '600px' ,
  height: '600px'
}
 return (
    <><div>
     <div>
       <h3>localhost app</h3>
       <input type="text" value={state.textvalue} />
       <button type="button" >Load</button>
     </div>
   </div>
  <iframe src={state.textvalue} style={style}></iframe >
  </>
  )
        }