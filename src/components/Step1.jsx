import React from 'react';
import SelectCity from './SelectCity';
import { getCityPoint } from './dataFunction/dataStep1';
import SelectPoint from './SelectPoint';
import Map from './Map';

function Step1() {

  let dataStep1 = getCityPoint()

  return ( 
    <div className='step-1'> 
      <div className='step-1__items-block'>
        <div className='step-1__items-city'>
          <p className='step-1_items-p'>Город</p>
          <SelectCity
            data = {dataStep1}
          />
        </div>
        <div className='step-1__items-point'>
          <p className='step-1_items-p'>Пункт выдачи</p>
          <SelectPoint 
            data = {dataStep1}
          />
        </div>
      </div>
      <Map/>
    </div>
  );
};

export default Step1;