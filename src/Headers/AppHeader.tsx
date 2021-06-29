import React, { FunctionComponent } from 'react';
import logo from '../../assets/fullLogoSmoreJS.png';

const AppHeader: FunctionComponent = (props: any) => {

    const handleClick = (e: any) => {
      console.log('hi');
    }
  
    return (
      <div>
        <img id="SmoreLogo" src={logo}/>
        <button onClick={handleClick}>logout</button>
      </div>
    )
  };

  export default AppHeader;
