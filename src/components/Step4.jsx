import { React, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { changeOrderInformation } from '../store/actions';
import { changeStep } from '../store/actions';
import { changeOrderData } from '../store/actions';
import { changeReceivedOrder } from '../store/actions';
import classNames from 'classnames';
import { getOrderData } from './dataFunction/dataStep4';

function Step4(props) {
  const { 
    orderData, 
    orderInformation, 
    changeOrderInformation,
    changeReceivedOrder,
    receivedOrder,
  } = props;

  
  const location = useLocation().pathname;
  const { orderId } = useParams();

  function getLocation() {
    switch (location) {
      case '/order/step-1':
        return 1;
      case '/order/step-2':
        return 2;
      case '/order/step-3':
        return 3;
      case '/order/step-4':
        return 4;
    };
    if (location.includes('/order/step-5/')) return 5;
  };

  function getRentalPeriod(startDate, endDate) {
    let periot = endDate - startDate;

    let min = Math.ceil(periot / 60000);
    let hours = Math.floor(min / 60);
    min = Math.round(min % 60);
    let day = Math.floor(hours / 24);
    hours = Math.floor(hours % 24);

    let itemDay = '';
    let itemHours = '';
    let itemMin = '';

    if (day != 0) {itemDay = `${day}д `};
    if (hours != 0) {itemHours = `${hours}ч `};
    if (min != 0) {itemMin = `${min}м`};
    
    let rentalPeriod = `${itemDay}${itemHours}${itemMin}`;
 
    return rentalPeriod;
  };

  async function buildOrder() {
    if (location.includes('/order/step-5/')){
      if (orderId) {
        const data = await getOrderData(orderId);
        changeReceivedOrder({
          'point': {
            ...data.pointId,
            'cityId': data.cityId,
          },
          'car': {...data.carId},
          'color': data.color,     
          'startDate': new Date(data.dateFrom),
          'endDate': new Date(data.dateTo),
          'rate': {...data.rateId},
          'fullTank': data.isFullTank,
          'childChair': data.isNeedChildChair,
          'rightWheel': data.isRightWheel,
          'price': data.price,
          'rentalPeriod': getRentalPeriod(new Date(data.dateFrom), new Date(data.dateTo)),
          'id': data.id,
        });
      };
    };
  };

  function checkTank(orderData) {
    if (orderData.fullTank) {
      return '100%';
    } else if (orderData.car.tank) {
      return `${orderData.car.tank}%`;
    } else {
      return '-';
    };
  };

  function getDate(orderData) {
    const date = orderData.startDate;
    let mount = date.getMonth();
    let day = date.getDate();
    let minutes = date.getMinutes();

    if (mount <= 9) mount = '0' + mount;
    if (day <= 9) day = '0' + day;
    if (minutes <= 9) minutes = '0' + minutes;

    let strDate = `${day}.${mount}.${date.getFullYear()} ${date.getHours()}:${minutes}`
    return strDate
  }

  function buildInformation(orderData) {
    changeOrderInformation(
      <div className='step-4__data-car-block'>
        <div className='step-4__information'>
          <p className='step-4__information-title'>
            {orderData.car.name}
          </p>
          <div className='step-4__information-number-wrapped'>
            <p className='step-4__information-number'>{orderData.car.number || '-'}</p> 
          </div>
          <div className='step-4__information-line'>
            <p className='step-4__information-p'>Топливо</p>
            <p className='step-4__information-p-number'>{checkTank(orderData)}</p>
          </div>
          <div className='step-4__information-line'>
            <p className='step-4__information-p'>Достуана с</p>
            <p className='step-4__information-p-number'>{getDate(orderData)}</p>
          </div>
        </div>
        <img
          className='step-4_car-img' 
          src={orderData.car.thumbnail.path}
          onError={(i) => {
            i.target.src = require('../media/car.jpg')
          }}
        />
      </div>
    );
  };

  const titleClass = classNames({
    'step-4__title': true,
    'step-4__title_off': !(getLocation() == 5 && receivedOrder),
  });

  // ------------------------------------------------------

  useEffect(() => {
    if (getLocation() == 5) {
      try {buildInformation(receivedOrder)} catch {};
    } else {
      try {buildInformation(orderData)} catch {};
    }
    
    let button = document.getElementById('order-page-data__button');
    button.classList.remove('main-button_bloked');
  }, [orderData, receivedOrder]);

  useEffect(buildOrder, [location]);

  return ( 
    <div className='step-4'>
      <p className={titleClass}>Ваш заказ подтвержден</p>
      {orderInformation}
    </div>
  );
};

const putStateToProps = (state) => {
  return {...state};
};

const putActionToProps = (dispatch) => {
  return {
    changeOrderInformation: bindActionCreators(changeOrderInformation, dispatch),
    changeOrderData: bindActionCreators(changeOrderData, dispatch),
    changeStep: bindActionCreators(changeStep, dispatch),
    changeReceivedOrder: bindActionCreators(changeReceivedOrder, dispatch),
  };
};


export default connect(putStateToProps, putActionToProps)(Step4);