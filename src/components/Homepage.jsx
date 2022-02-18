import React from 'react';
import Location from './Location';
import Slider from './Slider';

function Homepage() {
  return (
    <> 
      <div className='homepage'>
        <header className='homepage__header'>
          <h1 className='homepage__logo'>Need for drive</h1>
          <Location/>
        </header>

        <div className='homepage__content'>
          <h1 className='homepage__title'>
            Каршеринг
          </h1>
          <h1 className='homepage__logo homepage__logo_big'>
            Need for drive
          </h1>
          <p className='homepage__p'>
            Поминутная аренда авто твоего города
          </p>
          
          <button className='main-button' >
            <p className='main-button__title'>
              Забронировать
            </p>
          </button>
        </div>

        <footer className='homepage__footer'>
          <p className='homepage__footer-title'>© 2016-2019 «Need for drive»</p>
          <p className='homepage__number'>8 (495) 234-22-44</p>
        </footer>
      </div>
      <Slider/>
    </>
  );
}

export default Homepage;