import React from 'react';
import { Link } from 'react-router-dom';
import Arrow from './svg/Arrow';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function StepLine(props) {
  const {step} = props;

  function link(num) {
    if (step >= num) {
      return 'stage-line__link_active';
    };
  };

  return ( 
    <div className='stage-line'>
      <div className='stage-line__content'>
        <Link 
          to='/order/step-1' 
          className={`stage-line__link ${link(1)}`}
        >
          Местоположение
        </Link>
        <div className='stage-line__link-wrapped'>
          <Arrow/>
          <Link 
            to='/order/step-2' 
            className={`stage-line__link ${link(2)}`}
          >
            Модель
          </Link>
        </div>
        <div className='stage-line__link-wrapped'>
          <Arrow/>
          <Link 
            to='/order/step-3' 
            className={`stage-line__link ${link(3)}`}
          >
            Дополнительно
          </Link>
        </div>
        <div className='stage-line__link-wrapped'>
          <Arrow/>
          <Link 
            to='/order/step-4' 
            className={`stage-line__link ${link(4)}`}
          >
            Итого
          </Link>
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

const WrappedStepLineComponent 
  = connect(putStateToProps, putActionToProps)(StepLine);

export default connect(putStateToProps, putActionToProps)(WrappedStepLineComponent);