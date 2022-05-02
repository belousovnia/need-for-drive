import { React, useEffect } from 'react';
import { getDate, deleteSubject } from './dataFunction/generalFunction';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function AdminOrderTile(props) {
  const {
    data, 
    id, 
    login, 
    update,
  } = props;
  
  const navigate = useNavigate();

  // ------------------------------------------------------

  function checkValueCheckBox() {
    if (data.isFullTank) {
      const element = document.getElementById(`admin-page-tile-tank-${id}`)
      element.checked = 1;
    };
    if (data.isNeedChildChair) {
      const element = document.getElementById(`admin-page-tile-childChair-${id}`)
      element.checked = 1;
    };
    if (data.isRightWheel) {
      const element = document.getElementById(`admin-page-tile-rightWheel-${id}`)
      element.checked = 1;
    };
  };
  
  // ------------------------------------------------------

  async function callBackDelete() {
    const question =  window.confirm(`Удалить заказ ${data.id}`);
    if (question) {
      await deleteSubject(login.data.access_token, data.id, 'order');
      update(data.id);
    };
  };

  useEffect(checkValueCheckBox, []);

  let carName;
  let path;
  let cityName;
  let address;
  let price;
  let color;

  if (data.carId) {
    carName = data.carId.name;
    path = data.carId.thumbnail.path;
  } else {
    carName = 'null';
    path = '../media/car.jpg';
  };

  if(data.cityId){
    cityName = data.cityId.name;
  } else {
    cityName = 'null';
  };

  if(data.pointId){
    address = data.pointId.address;
  } else {
    address = 'null';
  };

  if(data.price){
    price = data.price;
  } else {
    price = 'null';
  };

  if(data.color){
    color = data.color;
  } else {
    color = 'null';
  };
  
  return (
    <div 
      className='admin-page-tile'
    >
      <img
        className='admin-page-tile__car-img' 
        src={path}
        onError={(i) => {
          i.target.src = require('../media/car.jpg')
        }}
      />

      <div className='admin-page-tile__text-container'>
        <p className='admin-page-tile__p'>
          <b>{carName}</b> в <b>{cityName}</b>, {address}
        </p>
        <p className='admin-page-tile__p'>
          {`${getDate(data.dateFrom)} - ${getDate(data.dateTo)}`}
        </p>
        <p className='admin-page-tile__p'>
          Цвет: <b>{color}</b>
        </p>
      </div>

      <div className='admin-page-tile__check-box-container'>
        <div className='radio-button__container'>
          <input
            type='checkbox' 
            className='radio-button__input'
            id={`admin-page-tile-tank-${id}`}
            disabled
          />
          <label
            className='radio-button__label admin-page-tile__button-label'
            htmlFor={`admin-page-tile-tank-${id}`}
          >
            <div className='checkbox-button__point'>
              <svg
                className='checkbox-button__check'
                viewBox="0 0 13 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.625 3.33333L0 5L4.875 10L13 1.66667L11.375 0L4.875 6.66667L1.625 3.33333Z"
                  fill="#121212"
                />
              </svg>
            </div>
            <p className='radio-button__title'>Полный бак</p>
          </label>
        </div>
        <div className='radio-button__container'>
          <input
            type='checkbox' 
            className='radio-button__input'
            id={`admin-page-tile-childChair-${id}`}
            disabled
          />
          <label
            className='radio-button__label admin-page-tile__button-label'
            htmlFor={`admin-page-tile-childChair-${id}`}
          >
            <div className='checkbox-button__point'>
              <svg
                className='checkbox-button__check'
                viewBox="0 0 13 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.625 3.33333L0 5L4.875 10L13 1.66667L11.375 0L4.875 6.66667L1.625 3.33333Z"
                  fill="#121212"
                />
              </svg>
            </div>
            <p className='radio-button__title'>Детское кресло</p>
          </label>
        </div>
        <div className='radio-button__container'>
          <input
            type='checkbox' 
            className='radio-button__input'
            id={`admin-page-tile-rightWheel-${id}`}
            disabled
          />
          <label
            className='radio-button__label admin-page-tile__button-label' 
            htmlFor={`admin-page-tile-rightWheel-${id}`}
          >
            <div className='checkbox-button__point'>
              <svg
                className='checkbox-button__check'
                viewBox="0 0 13 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.625 3.33333L0 5L4.875 10L13 1.66667L11.375 0L4.875 6.66667L1.625 3.33333Z"
                  fill="#121212"
                />
              </svg>
            </div>
            <p className='radio-button__title'>Правый руль</p>
          </label>
        </div>
      </div>
      
      <p className='admin-page-tile__price'>
        {price} ₽
      </p>

      <div className='admin-page-tile__button-container'>
        <button   
          className='admin-page-tile__button_cansel admin-page-tile__button'
          onClick={callBackDelete}
        >
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.63858 3.205L7.97154 2.5L5.32704 5.295L2.68254 2.5L2.0155 3.205L4.66 6L2.0155 8.795L2.68254 9.5L5.32704 6.705L7.97154 9.5L8.63858 8.795L5.99408 6L8.63858 3.205Z"
              fill="#C4183C"
            />
          </svg>
          Удалить
        </button>
        <button 
          className='admin-page-tile__button_change admin-page-tile__button'
          onClick={() => navigate(data.id)}
        >
          <svg
            width={13}
            height={12}
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.32677 4C6.84715 4 7.27292 3.55 7.27292 3C7.27292 2.45 6.84715 2 6.32677 2C5.80638 2 5.38062 2.45 5.38062 3C5.38062 3.55 5.80638 4 6.32677 4ZM6.32677 5C5.80638 5 5.38062 5.45 5.38062 6C5.38062 6.55 5.80638 7 6.32677 7C6.84715 7 7.27292 6.55 7.27292 6C7.27292 5.45 6.84715 5 6.32677 5ZM5.38062 9C5.38062 8.45 5.80638 8 6.32677 8C6.84715 8 7.27292 8.45 7.27292 9C7.27292 9.55 6.84715 10 6.32677 10C5.80638 10 5.38062 9.55 5.38062 9Z"
              fill="#818EA3"
            />
          </svg>
          Изменить
        </button>
      </div>

    </div>
  );
};

const putStateToProps = (state) => {
  return {...state};
};


export default connect(putStateToProps)(AdminOrderTile);