import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeSlider } from '../store/actions';

function Slider(props) {
  const { slider, changeSlider } = props;

  function sliderCardModifier() {
    switch (slider) {
      case 1:
        return 'slider__tape_1'
      case 2:
        return 'slider__tape_2'
      case 3:
        return 'slider__tape_3'
      case 4:
        return 'slider__tape_4'
    };
  };

  function sliderColorButton() {

    switch (slider) {
      case 1:
        return 'slider__button-arrow_green'
      case 2:
        return 'slider__button-arrow_blue'
      case 3:
        return 'slider__button-arrow_red'
      case 4:
        return 'slider__button-arrow_purple'
    };
  };

  useEffect(() => {
    let a1 = document.getElementById(`radioButton${slider}`);
    a1.checked = true;
  },[slider]);

  return ( 
    <div className='slider'>
      <button 
        className={`slider__button-arrow ${sliderColorButton()}`}
        onClick={() => changeSlider(props.slider-1)}
      >
        <svg
          className='slider__arrow'
          viewBox="0 0 10 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 1L1 10L9 19"
            stroke="#EEEEEE"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        className={`slider__button-arrow slider__button-rigth ${sliderColorButton()}`}
        onClick={() => changeSlider(props.slider+1)}
      >
        <svg
          className='slider__arrow'
          viewBox="0 0 10 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L9 10L1 19"
            stroke="#EEEEEE"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className='slider__wrapped-radio'>
        <input 
          type='radio' 
          id='radioButton1' 
          className='slider__radio-button'
          name='slider'
          defaultChecked
        />
        <label  
          className='slider__radio-label' 
          htmlFor='radioButton1'
          onClick={() => changeSlider(1)}
        />
        
        <input 
          type='radio' 
          id='radioButton2' 
          className='slider__radio-button'
          name='slider'
        />
        <label  
          className='slider__radio-label' 
          htmlFor='radioButton2'
          onClick={() => changeSlider(2)}
        />
          
        <input 
          type='radio' 
          id='radioButton3' 
          className='slider__radio-button'
          name='slider'
        />
        <label 
          className='slider__radio-label' 
          htmlFor='radioButton3'
          onClick={() => changeSlider(3)}
        />
          
        <input 
          type='radio' 
          id='radioButton4' 
          className='slider__radio-button'
          name='slider'
        />
        <label  
          className='slider__radio-label' 
          htmlFor='radioButton4'
          onClick={() => changeSlider(4)}
        />
          
      </div>

      <div className={`slider__tape ${sliderCardModifier()}`} >
        <div className='slider__card slider__card_1' >
          <div className='slider__card-blackout'>
            <div className='slider__content'>
              <h1 className='slider__title'>Бесплатная парковка</h1>
              <p className='slider__text'>
                Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах
              </p>
              <button className='main-button main-button_green'>
                <p className='main-button__title'>
                  Подробнее
                </p>
              </button>
            </div>
          </div>
        </div>

        <div className='slider__card slider__card_2' >
          <div className='slider__card-blackout'>
            <div className='slider__content'>
              <h1 className='slider__title'>Страховка</h1>
              <p className='slider__text'>
                Полная страховка автомобиля
              </p>
              <button className='main-button main-button_blue'>
                <p className='main-button__title'>
                  Подробнее
                </p>
              </button>
            </div>
          </div>
        </div>

        <div className='slider__card slider__card_3' >
          <div className='slider__card-blackout'>
            <div className='slider__content'>
              <h1 className='slider__title'>Бензин</h1>
              <p className='slider__text'>
                Полный бак на любой заправке города за наш счет
              </p>
              <button className='main-button main-button_red'>
                <p className='main-button__title'>
                  Подробнее
                </p>
              </button>
            </div>
          </div>
        </div>

        <div className='slider__card slider__card_4' >
          <div className='slider__card-blackout'>
            <div className='slider__content'>
              <h1 className='slider__title'>Обслуживание</h1>
              <p className='slider__text'>
                Автомобиль проходит еженедельное ТО
              </p>
              <button className='main-button main-button_purple'>
                <p className='main-button__title'>
                  Подробнее
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

const putStateToProps = (state) => {
  return {
    slider: state.slider,
  };
};

const putActionToProps = (dispatch) => {
  return {
    changeSlider: bindActionCreators(changeSlider, dispatch),
  };
};

const WrappedSliderComponent 
  = connect(putStateToProps, putActionToProps)(Slider);

export default connect(putStateToProps, putActionToProps)(WrappedSliderComponent);