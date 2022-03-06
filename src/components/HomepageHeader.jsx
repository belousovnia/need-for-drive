import React, { useLayoutEffect } from 'react';
import Location from './Location';

function HomepageHeader(props) {
  let modifier;

  if (props.modifier == undefined) {
    modifier = '';
  } else {
    modifier = props.modifier;
  };

  return ( 
    <header className={`homepage-header ${modifier}`} >
      <h1 className='homepage-header__logo'>
        Need for drive
      </h1>
      <Location/>
    </header>
  );
}

export default HomepageHeader;