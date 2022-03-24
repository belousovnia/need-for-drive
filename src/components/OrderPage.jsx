import React from 'react';
import HomepageHeader from './HomepageHeader';
import Header from './Header';
import StepLine from './StepLine';
import { Link, Outlet } from 'react-router-dom';
import OrderPageData from './OrderPageData';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeModalWindow } from '../store/actions';
import classNames from 'classnames';


function OrderPage(props) {
  const {
    changeModalWindow,
    modalWindow, 
  } = props;

  const modalWindowClass = classNames({
    'step-4__modalWindow': true,
    'step-4__modalWindow_active': modalWindow,
  });

  return ( 
    <>
      <div className={modalWindowClass}>
        <button 
          onClick={() => {
            changeModalWindow(false)
          }}
        >горкодон</button>
      </div>
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

const putStateToProps = (state) => {
  return {...state};
};

const putActionToProps = (dispatch) => {
  return {
    changeModalWindow: bindActionCreators(changeModalWindow, dispatch),
  };
};


export default connect(putStateToProps, putActionToProps)(OrderPage);