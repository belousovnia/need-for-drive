import React from 'react';
import { Link } from 'react-router-dom';
import Arrow from './svg/Arrow';

function StageLine() {
  return ( 
    <div className='stage-line'>
      <div className='stage-line__content'>
        <Link to='' className='stage-line__link'>Местоположение</Link>
        <div className='stage-line__link-wrapped'>
          <Arrow/>
          <Link to='' className='stage-line__link'>Модель</Link>
        </div>
        <div className='stage-line__link-wrapped'>
          <Arrow/>
          <Link to='' className='stage-line__link'>Дополнительно</Link>
        </div>
        <div className='stage-line__link-wrapped'>
          <Arrow/>
          <Link to='' className='stage-line__link'>Итого</Link>
        </div>
      </div>
    </div>
  );
}

export default StageLine;