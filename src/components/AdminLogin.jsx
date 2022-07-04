import { React, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postLogin } from './dataFunction/dataAdminLogin';
import AdminLogo from './AdminLogo';
import { changeLogin } from '../store/actions';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

function AdminLogin(props) {
  const {
    changeLogin,
  } = props;

  const navigate = useNavigate();

  const [errorLogin, setErrorLogin] = useState(false);

  async function authorization() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    const response = await postLogin(email, password);

    if (response) {
      if (response.status == 200){
        changeLogin(response);
        setErrorLogin(false);
        navigate('/admin/order');
      } else {
        setErrorLogin(true);
      };
    } else {
      setErrorLogin(true);
    };
  };

  // ------------------------------------------------------

  const inputClass = classNames({
    'admin-login__input': true,
    'admin-login__input_error': errorLogin,
  });

  const errorClass = classNames({
    'admin-login__error': true,
    'admin-login__error_off': !errorLogin, 
  });

  return ( 
    <div className='admin-login'>
      <AdminLogo/>
      <div className='admin-login__main-container'>
        <p className='admin-login__title'>
          Вход
        </p>
        <p className='admin-login__title-input'>
          Почта
        </p>
        <input 
          type="email" 
          className={inputClass}
          id='email'
        />
        <p className='admin-login__title-input'>
          Пароль
        </p>
        <input 
          type="password" 
          className={inputClass}
          id='password'
        />
        <p className={errorClass}>
          Ошибка авторизации, неверный логин или пароль!
        </p>
        <div className='admin-login__dutton-container'>
          <p className='admin-login__link-register' >Запросить доступ</p>
          <button 
            className='admin-button'
            onClick={authorization}
          >
            <p className='admin-button__title'>Войти</p>
          </button>
        </div>
      </div>
    </div>
  );
};

const putStateToProps = (state) => {
  return {...state};
};

const putActionToProps = (dispatch) => {
  return {
    changeLogin: bindActionCreators(changeLogin, dispatch),
  };
};

export default connect(putStateToProps, putActionToProps)(AdminLogin);

