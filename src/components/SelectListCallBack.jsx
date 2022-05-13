import { React, useState, useEffect } from 'react';
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';

function SelectListCallBack(props) {
  const {
    listValue,
    collBack,
    placeholder,
    id,
    defaultValue,
    classNameProps
  } = props

  const newDefaultValue = defaultValue === undefined? ['', null] : defaultValue;

  const [active, setActive] = useState(true);

  // ------------------------------------------------------

  function buttonCallbeck(dataItem) {
    document.getElementById(id).value = dataItem[0];
    collBack(dataItem[1]);
  };

  // ------------------------------------------------------
  
  function buildList() {
    let count = 1;
    let list = [
      <button
        key={'select-list-0'} 
        className='selection-list__item'
        onClick={() => buttonCallbeck(['', null])}
      >
        {'-'}
      </button>
    ];
    listValue.forEach((i) => {
      list.push(
      <button
        key={`select-list-${count}`} 
        className='selection-list__item'
        onClick={() => buttonCallbeck(i)}
      >
        {i[0]}
      </button>
      )
      count = count + 1;
    })
    return list
  };

  // ------------------------------------------------------

  const barWrappedClass = classNames({
    'selection-list__bar': true,
    'selection-list__bar-wrapped': true,
    'selection-list__bar-wrapped_off': active,
  });

  const arrowClass = classNames({
    'selection-list__arrow': true,
    'selection-list__arrow-flip': !active,
  });

  const selectionListClass = classNames({
    'selection-list': true,
    ...classNameProps
  });

  // ------------------------------------------------------

  useEffect(() => {
    document.addEventListener('click', ({target}) => {
      let targetSelect = document.getElementById(`selection-list__input-mask_${id}`);
  
      if (targetSelect !== target) {
        setActive(true);
      };
    });
  },[]);
  useEffect(() => {
    buttonCallbeck(newDefaultValue);
  }, [defaultValue]);


  return ( 
    <div className={selectionListClass}>
      <div className='selection-list__content'>
        <div 
          className='selection-list__input-wrapper'
        > 
          <div 
            className='selection-list__input-mask'
            id={`selection-list__input-mask_${id}`}
            onClick={() =>{
              setActive(!active)
            }}
          />
          <input 
            type="text" 
            className='selection-list__input'
            id={id}
            readOnly
            disabled
            placeholder={placeholder}
          />
          <svg
            className={arrowClass}
            width={9}
            height={5}
            viewBox="0 0 9 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0.5L4.25 5L8.5 0.5H0Z" fill="#ABB6BF" />
          </svg>
        </div>
          <SimpleBar 
            className={barWrappedClass}
            autoHide = { false }
            id='selection-list__bar'
          >
            {buildList()}
          </SimpleBar>
      </div>
    </div>
  );
};

export default SelectListCallBack;