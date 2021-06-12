import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


export default function ImportForm() {
const state = {
  textvalue : 'localhost:3000',
  loadIframe : ()=>{console.log('button clicked')}
}
 return (
    <div >
      <div>
        <h2>localhost app</h2>
       <input type="text" value ={state.textvalue} onClick={state.loadIframe}/>
        </div>
        </div>
  )
        }