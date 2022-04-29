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
    try {
      switch (location) {
        case '/admin/order':
          document.getElementById('admin-page__radio-input-order').checked = true;
          break;
        case '/admin/car':
          document.getElementById('admin-page__radio-input-car').checked = true;
          break;
      };
    } catch {}
    console.log(location);
  };

  function changePage(type) {
    switch (type) {
      case 'order':
        navigate('order');
        break;
      case 'car':
        navigate('car');
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
    if (!checkLogin()) {
      checkLocation();
    };
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
              Copyright © 2020 Simbirsoft
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

