import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function AdminError(props) {
  const navigate = useNavigate();
  let { errorCode } = useParams();

  let stepBeck;
  
  // --------------------------------------------------------

  let info = '';
  if (errorCode === '404') {
    info = 'Cтраница не найдена убедитесь что адрес введен верно';
    stepBeck = -2;
  } else if (errorCode === '500') {
    info = 'Попробуйте перезагрузить страницу';
    stepBeck = -2;
  } else {
    info = 'Cтраница не найдена убедитесь что адрес введен верно'
    stepBeck = -1;
  };

  if (!errorCode) {
    errorCode = 404;
    stepBeck = -1;
  };

  // --------------------------------------------------------



  // --------------------------------------------------------

  return (
    <div className='admin-page-table admin-page-table_error'>
      <div className='admin-page-error__container'>
        <p className='admin-page-error__title-code'>
          {errorCode}
        </p>
        <p className='admin-page-error__title'>
          Что то пошло не так
        </p>
        <p className='admin-page-error__p'>
          {info}
        </p>
        <button 
          className='admin-button admin-page-error__admin-button'
          onClick={() => {navigate(stepBeck)}}
        >
          Назад
        </button>
      </div>
    </div>
  );
}

export default AdminError;