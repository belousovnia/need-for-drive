import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePointAutocomplete } from '../store/actions';
import { changePoint } from '../store/actions';

function SelectPoint(props) {
  const { 
    pointAutocomplete, 
    changePointAutocomplete, 
    changePoint,
    point,
  } = props;

  const data = props.data;
  
  function changeSelectActive(newValue) {
    let select = document.getElementById('select-point__bar')
    if (newValue) {
      select.classList.add('select__list_active')
    } else {
      select.classList.remove('select__list_active');
    };
  };

  function changeSelectValue(newValue) {
    let input = document.getElementById('input-point');
    input.value = newValue;
  };

  async function changeAutocomplete() {
    const strSearch = document.getElementById("input-point").value;
    let cityName = document.getElementById("input-city").value;
    let pattern = new RegExp(strSearch, 'i');
    let newAutocomplete = [];
    
    data.then((i) => {
      for (let city in i){
        if ( i[city].name.toUpperCase() == cityName.toUpperCase()){
          for (let item in i[city].points){
            const dataItem = i[city].points[item];
            if (pattern.test(dataItem.name)){
              let newItem = 
                  <button 
                    key={dataItem.id}
                    className='select__item'
                    onClick={() => {
                      changeSelectValue(dataItem.name);
                      checkCross();
                      changePoint(dataItem.name);
                    }}
                  >
                    {dataItem.name}
                  </button>
              newAutocomplete.push(newItem);
            };
          };
        };
      };
      changePointAutocomplete(newAutocomplete);
    });
  };

  function checkCross() {
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
    changeAutocomplete()
    let input = document.getElementById('input-point');
    input.addEventListener('input', () => {
      changeSelectActive(true);
      changeAutocomplete();
      checkCross();
      changePoint(input.value);
    });
    input.addEventListener('focus', () => {
      changeSelectActive(true);
      changeAutocomplete();
    });
    document.addEventListener('click', (e) => {
      let targetSelect = document.getElementById('input-point');
      let target = e.target;

      if (targetSelect !== target) {
        try {
          let select = document.getElementById('select-point__bar');
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
      >
        <input 
        type="text" 
        className="select__input"
        id="input-point"
        placeholder="Начните вводить пункт..."
        defaultValue={point}
      />
      <svg
        className='select__cross select__cross_off'
        id='select__cross-point'
        width={8}
        height={8}
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => {
          changeSelectValue('');
          checkCross();
          changePoint('');
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
          key='s2' 
          className='select__bar'
          id='select-point__bar'
          autoHide = { false }
        >
          {pointAutocomplete}
        </SimpleBar>
      </div>
    </div> 
  );
};

const putStateToProps = (state) => {
  return {
    pointAutocomplete: state.pointAutocomplete,
    point: state.point,
  };
};

const putActionToProps = (dispatch) => {
  return {
    changePointAutocomplete: bindActionCreators(changePointAutocomplete, dispatch),
    changePoint: bindActionCreators(changePoint, dispatch),
  };
};

const WrappedSelectPointComponent = connect(putStateToProps, putActionToProps)(SelectPoint);

export default connect(putStateToProps, putActionToProps)(WrappedSelectPointComponent);