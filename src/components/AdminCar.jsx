import { React, useEffect, useState } from 'react';
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';

function AdminCar() {

  const [ filterHide, setFilterHide ] = useState(true);

  // ------------------------------------------------------

  const selectorContainerClass = classNames({
    'admin-page__selector-container': true,
    'admin-page__selector-container_hide': filterHide,
  });

  // ------------------------------------------------------

  

  // ------------------------------------------------------

  return (
    <div className='admin-page-table'>
      <p className='admin-page__main-title'>
        Список автомобилей 
      </p>
      <div className='admin-page__main-window'>
        <div className='admin-page__main-window-header'>
          <div className={selectorContainerClass}>
            {/* <SelectListCallBack
              listValue={listCity}
              collBack={setSity}
              placeholder='город'
              id='admin-page-list__filter-city'
            /> */}
          </div>
          <button 
            className='admin-button'
            // onClick={changeFilter}
          >Фильтр</button>
        </div>

        <div className='admin-page__main-window-content'>
          <SimpleBar 
            className='admin-page__simple-bar'
            autoHide = { false }
          >
            {/* {listData} */}
          </SimpleBar>
        </div>

      </div>
    </div>
  );
};

export default AdminCar;