import { React, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { changeStep } from '../store/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeOrderData } from '../store/actions';
import { prettify } from './dataFunction/generalFunction';
import { changeModalWindow } from '../store/actions';
import { changeTitlePrice } from '../store/actions';
import classNames from 'classnames';

function OrderPageData(props) {
  const { 
    changeStep, 
    step, 
    listFinalPoint, 
    point, 
    city,
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
    changeModalWindow,
    changeTitlePrice,
    titlePrice,
    receivedOrder,
  } = props;

  let location = useLocation().pathname;

  console.log(step);
  console.log(orderData);

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


  function linkChange() {
    if (getLocation() < 4) {
      return `/order/step-${getLocation() + 1}`;
    } else if (getLocation() == 4) {
      return `/order/step-${getLocation()}`;
    } else if (getLocation() == 5) {
      return `/`;
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
      let itemCity = listFinalPoint[i]
      if (city.toLowerCase() == itemCity.name.toLowerCase()) {
        for (let i2 in itemCity.points) {
          let itemPoint = itemCity.points[i2];
          if (point.toLowerCase() == itemPoint.name.toLowerCase()) {
            return {
              ...itemPoint,
              'address': `${itemCity.name}, ${itemPoint.address}`,
            };
          };
        };
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
    switch (getLocation()) {
      case 1:
        changeOrderData({
          'point': getAddress(),
        });
        break;
      case 2:
        changeOrderData({
          'point': getAddress(),
          car,
        });
        break;
      case 3:
        changeOrderData({
          'point': getAddress(),
          car,
          color,     
          startDate,
          endDate,
          rate,
          fullTank,
          childChair,
          rightWheel,
          'price': getRentalPrice(),
          'rentalPeriod': getRentalPeriod(),
        });
        break;
      case 4:
        changeModalWindow(true);
        break;
      case 5:
        break;
    };
  };


  function checkColor() {
    try {
      for (let i in car.colors) {
        if (color == car.colors[i]) {
          return true;
        };
      };
      return false;
    } catch {
      return false;
    };
  };


  function buildOrderTitle(orderData) {
    let listTitle = [];
    if (getLocation() == 5) {
      orderData = receivedOrder;
      if (orderData == undefined) return listTitle;
    };
    if (orderData.point) {
      listTitle.push(
        <li key={'lt1'} className='information-list__line'>
          <span className="information-list__title">Пункт выдачи</span>
          <span className="information-list__chapter">
            {orderData.point.address}
          </span>
        </li>
      );
    };
    if (orderData.car) {
      listTitle.push(
        <li key={'lt2'} className='information-list__line'>
          <span className="information-list__title">Модель</span>
          <span className="information-list__chapter">
            {orderData.car.name}
          </span>
        </li>
      );
    };
    if (orderData.color) {
      listTitle.push(
        <li key={'lt3'} className='information-list__line'>
          <span className="information-list__title">Цвет</span>
          <span className="information-list__chapter">
            {orderData.color}
          </span>
        </li>
      );
    };
    if (orderData.rentalPeriod) {
      listTitle.push(
        <li key={'lt4'} className='information-list__line'>
          <span className="information-list__title">Длительность аренды</span>
          <span className="information-list__chapter">
            {orderData.rentalPeriod}
          </span>
        </li>
      );
    };
    if (orderData.rate) {
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
    switch (getLocation()) {
      case 1: 
        return checkStep1();
      case 2: 
        return car == undefined;
      case 3: 
        return (
          checkColor() == false ||
          startDate == null ||
          endDate == null ||
          startDate >= endDate ||
          rate == undefined ||
          getRentalPrice() > car.priceMax 
        );
      case 4:
        return false
      case 5:
        return false
    };   
  };


  function buildPrise(car) {
    if (getLocation() == 5) {
      if (receivedOrder) {
        changeTitlePrice(
          <div className='order-page-data__price-wrapped'>
            <p className='order-page-data__price'>
              <b>Цена: </b>{`${prettify(receivedOrder.price)} ₽`} 
            </p>
          </div>
        );
      }; 
    } else if(
      getLocation() == 3 && 
      rate &&
      startDate &&
      endDate &&
      startDate < endDate 
    ) {
      if (getRentalPrice() > car.priceMax) {
        changeTitlePrice(
          <div className='order-page-data__price-wrapped'>
            <p className='order-page-data__price'>
              <b>Цена: </b>{`${prettify(getRentalPrice())} ₽`} 
            </p>
            <p className='order-page-data__price-alert'>
              {`Цена не должна превышать ${prettify(car.priceMax)} ₽`}
            </p> 
          </div>
        );
      } else {
        changeTitlePrice(
          <div className='order-page-data__price-wrapped'>
            <p className='order-page-data__price'>
              <b>Цена: </b>{`${prettify(getRentalPrice())}₽`} 
            </p>
          </div>
        );
      };
    } else if (orderData.price) {
      changeTitlePrice(
        <div className='order-page-data__price-wrapped'>
          <p className='order-page-data__price'>
            <b>Цена: </b>{`${prettify(orderData.price)} ₽`}
          </p>
        </div>
      );
    } else if (orderData.car) {
      changeTitlePrice(
        <div className='order-page-data__price-wrapped'>
          <p className='order-page-data__price'>
            <b>Цена: </b>{`от ${prettify(orderData.car.priceMin)} до ${prettify(orderData.car.priceMax)} ₽`}
          </p>
        </div>
      );
    } else  {
      changeTitlePrice(
        <div className='order-page-data__price-wrapped'>
          <p className='order-page-data__price'>
            <b>Цена: </b>от 8 000 до 12 000 ₽
          </p>
        </div>
      );
    };
  }; 


  function orderButtonOnClick() {
    if (getLocation() < 4) {
      changeStep(getLocation() + 1);
    };
    changeButtonData();
    window.scrollTo(0, 0);
  };

  function checkStep1() { 
    for (let i in listFinalPoint) {
      let itemCity = listFinalPoint[i]
      if (city.toLowerCase() == itemCity.name.toLowerCase()) {
        for (let i2 in itemCity.points) {
          let itemPoint = itemCity.points[i2];
          if (point.toLowerCase() == itemPoint.name.toLowerCase()) {
            return false;
          };
        };
      };
    };
    return true;
  };


  const buttonClass = classNames({
    'main-button': true,
    'main-button_homepage': true,
    'main-button_order': true,
    'main-button_bloked': checkButton(),
    'step-4__modalWindow-back-button': getLocation() == 5,
  });


  // ------------------------------------------------------


  useEffect(() => {
    buildPrise(car);
  }, [
    city,
    point,
    step, 
    car, 
    location, 
    endDate, 
    startDate, 
    color, 
    rate,
    fullTank,
    childChair,
    rightWheel,
    orderData,
  ]);


  return ( 
    <div className='order-page-data'>
      <h1 className='order-page-data__title'>Ваш заказ:</h1>
      <ul className="information-list">
        {buildOrderTitle(orderData)}
      </ul>
      {titlePrice}
      <Link 
        to={linkChange()}  
        className={buttonClass}
        id='order-page-data__button' 
        onClick={orderButtonOnClick}
      >
        <p className='main-button__title'>
          {titleChange()}
        </p>
      </Link>
    </div>
  );
};

const putStateToProps = (state) => {
  return {...state};
};

const putActionToProps = (dispatch) => {
  return {
    changeStep: bindActionCreators(changeStep, dispatch),
    changeOrderData: bindActionCreators(changeOrderData, dispatch),
    changeModalWindow: bindActionCreators(changeModalWindow, dispatch),
    changeTitlePrice: bindActionCreators(changeTitlePrice, dispatch),
  };
};

const WrappedOrderPageDataComponent = connect(putStateToProps, putActionToProps)(OrderPageData);

export default connect(putStateToProps, putActionToProps)(WrappedOrderPageDataComponent);