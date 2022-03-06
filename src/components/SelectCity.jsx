import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCityAutocomplete } from '../store/actions';

function Selectcity(props) {
  const { cityAutocomplete, changeCityAutocomplete } = props;
  const data = props.data;
  
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
  };

  async function changeAutocomplete() {
    const strSearch = document.getElementById("input-city").value;
    let pattern = new RegExp('\_' + strSearch, 'i');
    let newAutocomplete = [];

    data.then((i) => {
      for (let item in i){
        const dataItem = i[item];
    
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
                }}
              >
                {dataItem.name}
              </button>
          newAutocomplete.push(newItem);
        };

      };
      changeCityAutocomplete(newAutocomplete);
    });
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

  document.addEventListener('click', (e) => {
    let targetSelect = document.getElementById('input-city');
    let target = e.target;

    if (targetSelect !== target) {
      let select = document.getElementById('select-city__bar');
      select.classList.remove('select__list_active');
    };  
  });

  useEffect(() => {
    let input = document.getElementById('input-city');
    input.addEventListener('input', () => {
      changeSelectActive(true);
      checkCross();
      changeAutocomplete();
      changeSelectValuPoint('');
      checkCrossPoint();
    });
    input.addEventListener('focus', () => {
      changeSelectActive(true);
      changeAutocomplete();
    });
    
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
          defaultValue={''}
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
  };
};

const putActionToProps = (dispatch) => {
  return {
    changeCityAutocomplete: bindActionCreators(changeCityAutocomplete, dispatch),
  };
};

const WrappedSelectCityComponent = connect(putStateToProps, putActionToProps)(Selectcity);

export default connect(putStateToProps, putActionToProps)(WrappedSelectCityComponent);