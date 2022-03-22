import React from 'react';
import Location from './Location';

function HomepageHeader(props) {
  
  return ( 
    <header className={`homepage-header ${props.modifier ||''}`} >
      <h1 className='homepage-header__logo'>
        Need for drive
      </h1>
      <Location/>
    </header>
  );
}

export default HomepageHeader;