import React from 'react';
import { Link } from 'react-router-dom';
import Slider from './Slider';
import HomepageHeader from './HomepageHeader';
import Header from './Header';

function Homepage() {
  return (
    <>
      <Header/>
      <div className='content'> 
        <div className='homepage'>
          <HomepageHeader/>

          <div className='homepage__content'>
            <div className='homepage__content-text-wrapper'>
              <h1 className='homepage__title'>
                Каршеринг
              </h1>
              <h1 className='homepage-header__logo homepage-header__logo_big'>
                Need for drive
              </h1>
              <p className='homepage__p'>
                Поминутная аренда авто твоего города
              </p>
            </div>
            
            
            <Link to="/order/step-1" className='main-button main-button_homepage' >
              <p className='main-button__title'>
                Забронировать
              </p>
            </Link>
          </div>

          <footer className='homepage__footer'>
            <p className='homepage__footer-title'>© 2016-2019 «Need for drive»</p>
            <p className='homepage__number'>8 (495) 234-22-44</p>
          </footer>
        </div>
        <Slider/>
      </div>
    </>
  );
}

export default Homepage;