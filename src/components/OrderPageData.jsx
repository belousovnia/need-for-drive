import React from 'react';
import { Link } from 'react-router-dom';

function OrderPageData() {
  return ( 
    <div className='order-page-data'>
      <h1 className='order-page-data__title'>Ваш заказ:</h1>
      <Link to="/order" className='main-button main-button_homepage' >
        <p className='main-button__title'>
          Выбрать модель
        </p>
      </Link>
    </div>
  );
};

export default OrderPageData;