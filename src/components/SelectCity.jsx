import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCityAutocomplete } from '../store/actions';
import { changeCity } from '../store/actions';
import { changePoint } from '../store/actions';

function Selectcity(props) {
  const data = props.data;

  const { 
    cityAutocomplete, 
    changeCityAutocomplete,
    changeCity,
    city,
    changePoint,
  } = props;
  
  function changeSelectActive(newValue) {
    let select = document.getElementById('select-city__bar')
    if (newValue) {
      select.classList.add('select__list_active')
    } else {
      select.classList.remove('select__list_active');
    };
  };

  function changeSelectValue(newValue) {
    let input = document.getElementById('input-city');
    input.value = newValue;
  };

  function changeSelectValuPoint(newValue) {
    let input = document.getElementById('input-point');
    input.value = newValue;
    changePoint(newValue);
  };

  async function changeAutocomplete() {
    const dataAwait = await data;
    const strSearch = document.getElementById("input-city").value;
    let pattern = new RegExp('\_' + strSearch, 'i');
    let newAutocomplete = [];

    for (let item in dataAwait){
      const dataItem = dataAwait[item];
  
      if (pattern.test('_' + dataItem.name)){
        let newItem = 
            <button 
              key={dataItem.id}
              className='select__item'
              onClick={() => {
                changeSelectValue(dataItem.name);
                checkCross();
                changeSelectValuPoint('');
                checkCrossPoint();
                changeCity(dataItem.name)
              }}
            >
              {dataItem.name}
            </button>
        newAutocomplete.push(newItem);
      };

    };
    changeCityAutocomplete(newAutocomplete);
  };

  function checkCross() {
    let input = document.getElementById('input-city');
    let cross = document.getElementById('select__cross-city');
    if (input.value == '') {
      cross.classList.add('select__cross_off');
    } else {
      cross.classList.remove('select__cross_off');
    };
  };

  function checkCrossPoint() {
    let input = document.getElementById('input-point');
    let cross = document.getElementById('select__cross-point');
    if (input.value == '') {
      cross.classList.add('select__cross_off');
    } else {
      cross.classList.remove('select__cross_off');
    };
  };

// --------------------------------------------------------

  

  useEffect(() => {
    let input = document.getElementById('input-city');
    input.addEventListener('input', () => {
      changeSelectActive(true);
      checkCross();
      changeAutocomplete();
      changeCity(input.value);
      changeSelectValuPoint('');
      checkCrossPoint();
    });
    input.addEventListener('focus', () => {
      changeSelectActive(true);
      changeAutocomplete();
    });
    document.addEventListener('click', ({target}) => {
      let targetSelect = document.getElementById('input-city');
  
      if (targetSelect !== target) {
        try {
          let select = document.getElementById('select-city__bar');
            select.classList.remove('select__list_active');
        } catch {};
      };  
    }); 
    checkCross();
  }, []);

  return ( 
    <div className='select'>
      <div 
        className='select__input-wrapped'
        id='select__input-wrapped'
      >
        <input 
          type="text" 
          className="select__input"
          id="input-city"
          placeholder="Начните вводить город..."
          defaultValue={city}
        />
        <svg
          className='select__cross select__cross_off'
          id='select__cross-city'
          width={8}
          height={8}
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            changeSelectValue('');
            checkCross();
            changeAutocomplete();
            changeSelectValuPoint('');
            checkCrossPoint();
            changeCity('');
          }}
        >
          <path
            d="M8 0.805714L7.19429 0L4 3.19429L0.805714 0L0 0.805714L3.19429 4L0 7.19429L0.805714 8L4 4.80571L7.19429 8L8 7.19429L4.80571 4L8 0.805714Z"
            fill="#121212"
          />
        </svg>
      </div>
      <div className='select__list' >
        <SimpleBar
          key='s1' 
          className='select__bar'
          id='select-city__bar'
          autoHide = { false }
        > 
          {cityAutocomplete}
        </SimpleBar>
      </div>
    </div>
  );
};

const putStateToProps = (state) => {
  return {
    cityAutocomplete: state.cityAutocomplete,
    city: state.city,
  };
};

const putActionToProps = (dispatch) => {
  return {
    changeCityAutocomplete: bindActionCreators(changeCityAutocomplete, dispatch),
    changeCity: bindActionCreators(changeCity, dispatch),
    changePoint: bindActionCreators(changePoint, dispatch),
  };
};

const WrappedSelectCityComponent = connect(putStateToProps, putActionToProps)(Selectcity);

export default connect(putStateToProps, putActionToProps)(WrappedSelectCityComponent);