import React from 'react';
import ReactDom from 'react-dom';


interface ImportFormState {
  textvalue: string;
  iframe: string;
  style: object;
  tag: array;
}

interface ImportFormProps {}


export default class ImportForm extends React.Component<ImportFormProps, ImportFormState> {
  constructor(props) {
    super(props)
    this.state = {
      textvalue: 'http://localhost:3000',
      iframe: '',
      style: {width: '600px', height: '900px'},
      tag: [],
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleSubmit(){
  this.setState({iframe: this.state.textvalue});
  
  
}

handleChange(e){
  this.setState({textvalue: e.target.value})
}
render(){
return  (
        <>
        <div>
        <div>
          <h3>localhost app</h3>
          <input type="text" value={this.state.textvalue} onChange={this.handleChange} />
          <button type="button" onClick={this.handleSubmit}> Load </button>
        </div>
        </div>
        <iframe src={this.state.iframe} style={this.state.style}></iframe>
        
        </>
    )
}}

