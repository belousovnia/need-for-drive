import {React, useEffect} from 'react';
import HomepageHeader from './HomepageHeader';
import Header from './Header';
import StepLine from './StepLine';
import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import OrderPageData from './OrderPageData';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeModalWindow } from '../store/actions';
import classNames from 'classnames';
import { pushOrder } from './dataFunction/dataStep4';
import { changeStep } from '../store/actions';
import { changeOrderData } from '../store/actions';


function OrderPage(props) {
  let location = useLocation().pathname;

  const {
    changeModalWindow,
    modalWindow, 
    step,
    orderData,
    changeStep,
    changeOrderData,
  } = props;

  const goStep = useNavigate();

  function redirectStep() {
    let nowStep = 1;
    switch (location) {
      case '/order/step-1':
        break;
      case '/order/step-2':
        nowStep = 2;
        break;
      case '/order/step-3':
        nowStep = 3;
        break;
      case '/order/step-4':
        nowStep = 4;
        break;
    };
    if (nowStep > step) {
      goStep('/order/step-1');
    };
  };

  const modalWindowClass = classNames({
    'step-4__modalWindow': true,
    'step-4__modalWindow_active': modalWindow,
  });

  async function pushOrderGetId(){  
    const newIdOrder = await pushOrder(orderData);
    changeModalWindow(false);
    changeStep(1);
    changeOrderData({});
    goStep(`/order/step-5/${newIdOrder.id}`);
  };

  // ------------------------------------------------------
  
  useEffect(redirectStep, [location]);

  return ( 
    <>
      <div className={modalWindowClass}>
        <p className='step-4__modalWindow-title'>Подтвердить заказ</p>
        <div className='step-4__modalWindow-button-container'>
          <button
            className='main-button step-4__modalWindow-main-button'
            onClick={pushOrderGetId}
          >
            <p className='main-button__title'>
              Подтвердить
            </p>
          </button>
          <button 
          className='main-button step-4__modalWindow-back-button'
            onClick={() => {
              changeModalWindow(false);
            }}
          >
            <p className='main-button__title'>
              Вернуться
            </p>
          </button>
        </div>
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
    changeStep: bindActionCreators(changeStep, dispatch),
    changeOrderData: bindActionCreators(changeOrderData, dispatch),
  };
};


export default connect(putStateToProps, putActionToProps)(OrderPage);