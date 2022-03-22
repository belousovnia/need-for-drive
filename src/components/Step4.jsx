import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


function Step4(props) {
  const { orderData } = props;
  
  if (orderData.car === undefined) window.location = '#/order/step-1'; 

  return ( 
    <div className='step-4'> 
      <div className='step-4__data-car-block'>
        <div className='step-4__information'>
          <h1 className='step-4__information-title'>
            {}
          </h1>
          <p className='step-4__information-number'>
            {}
          </p>
        </div>
        <img
          className='step-4_car-img' 
          src={orderData.car.imagePath}
          onError={(i) => {
            i.target.src = require('../media/car.jpg')
          }}
        />
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

const WrappedStep4Component 
  = connect(putStateToProps, putActionToProps)(Step4);

export default connect(putStateToProps, putActionToProps)(WrappedStep4Component);