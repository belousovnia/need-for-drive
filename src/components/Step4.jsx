import { React, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeOrderInformation } from '../store/actions';

function Step4(props) {
  const { 
    orderData, 
    orderInformation, 
    changeOrderInformation,
  } = props;

  console.log(orderData);

  function checkTank() {
    if (orderData.fullTank) {
      return '100%';
    } else if (orderData.car.tank) {
      return `${orderData.car.tank}%`;
    } else {
      return '-';
    };
  };

  function getDate() {
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

  function buildInformation() {
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
            <p className='step-4__information-p-number'>{checkTank()}</p>
          </div>
          <div className='step-4__information-line'>
            <p className='step-4__information-p'>Достуана с</p>
            <p className='step-4__information-p-number'>{getDate()}</p>
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
    )
  }

  // ------------------------------------------------------

  useEffect(() => {
    try {buildInformation(); } catch {};
    let button = document.getElementById('order-page-data__button');
    button.classList.remove('main-button_bloked');
  }, []);

  return ( 
    <div className='step-4'>
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
  };
};


export default connect(putStateToProps, putActionToProps)(Step4);