import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeOrderInformation } from '../store/actions';


function Step4(props) {
  const { orderData, orderInformation } = props;

  changeOrderInformation(orderInformation + 1)
  
  return ( 
    <div className='step-4'>
      <button onClick={ () => {
        changeOrderInformation(orderInformation + 1)
        console.log(orderInformation)
      }}>
        колобарация
      </button>
    </div>
  );
};

const putStateToProps = (state) => {
  return {...state};
};

const putActionToProps = (dispatch) => {
  return {
    changeOrderInformation: bindActionCreators(changeOrderInformation, dispatch),
  };
};


export default connect(putStateToProps, putActionToProps)(Step4);

 
      {/* <div className='step-4__data-car-block'>
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
      </div> */}