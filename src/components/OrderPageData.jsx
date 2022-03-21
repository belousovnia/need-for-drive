import { React, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { changeStep } from '../store/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeStatusStep1 } from '../store/actions';
import { changeOrderData } from '../store/actions';
import { prettify } from './dataFunction/generalFunction';

function OrderPageData(props) {
  const { 
    changeStep, 
    step, 
    listFinalPoint, 
    point, 
    city,
    changeStatusStep1,
    statusStep1,
    orderData,
    changeOrderData,
    car,
    color,
    startDate,
    endDate,
    rate,
    fullTank,
    childChair,
    rightWheel,
  } = props;

  let location = useLocation().pathname;

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
      case '/order/step-5':
        nowStep = 5;
        break;
    };
    if (nowStep > step) {
      window.location = '#/order/step-1';
    };
  };

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
      case '/order/step-5':
        return 5;
    };
  };
  
  function checkForm() {
    for (let i in listFinalPoint) {
      if (listFinalPoint[i][0].toUpperCase() == city.toUpperCase() &&
      listFinalPoint[i][1].toUpperCase() == point.toUpperCase()) {
        return true;
      }; 
    };
    return false;
  };

  function linkChange() {
    switch (getLocation()) {
      case 1:
        return 'step-2';
      case 2:
        return 'step-3';
      case 3:
        return 'step-4';
      case 4:
        return 'step-5';
      case 5:
        return 'step-1';
    };
  };

  function titleChange() {
    switch (getLocation()) {
      case 1:
        return 'Выбрать модель';
      case 2:
        return 'Дополнительно';
      case 3:
        return 'Итого';
      case 4:
        return 'Заказать';
      case 5:
        return 'Отменить';
    };
  };

  function getAddress() {
    for (let i in listFinalPoint) {
      let item = listFinalPoint[i]
      if (city == item[0] && point == item[1]) {
        return item[2];
      };
    };
  };

  function getRentalPrice() {
    let periot = endDate - startDate;
    let unit = rate.rateTypeId.unit;
    let rentalPrice;

    if (unit == 'мин') {
      rentalPrice = Math.floor(periot / 60000);
    } else {
      const [days, nameUnit] = unit.split(' ');
      if (unit == 'сутки') {
        rentalPrice = Math.ceil(periot / 86400000);
      } else if (nameUnit == 'дней') {
        rentalPrice = Math.ceil(periot / (86400000 * days));
      };
    };
    rentalPrice =  rentalPrice * rate.price;
    if (fullTank) rentalPrice = rentalPrice + 500;
    if (childChair) rentalPrice = rentalPrice + 200;
    if (rightWheel) rentalPrice = rentalPrice + 1600;
    if (rentalPrice > car.priceMax) rentalPrice = car.priceMax;
    if (rentalPrice < car.priceMin) rentalPrice = car.priceMin;

    return rentalPrice;
  };

  function getRentalPeriod() {
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

  function changeButtonData() {
    let newData = {};
    switch (getLocation()) {
      case 1:
        newData = {
          'city': city,
          'point': point,
          'address': getAddress(),
        };
        break;
      case 2:
        newData = {
          'city': city,
          'point': point,
          'address': getAddress(),
          'car': car,
        }
        break;
      case 3:
        newData = {
          'city': city,
          'point': point,
          'address': getAddress(),
          'car': car,
          'color': color,     
          'startDate': startDate,
          'endDate': endDate,
          'rate': rate,
          'fullTank': fullTank,
          'childChair': childChair,
          'rightWheel': rightWheel,
          'price': getRentalPrice(),
          'rentalPeriod': getRentalPeriod(),
        }
        break;
      case 4:
        break;
      case 5:
    };
    changeOrderData(newData);
  };

  // ------------------------------------------------------

  function buildOrderTitle() {
    let listTitle = [];
    if (orderData.address != undefined && 
      orderData.city != undefined &&
      orderData.point != undefined) {
      listTitle.push(
        <li key={'lt1'} className='information-list__line'>
          <span className="information-list__title">Пункт выдачи</span>
          <span className="information-list__chapter">
            {`${orderData.city}, ${orderData.address}`}
          </span>
        </li>
      );
    };
    if (orderData.car != undefined) {
      listTitle.push(
        <li key={'lt2'} className='information-list__line'>
          <span className="information-list__title">Модель</span>
          <span className="information-list__chapter">
            {orderData.car.name}
          </span>
        </li>
      );
    };
    if (orderData.color != undefined) {
      listTitle.push(
        <li key={'lt3'} className='information-list__line'>
          <span className="information-list__title">Цвет</span>
          <span className="information-list__chapter">
            {orderData.color}
          </span>
        </li>
      );
    };
    if (orderData.rentalPeriod != undefined) {
      listTitle.push(
        <li key={'lt4'} className='information-list__line'>
          <span className="information-list__title">Длительность аренды</span>
          <span className="information-list__chapter">
            {orderData.rentalPeriod}
          </span>
        </li>
      );
    };
    if (orderData.rate != undefined) {
      listTitle.push(
        <li key={'lt5'} className='information-list__line'>
          <span className="information-list__title">Тариф</span>
          <span className="information-list__chapter">
            {orderData.rate.rateTypeId.name}
          </span>
        </li>
      );
    };
    if (orderData.fullTank) {
      listTitle.push(
        <li key={'lt6'} className='information-list__line'>
          <span className="information-list__title">Полный бак</span>
          <span className="information-list__chapter">
            Да
          </span>
        </li>
      );
    };
    if (orderData.childChair) {
      listTitle.push(
        <li key={'lt7'} className='information-list__line'>
          <span className="information-list__title">Детское кресло</span>
          <span className="information-list__chapter">
            Да
          </span>
        </li>
      );
    };
    if (orderData.rightWheel) {
      listTitle.push(
        <li key={'lt8'} className='information-list__line'>
          <span className="information-list__title">Правый руль</span>
          <span className="information-list__chapter">
            Да
          </span>
        </li>
      );
    };
    return listTitle;
  };

  function checkButton() {
    let button = document.getElementById('order-page-data__button');
    switch (getLocation()) {
      case 1: 
        if (statusStep1) {
          button.classList.remove('main-button_bloked');
        } else {
          button.classList.add('main-button_bloked');
        };
        break;
      case 2: 
        if (car == undefined) {
          button.classList.add('main-button_bloked');
        } else {
          button.classList.remove('main-button_bloked');
        };
        break;
      case 3:
        if (
          color == undefined ||
          startDate == null ||
          endDate == null ||
          startDate >= endDate ||
          rate == ''
        ) {
          button.classList.add('main-button_bloked');  
        } else {
          button.classList.remove('main-button_bloked');
        };
        break;
    };   
  };

  function buildPrise() {
    if(orderData.price != undefined) {
      return (
        <p className='order-page-data__price'>
          <b>Цена: </b>{`${prettify(orderData.price)}₽`} 
        </p>
      );
    } else if (orderData.car != undefined) {
      return (
        <p className='order-page-data__price'>
          <b>Цена: </b>{`от ${prettify(orderData.car.priceMin)} до ${prettify(orderData.car.priceMax)} ₽`}
        </p>
      );
    } else  {
      return (
        <p className='order-page-data__price'>
          <b>Цена: </b>от 8 000 до 12 000 ₽
        </p>
      );
    };
  }; 

  // ------------------------------------------------------

  useEffect(() => {
    changeStatusStep1(checkForm());
  }, [city, point]);

  useEffect(() => {
    checkButton();
  }, [
    step, 
    statusStep1, 
    car, 
    location, 
    endDate, 
    startDate, 
    color, 
    rate
  ]);

  useEffect(() => {
    redirectStep();
  }, [location])

  return ( 
    <div className='order-page-data'>
      <h1 className='order-page-data__title'>Ваш заказ:</h1>
      <ul className="information-list">
        {buildOrderTitle()}
      </ul>
      {buildPrise()}
      <Link 
        to={`/order/${linkChange()}`}      
        className='main-button main-button_homepage main-button_bloked main-button_order'
        id='order-page-data__button' 
        onClick={
          () => {
            changeStep(getLocation() + 1);
            changeButtonData();
          }
        }
      >
        <p className='main-button__title'>
          {titleChange()}
        </p>
      </Link>
    </div>
  );
};

const putStateToProps = (state) => {
  return {
    step: state.step,
    listFinalPoint: state.listFinalPoint,
    point: state.point,
    city: state.city,
    statusStep1: state.statusStep1,
    orderData: state.orderData,
    car: state.car,
    color: state.color,
    startDate: state.startDate,
    endDate: state.endDate,
    rate: state.rate,
    fullTank: state.fullTank,
    childChair: state.childChair,
    rightWheel: state.rightWheel,
  };
};

const putActionToProps = (dispatch) => {
  return {
    changeStep: bindActionCreators(changeStep, dispatch),
    changeStatusStep1: bindActionCreators(changeStatusStep1, dispatch),
    changeOrderData: bindActionCreators(changeOrderData, dispatch),
  };
};

const WrappedOrderPageDataComponent = connect(putStateToProps, putActionToProps)(OrderPageData);

export default connect(putStateToProps, putActionToProps)(WrappedOrderPageDataComponent);