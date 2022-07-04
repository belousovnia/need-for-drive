import { React, useState, useEffect } from 'react';
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';

function SelectList(props) {
  const {
    listValue,
    placeholder,
    id,
  } = props

  const [active, setActive] = useState(true);
  const [value, setValue] = useState('');

  // ------------------------------------------------------
  
  function buildList() {
    let count = 1;
    let list = [
      <button
        key={'select-list-0'} 
        className='selection-list__item'
        onClick={() => setValue('')}
      >
        {'-'}
      </button>
    ];
    listValue.forEach((i) => {
      list.push(
      <button
        key={`select-list-${count}`} 
        className='selection-list__item'
        onClick={() => setValue(i)}
      >
        {i}
      </button>
      )
      count = count + 1;
    })
    return list
  };

  // ------------------------------------------------------

  const barClass = classNames({
    'selection-list__bar': true,
    'selection-list__bar_off': active,
  });

  const arrowClass = classNames({
    'selection-list__arrow': true,
    'selection-list__arrow-flip': !active,
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

  return ( 
    <div className='selection-list'>
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
            value={value}
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
          className={barClass}
          autoHide = { false }
          id='selection-list__bar'
        >
          {buildList()}
        </SimpleBar>
      </div>
    </div>
  );
}

export default SelectList;