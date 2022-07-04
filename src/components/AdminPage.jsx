import { React, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import AdminLogo from './AdminLogo';
import Bell from './svg/Bell';
import classNames from 'classnames';
import { changeLogin } from '../store/actions';
import LineBurger from './svg/LineBurger';
import { useLocation } from 'react-router-dom';
import SimpleBar from 'simplebar-react';

function AdminPage(props) {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const {
    login,
    changeLogin,
  } = props;

  const [ profileBarState, setProfileBarState ] = useState(true);
  const [ hideMenu, setHideMenu ] = useState(true);

  function checkLocation() {
    let myLocation = location;
    if (location.includes('/admin/order/')) myLocation = '/admin/order/id';
    if (location.includes('/admin/car/')) myLocation = '/admin/car/id';
    if (location.includes('/admin/category/')) myLocation = '/admin/category/id';
    if (location.includes('/admin/rate-type/')) myLocation = '/admin/rate-type/id';
    if (location.includes('/admin/rate/')) myLocation = '/admin/rate/id';
    if (location.includes('/admin/city/')) myLocation = '/admin/city/id';
    if (location.includes('/admin/point/')) myLocation = '/admin/point/id';
    if (location.includes('/admin/order-status/')) myLocation = '/admin/order-status/id';
    try {
      switch (myLocation) {
        case '/admin/order':
          document.getElementById('admin-page__radio-input-order').checked = true;
          break;
        case '/admin/order/id':
          document.getElementById('admin-page__radio-input-order-editor').checked = true;
          break;
        case '/admin/car':
          document.getElementById('admin-page__radio-input-car').checked = true;
          break;
        case '/admin/car/id':
          document.getElementById('admin-page__radio-input-car-editor').checked = true;
          break;
        case '/admin/category':
          document.getElementById('admin-page__radio-input-category').checked = true;
          break;
        case '/admin/category/id':
          document.getElementById('admin-page__radio-input-category-editor').checked = true;
          break;
        case '/admin/rate-type':
          document.getElementById('admin-page__radio-input-rate-type').checked = true;
          break;
        case '/admin/rate-type/id':
          document.getElementById('admin-page__radio-input-rate-type-editor').checked = true;
          break;
        case '/admin/rate':
          document.getElementById('admin-page__radio-input-rate').checked = true;
          break;
        case '/admin/rate/id':
          document.getElementById('admin-page__radio-input-rate-editor').checked = true;
          break;
        case '/admin/city':
          document.getElementById('admin-page__radio-input-city').checked = true;
          break;
        case '/admin/city/id':
          document.getElementById('admin-page__radio-input-city-editor').checked = true;
          break;
        case '/admin/point':
          document.getElementById('admin-page__radio-input-point').checked = true;
          break;
        case '/admin/point/id':
          document.getElementById('admin-page__radio-input-point-editor').checked = true;
          break;
        case '/admin/order-status':
          document.getElementById('admin-page__radio-input-order-status').checked = true;
          break;
        case '/admin/order-status/id':
          document.getElementById('admin-page__radio-input-order-status-editor').checked = true;
          break;
    };
    } catch {}
  };

  function changePage(type) {
    switch (type) {
      case 'order':
        navigate('order');
        break;
      case 'order/new':
        navigate('order/new');
        break;
      case 'car':
        navigate('car');
        break;
      case 'car/new':
        navigate('car/new');
        break;
      case 'category':
        navigate('category');
        break;
      case 'category/new':
        navigate('category/new');
        break;
      case 'rate-type':
        navigate('rate-type');
        break;
      case 'rate-type/new':
        navigate('rate-type/new');
        break;
      case 'rate':
        navigate('rate');
        break;
      case 'rate/new':
        navigate('rate/new');
        break;
      case 'city':
        navigate('city');
        break;
      case 'city/new':
        navigate('city/new');
        break;
      case 'point':
        navigate('point');
        break;
      case 'point/new':
        navigate('point/new');
        break;
      case 'order-status':
        navigate('order-status');
        break;
      case 'order-status/new':
        navigate('order-status/new');
        break;
    };
    setHideMenu(true);
  };

  function checkLogin() {
    if (login == undefined) {
      return false;
    } else if (login.status !== 200){
      return false;
    };
    return true;
  };

  if (!checkLogin()) {
    navigate('/admin-login');
  };
  
  function exitCallback() {
    changeLogin(undefined);
  };

  //-------------------------------------------------------

  const headerBarClass = classNames({
    'admin-page__header-bar': true,
    'admin-page__header-bar_off': profileBarState,
  })

  const arrowClass = classNames({
    'admin-page__header-arrow': true,
    'admin-page__header-arrow-flip': !profileBarState,
  });

  const menuClass = classNames({
    'admin-page__menu-container': true,
    'admin-page__menu-container_hide': hideMenu,
  });

  // ------------------------------------------------------

  

  useEffect(() => {
    if (!checkLogin()) {
      navigate('/admin-login');
    };
  },[login]);

  useEffect(() => {
    checkLocation();
  } , [location]);

  // ------------------------------------------------------

  if (checkLogin()) {
    return (
      <div className='admin-page'>
        <div className={menuClass}>
          <div className='admin-page__menu'>
            <div className='admin-page__logo-container'>
              <AdminLogo className={{'admin-logo_small': true,}}/>
            </div>
            <SimpleBar 
              className='admin-page__menu-container'
              autoHide = { false }
            >
              <div className='admin-page__radio-container'>
                <input
                  type='radio' 
                  className='admin-page__radio-input'
                  name='admin-menu'
                  id='admin-page__radio-input-order' 
                />
                <label
                  className='admin-page__radio-label' 
                  htmlFor='admin-page__radio-input-order'
                  onClick={() => {changePage('order')}}
                >
                  <svg
                    className='admin-page__radio-svg-list'
                    viewBox="0 0 13 10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.5 0.5V1.85714H5.83333V0.5H0.5ZM5.83333 4.57142H0.5V3.21428H5.83333V4.57142ZM0.5 7.28572H5.83333V5.92857H0.5V7.28572ZM0.5 10H5.83333V8.64285H0.5V10ZM12.5 0.5H7.16663V10H12.5V0.5Z"
                    />
                  </svg>
                  <p className='admin-page__radio-p'>
                    Список заказов
                  </p>
                </label>
              </div>

              <div className='admin-page__radio-container'>
                <input
                  type='radio' 
                  className='admin-page__radio-input'
                  id='admin-page__radio-input-order-editor' 
                  name='admin-menu'
                />
                <label
                  className='admin-page__radio-label' 
                  htmlFor='admin-page__radio-input-order-editor'
                  onClick={() => {changePage('order/new')}}
                >
                  <svg
                    className='admin-page__radio-svg-list'
                    viewBox="0 0 15 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.3213 4.10853C13.5596 4.34683 13.5596 4.73177 13.3213 4.97007L12.2031 6.08825L9.91174 3.7969L11.0299 2.67873C11.2682 2.44042 11.6532 2.44042 11.8915 2.67873L13.3213 4.10853ZM2.5 13.5V11.2086L9.25795 4.4507L11.5493 6.74205L4.79135 13.5H2.5Z"
                    />
                  </svg>
                  <p className='admin-page__radio-p'>
                    Редактор заказов
                  </p>
                </label>
              </div>

              <div className='admin-page__radio-container'>
                <input
                  type='radio' 
                  className='admin-page__radio-input'
                  id='admin-page__radio-input-car' 
                  name='admin-menu'
                />
                <label
                  className='admin-page__radio-label' 
                  htmlFor='admin-page__radio-input-car'
                  onClick={() => {changePage('car')}}
                >
                  <svg
                    className='admin-page__radio-svg-list'
                    viewBox="0 0 13 10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.5 0.5V1.85714H5.83333V0.5H0.5ZM5.83333 4.57142H0.5V3.21428H5.83333V4.57142ZM0.5 7.28572H5.83333V5.92857H0.5V7.28572ZM0.5 10H5.83333V8.64285H0.5V10ZM12.5 0.5H7.16663V10H12.5V0.5Z"
                    />
                  </svg>
                  <p className='admin-page__radio-p'>
                    Список автомобилей
                  </p>
                </label>
              </div>

              <div className='admin-page__radio-container'>
                <input
                  type='radio' 
                  className='admin-page__radio-input'
                  id='admin-page__radio-input-car-editor' 
                  name='admin-menu'
                />
                <label
                  className='admin-page__radio-label' 
                  htmlFor='admin-page__radio-input-car-editor'
                  onClick={() => {changePage('car/new')}}
                >
                  <svg
                    className='admin-page__radio-svg-list'
                    viewBox="0 0 15 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.3213 4.10853C13.5596 4.34683 13.5596 4.73177 13.3213 4.97007L12.2031 6.08825L9.91174 3.7969L11.0299 2.67873C11.2682 2.44042 11.6532 2.44042 11.8915 2.67873L13.3213 4.10853ZM2.5 13.5V11.2086L9.25795 4.4507L11.5493 6.74205L4.79135 13.5H2.5Z"
                    />
                  </svg>
                  <p className='admin-page__radio-p'>
                    Редактор автомобилей
                  </p>
                </label>
              </div>

              <div className='admin-page__radio-container'>
                <input
                  type='radio' 
                  className='admin-page__radio-input'
                  id='admin-page__radio-input-category' 
                  name='admin-menu'
                />
                <label
                  className='admin-page__radio-label' 
                  htmlFor='admin-page__radio-input-category'
                  onClick={() => {changePage('category')}}
                >
                  <svg
                    className='admin-page__radio-svg-list'
                    viewBox="0 0 13 10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.5 0.5V1.85714H5.83333V0.5H0.5ZM5.83333 4.57142H0.5V3.21428H5.83333V4.57142ZM0.5 7.28572H5.83333V5.92857H0.5V7.28572ZM0.5 10H5.83333V8.64285H0.5V10ZM12.5 0.5H7.16663V10H12.5V0.5Z"
                    />
                  </svg>
                  <p className='admin-page__radio-p'>
                    Список категорий
                  </p>
                </label>
              </div>

              <div className='admin-page__radio-container'>
                <input
                  type='radio' 
                  className='admin-page__radio-input'
                  id='admin-page__radio-input-category-editor' 
                  name='admin-menu'
                />
                <label
                  className='admin-page__radio-label' 
                  htmlFor='admin-page__radio-input-category-editor'
                  onClick={() => {changePage('category/new')}}
                >
                  <svg
                    className='admin-page__radio-svg-list'
                    viewBox="0 0 15 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.3213 4.10853C13.5596 4.34683 13.5596 4.73177 13.3213 4.97007L12.2031 6.08825L9.91174 3.7969L11.0299 2.67873C11.2682 2.44042 11.6532 2.44042 11.8915 2.67873L13.3213 4.10853ZM2.5 13.5V11.2086L9.25795 4.4507L11.5493 6.74205L4.79135 13.5H2.5Z"
                    />
                  </svg>
                  <p className='admin-page__radio-p'>
                    Редактор категорий
                  </p>
                </label>
              </div>

              <div className='admin-page__radio-container'>
                <input
                  type='radio' 
                  className='admin-page__radio-input'
                  id='admin-page__radio-input-rate-type' 
                  name='admin-menu'
                />
                <label
                  className='admin-page__radio-label' 
                  htmlFor='admin-page__radio-input-rate-type'
                  onClick={() => {changePage('rate-type')}}
                >
                  <svg
                    className='admin-page__radio-svg-list'
                    viewBox="0 0 13 10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.5 0.5V1.85714H5.83333V0.5H0.5ZM5.83333 4.57142H0.5V3.21428H5.83333V4.57142ZM0.5 7.28572H5.83333V5.92857H0.5V7.28572ZM0.5 10H5.83333V8.64285H0.5V10ZM12.5 0.5H7.16663V10H12.5V0.5Z"
                    />
                  </svg>
                  <p className='admin-page__radio-p'>
                    Список типов тарифов
                  </p>
                </label>
              </div>

              <div className='admin-page__radio-container'>
                <input
                  type='radio' 
                  className='admin-page__radio-input'
                  id='admin-page__radio-input-rate-type-editor'
                  name='admin-menu'
                />
                <label
                  className='admin-page__radio-label' 
                  htmlFor='admin-page__radio-input-rate-type-editor'
                  onClick={() => {changePage('rate-type/new')}}
                >
                  <svg
                    className='admin-page__radio-svg-list'
                    viewBox="0 0 15 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.3213 4.10853C13.5596 4.34683 13.5596 4.73177 13.3213 4.97007L12.2031 6.08825L9.91174 3.7969L11.0299 2.67873C11.2682 2.44042 11.6532 2.44042 11.8915 2.67873L13.3213 4.10853ZM2.5 13.5V11.2086L9.25795 4.4507L11.5493 6.74205L4.79135 13.5H2.5Z"
                    />
                  </svg>
                  <p className='admin-page__radio-p'>
                    Редактор типов тарифов
                  </p>
                </label>
              </div>

              <div className='admin-page__radio-container'>
                <input
                  type='radio' 
                  className='admin-page__radio-input'
                  id='admin-page__radio-input-rate' 
                  name='admin-menu'
                />
                <label
                  className='admin-page__radio-label' 
                  htmlFor='admin-page__radio-input-rate'
                  onClick={() => {changePage('rate')}}
                >
                  <svg
                    className='admin-page__radio-svg-list'
                    viewBox="0 0 13 10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.5 0.5V1.85714H5.83333V0.5H0.5ZM5.83333 4.57142H0.5V3.21428H5.83333V4.57142ZM0.5 7.28572H5.83333V5.92857H0.5V7.28572ZM0.5 10H5.83333V8.64285H0.5V10ZM12.5 0.5H7.16663V10H12.5V0.5Z"
                    />
                  </svg>
                  <p className='admin-page__radio-p'>
                    Список тарифов
                  </p>
                </label>
              </div>

              <div className='admin-page__radio-container'>
                <input
                  type='radio' 
                  className='admin-page__radio-input'
                  id='admin-page__radio-input-rate-editor'
                  name='admin-menu'
                />
                <label
                  className='admin-page__radio-label' 
                  htmlFor='admin-page__radio-input-rate-editor'
                  onClick={() => {changePage('rate/new')}}
                >
                  <svg
                    className='admin-page__radio-svg-list'
                    viewBox="0 0 15 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.3213 4.10853C13.5596 4.34683 13.5596 4.73177 13.3213 4.97007L12.2031 6.08825L9.91174 3.7969L11.0299 2.67873C11.2682 2.44042 11.6532 2.44042 11.8915 2.67873L13.3213 4.10853ZM2.5 13.5V11.2086L9.25795 4.4507L11.5493 6.74205L4.79135 13.5H2.5Z"
                    />
                  </svg>
                  <p className='admin-page__radio-p'>
                    Редактор тарифов
                  </p>
                </label>
              </div>

              <div className='admin-page__radio-container'>
                <input
                  type='radio' 
                  className='admin-page__radio-input'
                  id='admin-page__radio-input-city' 
                  name='admin-menu'
                />
                <label
                  className='admin-page__radio-label' 
                  htmlFor='admin-page__radio-input-city'
                  onClick={() => {changePage('city')}}
                >
                  <svg
                    className='admin-page__radio-svg-list'
                    viewBox="0 0 13 10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.5 0.5V1.85714H5.83333V0.5H0.5ZM5.83333 4.57142H0.5V3.21428H5.83333V4.57142ZM0.5 7.28572H5.83333V5.92857H0.5V7.28572ZM0.5 10H5.83333V8.64285H0.5V10ZM12.5 0.5H7.16663V10H12.5V0.5Z"
                    />
                  </svg>
                  <p className='admin-page__radio-p'>
                    Список городов
                  </p>
                </label>
              </div>

              <div className='admin-page__radio-container'>
                <input
                  type='radio' 
                  className='admin-page__radio-input'
                  id='admin-page__radio-input-city-editor'
                  name='admin-menu'
                />
                <label
                  className='admin-page__radio-label' 
                  htmlFor='admin-page__radio-input-city-editor'
                  onClick={() => {changePage('city/new')}}
                >
                  <svg
                    className='admin-page__radio-svg-list'
                    viewBox="0 0 15 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.3213 4.10853C13.5596 4.34683 13.5596 4.73177 13.3213 4.97007L12.2031 6.08825L9.91174 3.7969L11.0299 2.67873C11.2682 2.44042 11.6532 2.44042 11.8915 2.67873L13.3213 4.10853ZM2.5 13.5V11.2086L9.25795 4.4507L11.5493 6.74205L4.79135 13.5H2.5Z"
                    />
                  </svg>
                  <p className='admin-page__radio-p'>
                    Редактор городов
                  </p>
                </label>
              </div>

              <div className='admin-page__radio-container'>
                <input
                  type='radio' 
                  className='admin-page__radio-input'
                  id='admin-page__radio-input-point' 
                  name='admin-menu'
                />
                <label
                  className='admin-page__radio-label' 
                  htmlFor='admin-page__radio-input-point'
                  onClick={() => {changePage('point')}}
                >
                  <svg
                    className='admin-page__radio-svg-list'
                    viewBox="0 0 13 10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.5 0.5V1.85714H5.83333V0.5H0.5ZM5.83333 4.57142H0.5V3.21428H5.83333V4.57142ZM0.5 7.28572H5.83333V5.92857H0.5V7.28572ZM0.5 10H5.83333V8.64285H0.5V10ZM12.5 0.5H7.16663V10H12.5V0.5Z"
                    />
                  </svg>
                  <p className='admin-page__radio-p'>
                    Список пунктов
                  </p>
                </label>
              </div>

              <div className='admin-page__radio-container'>
                <input
                  type='radio' 
                  className='admin-page__radio-input'
                  id='admin-page__radio-input-point-editor'
                  name='admin-menu'
                />
                <label
                  className='admin-page__radio-label' 
                  htmlFor='admin-page__radio-input-point-editor'
                  onClick={() => {changePage('point/new')}}
                >
                  <svg
                    className='admin-page__radio-svg-list'
                    viewBox="0 0 15 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.3213 4.10853C13.5596 4.34683 13.5596 4.73177 13.3213 4.97007L12.2031 6.08825L9.91174 3.7969L11.0299 2.67873C11.2682 2.44042 11.6532 2.44042 11.8915 2.67873L13.3213 4.10853ZM2.5 13.5V11.2086L9.25795 4.4507L11.5493 6.74205L4.79135 13.5H2.5Z"
                    />
                  </svg>
                  <p className='admin-page__radio-p'>
                    Редактор пунктов
                  </p>
                </label>
              </div>

              <div className='admin-page__radio-container'>
                <input
                  type='radio' 
                  className='admin-page__radio-input'
                  id='admin-page__radio-input-order-status' 
                  name='admin-menu'
                />
                <label
                  className='admin-page__radio-label' 
                  htmlFor='admin-page__radio-input-order-status'
                  onClick={() => {changePage('order-status')}}
                >
                  <svg
                    className='admin-page__radio-svg-list'
                    viewBox="0 0 13 10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.5 0.5V1.85714H5.83333V0.5H0.5ZM5.83333 4.57142H0.5V3.21428H5.83333V4.57142ZM0.5 7.28572H5.83333V5.92857H0.5V7.28572ZM0.5 10H5.83333V8.64285H0.5V10ZM12.5 0.5H7.16663V10H12.5V0.5Z"
                    />
                  </svg>
                  <p className='admin-page__radio-p'>
                    Список статусов заказов
                  </p>
                </label>
              </div>

              <div className='admin-page__radio-container'>
                <input
                  type='radio' 
                  className='admin-page__radio-input'
                  id='admin-page__radio-input-order-status-editor'
                  name='admin-menu'
                />
                <label
                  className='admin-page__radio-label' 
                  htmlFor='admin-page__radio-input-order-status-editor'
                  onClick={() => {changePage('order-status/new')}}
                >
                  <svg
                    className='admin-page__radio-svg-list'
                    viewBox="0 0 15 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.3213 4.10853C13.5596 4.34683 13.5596 4.73177 13.3213 4.97007L12.2031 6.08825L9.91174 3.7969L11.0299 2.67873C11.2682 2.44042 11.6532 2.44042 11.8915 2.67873L13.3213 4.10853ZM2.5 13.5V11.2086L9.25795 4.4507L11.5493 6.74205L4.79135 13.5H2.5Z"
                    />
                  </svg>
                  <p className='admin-page__radio-p'>
                    Редактор статуса заказа
                  </p>
                </label>
              </div>
            </SimpleBar>
          </div>

          <button
            className='admin-page__button-menu'
            onClick={() => setHideMenu(!hideMenu)}
          >
            <LineBurger/>
            <LineBurger/>
            <LineBurger/>
          </button>
        </div>
        
        <div className='admin-page__content-container'>
          <div className='admin-page__header'>
            <div className='admin-page__header-search'>
  
            </div>
            <div className='admin-page__header-bell'>
              <Bell/>
            </div>
            <div className='dmin-page__header-user-wrapped'>
              <div 
                className='admin-page__header-user' 
                onClick={() => setProfileBarState(!profileBarState)}
              >
                <img
                  className='admin-page__header-avatar' 
                  src={require('../media/avatar.png')}
                />
                <div  
                  className='admin-page__header-user-name'
                >
                  Admin
                </div>
                <svg
                  className={arrowClass}
                  width={9}
                  height={5}
                  viewBox="0 0 9 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0.5L4.25 5L8.5 0.5H0Z" fill="#ABB6BF" />
                </svg>
              </div>
              <div className={headerBarClass}>
                <div 
                  onClick={exitCallback}
                  className='admin-page__header-bar-container'
                >
                  <svg
                    className='admin-page__header-bar-svg'
                    height={15}
                    viewBox="0 0 533.333 533.333"
                    style={{ enableBackground: "new 0 0 533.333 533.333" }}
                    xmlSpace="preserve"
                  >
                    <path d="M416.667,333.333v-66.666H250V200h166.667v-66.667l100,100L416.667,333.333z M383.333,300v133.333H216.667v100l-200-100V0h366.667v166.667H350V33.333H83.333L216.667,100v300H350V300H383.333z" />
                  </svg>
                  Выход из профиля
                </div>
              </div>
            </div>
          </div>
          <Outlet/>
          <div className='admin-page__footer'>
            <div>
              <Link 
                to='/' 
                className='admin-page__footer-link'
              >
                Главная страница
              </Link>  
            </div>
            <p className='admin-page__footer-info'>
              Copyright © 2020 
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>

      </div>
    );
  }; 
};

const putStateToProps = (state) => {
  return {...state};
};

const putActionToProps = (dispatch) => {
  return {
    changeLogin: bindActionCreators(changeLogin, dispatch),
  };
};

export default connect(putStateToProps, putActionToProps)(AdminPage);

