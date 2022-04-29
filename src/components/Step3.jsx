import { React, useEffect, forwardRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeColor} from '../store/actions';
import { changeColorList } from '../store/actions';
import { changeStartDate } from '../store/actions';
import { changeEndDate } from '../store/actions';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import classNames from 'classnames';
import { getRate } from './dataFunction/dataStep3';
import { changeRate } from '../store/actions';
import { changeRateList } from '../store/actions';
import { changeFullTank } from '../store/actions';
import { changeChildChair } from '../store/actions';
import { changeRightWheel } from '../store/actions';

function Step3(props) {
  registerLocale('ru', ru);

  const {
    colorList,
    changeColorList,
    color,
    changeColor,
    orderData,
    changeStartDate,
    startDate,
    changeEndDate,
    endDate,
    changeRate,
    rate,
    changeRateList,
    rateList,
    changeFullTank,
    fullTank,
    changeChildChair,
    childChair,
    changeRightWheel,
    rightWheel,
    orderInformation
  } = props;

  function buildColorList() {
    let newColorList = [];
    let count = 0; 
    const data = orderData.car.colors; 

    for (let i in data) {
      let defaultInput;
      if (color == data[i]) {
        defaultInput =  
          <input
            type='radio' 
            className='radio-button__input'
            name='inputCategory'
            id={`color${count}`} 
            defaultChecked
          />
      } else {
        defaultInput =  
          <input
            type='radio' 
            className='radio-button__input'
            name='inputCategory'
            id={`color${count}`} 
          />
      };
      let newItem = 
        <div className='radio-button__container' key={`color${data[i]}${count}`}>
          {defaultInput}
          <label
            className='radio-button__label' 
            htmlFor={`color${count}`}
            onClick={() => changeColor(data[i])}
          >
            <div className='radio-button__point'/>
            <p className='radio-button__title'>{data[i]}</p>
          </label>
        </div>  
      count = count + 1;  
      newColorList.push(newItem);
    };
    changeColorList(newColorList)
  };


  function buildDateInput(date, setDate) {
    let placeholderClass = classNames({
      'step-3__placeholder': true,
      'step-3__placeholder_off': date != null,
    });

    let crossClass = classNames({
      'select__cross': true,
      'step-3__placeholder-cross_off': date == null,
    });

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
      <button 
        className="step-3__example-custom-input" 
        onClick={onClick} 
        ref={ref}
        placeholder="Введите дату и время"
      >
        {value}
      </button>
    ));
    return (
      <div className='step-3__date-input-wrapped'>
        <p className={placeholderClass}> Введите дату и время</p>
        <DatePicker
          selected={date}
          onChange={(i) => setDate(i)}
          customInput={<ExampleCustomInput />}
          locale="ru"
          showTimeSelect
          timeFormat="p"
          timeIntervals={15}
          dateFormat="Pp"
          placeholder="Введите дату и время"
        />
        <svg
          className={crossClass}
          id='select__cross-city'
          width={8}
          height={8}
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            setDate(null);
          }}
        >
          <path
            d="M8 0.805714L7.19429 0L4 3.19429L0.805714 0L0 0.805714L3.19429 4L0 7.19429L0.805714 8L4 4.80571L7.19429 8L8 7.19429L4.80571 4L8 0.805714Z"
            fill="#121212"
          />
        </svg>
      </div>
    ); 
  };


  async function buildRateList() {
    const data = await getRate();
    let rateList = [];
    let count = 0;

    for (let i in data) {
      let defaultInput;
      if (rate && rate.id == data[i].id) {
        defaultInput =  
          <input
            type='radio' 
            className='radio-button__input'
            name='inputRate'
            id={`rate${count}`} 
            defaultChecked
          />
      } else {
        defaultInput =  
          <input
            type='radio' 
            className='radio-button__input'
            name='inputRate'
            id={`rate${count}`} 
          />
      };
      let newItem = 
        <div className='radio-button__container' key={`rate${data[i]}${count}`}>
          {defaultInput}
          <label
            className='radio-button__label' 
            htmlFor={`rate${count}`}
            onClick={() => changeRate(data[i])}
          >
            <div className='radio-button__point'/>
            <p className='radio-button__title'>{data[i].rateTypeId.name}, {data[i].price}₽/{data[i].rateTypeId.unit}</p>
          </label>
        </div>  
      count = count + 1;  
      rateList.push(newItem);
    };
    changeRateList(rateList);
  };

  function checkAdditionalServices() {
    if (fullTank) {
      const element = document.getElementById('tank')
      element.checked = 1;
    };
    if (childChair) {
      const element = document.getElementById('childChair')
      element.checked = 1;
    };
    if (rightWheel) {
      const element = document.getElementById('rightWheel')
      element.checked = 1;
    };
  };

  // ------------------------------------------------------

  useEffect(() => {
    try {
      buildColorList()
    } catch {};
    buildRateList();
    checkAdditionalServices();
  }, []);

  return ( 
    <div className='step-3'>
      <p className='step-3__title'>Цвет</p> 
      <div className='step-3__color-container'>
        {colorList}
      </div>
      <p className='step-3__title'>Дата аренды</p>
      <div className='step-3__date-container'>
        <div className='step-3__data-container-line'>
          <p className='step-3__data-title'>C</p> {buildDateInput(startDate, changeStartDate)}
        </div>
        <div className='step-3__data-container-line'>
          <p className='step-3__data-title'>По</p> {buildDateInput(endDate, changeEndDate)}
        </div>
      </div>
      <p className='step-3__title'>Тариф</p>
      <div className='step-3__rate-container'>
        {rateList}
      </div>
      <p className='step-3__title'>Доп услуги</p>
      <div className='step-3__services-container'>
        <div className='radio-button__container'>
          <input
            type='checkbox' 
            className='radio-button__input'
            id='tank'
            onClick={() => {
              changeFullTank(!fullTank)
            }}
          />
          <label
            className='radio-button__label'
            htmlFor='tank'
          >
            <div className='checkbox-button__point'>
              <svg
                className='checkbox-button__check'
                viewBox="0 0 13 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.625 3.33333L0 5L4.875 10L13 1.66667L11.375 0L4.875 6.66667L1.625 3.33333Z"
                  fill="#121212"
                />
              </svg>
            </div>
            <p className='radio-button__title'>Полный бак, 500₽</p>
          </label>
        </div>

        <div className='radio-button__container'>
          <input
            type='checkbox' 
            className='radio-button__input'
            id='childChair'
            onChange={() => changeChildChair(!childChair)}
          />
          <label
            className='radio-button__label'
            htmlFor='childChair'
          >
            <div className='checkbox-button__point'>
              <svg
                className='checkbox-button__check'
                viewBox="0 0 13 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.625 3.33333L0 5L4.875 10L13 1.66667L11.375 0L4.875 6.66667L1.625 3.33333Z"
                  fill="#121212"
                />
              </svg>
            </div>
            <p className='radio-button__title'>Детское кресло, 200₽</p>
          </label>
        </div>

        <div className='radio-button__container'>
          <input
            type='checkbox' 
            className='radio-button__input'
            id='rightWheel'
            onChange={() => changeRightWheel(!rightWheel)}
          />
          <label
            className='radio-button__label'
            htmlFor='rightWheel'
          >
            <div className='checkbox-button__point'>
              <svg
                className='checkbox-button__check'
                viewBox="0 0 13 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.625 3.33333L0 5L4.875 10L13 1.66667L11.375 0L4.875 6.66667L1.625 3.33333Z"
                  fill="#121212"
                />
              </svg>
            </div>
            <p className='radio-button__title'>Правый руль, 1600₽</p>
          </label>
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
    changeColorList: bindActionCreators(changeColorList, dispatch),
    changeColor: bindActionCreators(changeColor, dispatch),
    changeStartDate: bindActionCreators(changeStartDate, dispatch),
    changeEndDate: bindActionCreators(changeEndDate, dispatch),
    changeRate: bindActionCreators(changeRate, dispatch),
    changeRateList: bindActionCreators(changeRateList, dispatch),
    changeFullTank: bindActionCreators(changeFullTank, dispatch),
    changeChildChair: bindActionCreators(changeChildChair, dispatch),
    changeRightWheel: bindActionCreators(changeRightWheel, dispatch),
  };
};

export default connect(putStateToProps, putActionToProps)(Step3);