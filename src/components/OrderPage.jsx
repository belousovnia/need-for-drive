import React from 'react';
import HomepageHeader from './HomepageHeader';
import Header from './Header';
import StepLine from './StepLine';
import { Link, Outlet } from 'react-router-dom';
import OrderPageData from './OrderPageData';

function OrderPage() {
  return ( 
    <>
      <Header type='order'/>
      <div className='content'>
        <div className='order-page'>
          <div className='order-page__header-wrapped'>
            <HomepageHeader modifier='homepage-header_order-page'/>
          </div>
          <StepLine/>
          <div className='order-page__main-block'>
            <div className='order-page__form'>
              <Outlet/>
            </div>
            <div className='order-page__data-wrapped'>
              <OrderPageData/>
            </div>
          </div>
        </div>
      </div>
    </>
    
  );
}

export default OrderPage;