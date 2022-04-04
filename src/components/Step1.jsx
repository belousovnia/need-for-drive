import { React, useEffect, useMemo } from 'react';
import SelectCity from './SelectCity';
import { getCityPoint } from './dataFunction/dataStep1';
import SelectPoint from './SelectPoint';
import MyMap from './MyMap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeListFinalPoint } from '../store/actions';

function Step1({changeListFinalPoint}) {
  const dataStep1 = useMemo(getCityPoint, []); 
  dataStep1.then((data) => changeListFinalPoint(data));


  return ( 
    <div className='step-1'> 
      <div className='step-1__items-block'>
        <div className='step-1__items-city'>
          <p className='step-1__items-p'>Город</p>
          <SelectCity data = {dataStep1}/>
        </div>
        <div className='step-1__items-point'>
          <p className='step-1__items-p step-1__items-p_point'>Пункт выдачи</p>
          <SelectPoint data = {dataStep1}/>
        </div>
      </div>
      <p className='step-1__items-p'>Выбрать на карте:</p>
      <MyMap data = {dataStep1}/>
    </div>
  );
};

const putStateToProps = (state) => {
  return {...state};
};

const putActionToProps = (dispatch) => {
  return {
    changeListFinalPoint: bindActionCreators(changeListFinalPoint, dispatch),
  };
};

const WrappedStep1Component 
  = connect(putStateToProps, putActionToProps)(Step1);

export default connect(putStateToProps, putActionToProps)(WrappedStep1Component);