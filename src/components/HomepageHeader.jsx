import React from 'react';
import Location from './Location';
import { Link } from 'react-router-dom';

function HomepageHeader(props) {
  
  return ( 
    <header className={`homepage-header ${props.modifier ||''}`} >
      <Link 
        to='/'
        className='homepage-header__logo'
      >
        Need for drive
      </Link>
      <Location/>
    </header>
  );
}

export default HomepageHeader;