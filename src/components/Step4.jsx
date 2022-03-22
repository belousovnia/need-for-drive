import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function Step4(props) {
  const { orderData } = props;

  console.log(orderData);

  return ( 
    <div className='step-4'> 
      <div className='step-4_data-car-block'>
        <div className='step-4_information'>
          <h1></h1>
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
  return {
    orderData: state.orderData,
  };
};

const putActionToProps = (dispatch) => {
  return {

  };
};

const WrappedStep4Component 
  = connect(putStateToProps, putActionToProps)(Step4);

export default connect(putStateToProps, putActionToProps)(WrappedStep4Component);