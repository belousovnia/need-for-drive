import { React } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Arrow from './svg/Arrow';
import { connect } from 'react-redux';
import classNames from 'classnames';

function StepLine(props) {
  const {step} = props;
  
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

  function getLinkClass(num) {
    return classNames({
      'stage-line__link': true,
      'stage-line__link_active': step >= num,
      'stage-line__link_now': num == getLocation(),
    });
  };

  const linkContainerClass = classNames({
    'stage-line__link-container': true,
    'stage-line__link-container_off': getLocation() == 5,
  });

  const stageLineNumberClass = classNames({
    'stage-line__number': true,
    'stage-line__number_active': getLocation() == 5,
  });

  return ( 
    <div className='stage-line'>
      <div className='stage-line__content'>
        <p className={stageLineNumberClass}>Заказ номер {orderId}</p>
        <div className={linkContainerClass}>
          <Link 
            to='/order/step-1' 
            className={`stage-line__link ${getLinkClass(1)}`}
          >
            Местоположение
          </Link>
          <div className='stage-line__link-wrapped'>
            <Arrow/>
            <Link 
              to='/order/step-2' 
              className={`stage-line__link ${getLinkClass(2)}`}
            >
              Модель
            </Link>
          </div>
          <div className='stage-line__link-wrapped'>
            <Arrow/>
            <Link 
              to='/order/step-3' 
              className={`stage-line__link ${getLinkClass(3)}`}
            >
              Дополнительно
            </Link>
          </div>
          <div className='stage-line__link-wrapped'>
            <Arrow/>
            <Link 
              to='/order/step-4' 
              className={`stage-line__link ${getLinkClass(4)}`}
            >
              Итого
            </Link>
          </div>
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
  };
};

export default connect(putStateToProps, putActionToProps)(StepLine);