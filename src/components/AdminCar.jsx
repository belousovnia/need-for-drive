import { React, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';
import { getData, deleteSubject } from './dataFunction/generalFunction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import { deleteOrder } from './dataFunction/dataAdminOrder';

function AdminCar(props) {
  const { login } = props;
  
  const navigate = useNavigate();
  
  const [ filterHide, setFilterHide ] = useState(true);
  const [ mainData, setMainData ] = useState();
  const [ listCar, setListCar ] = useState();
  const [ update, setUpdate ] = useState();

  const countNewId = useRef(0)

  function getId() {
    countNewId.current++
    return countNewId.current
  };

  async function getDataCarList() {
    setListCar([<div className="loading loading_center" key="loading-3"/>]);
    const data = await getData('car');
    setMainData(data);
    console.log(data);
  };

  async function callBackDelete(id) {
    const question =  window.confirm(`Удалить заказ ${id}`);
    if (question) {
      await deleteSubject(login.data.access_token, id, 'car');
      setUpdate(id);
    };
  };

  async function buildCarList() {
    if (mainData) {
      const listCar = [];
      for (let i in mainData) {
        const item = mainData[i];
        const colors = [];
        item.colors.forEach(i => {
          colors.push(`${i}, `);
        });
        const tile = 
        <div className='admin-page-table__car' key={getId()}>
          <div className='admin-page-table__tile'>
            {item.name} 
          </div>
          <div className='admin-page-table__tile'>
            <img
              className='admin-page-table__car-img' 
              src={item.thumbnail.path}
              onError={(i) => {
                i.target.src = require('../media/car.jpg')
              }}
            /> 
          </div>
          <div className='admin-page-table__tile'>
            {item.categoryId.name}
          </div>
          <div className='admin-page-table__tile'>
            {colors}
          </div>
          <div className='admin-page-table__tile'>
            {item.number}
          </div>
          <div className='admin-page-table__tile'>
            {item.priceMin}
          </div>
          <div className='admin-page-table__tile'>
            {item.priceMax}
          </div>
          <div className='admin-page-table__tile'>
            {item.tank}
          </div>
          <div className='admin-page-table__tile'>
            {item.description}
          </div>

          <div className='admin-page-table__tile'>
            <div className='admin-page-tile__button-container admin-page-tile__button-container_table'>
              <button   
                className='admin-page-tile__button_cansel admin-page-tile__button admin-page-tile__button_table'
                onClick={() => callBackDelete(item.id)}
              >
                <svg
                  width={12}
                  height={12}
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.63858 3.205L7.97154 2.5L5.32704 5.295L2.68254 2.5L2.0155 3.205L4.66 6L2.0155 8.795L2.68254 9.5L5.32704 6.705L7.97154 9.5L8.63858 8.795L5.99408 6L8.63858 3.205Z"
                    fill="#C4183C"
                  />
                </svg>
                Удалить
              </button>
              <button 
                className='admin-page-tile__button_change admin-page-tile__button admin-page-tile__button_table'
                onClick={() => navigate(item.id)}
              >
                <svg
                  width={13}
                  height={12}
                  viewBox="0 0 13 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.32677 4C6.84715 4 7.27292 3.55 7.27292 3C7.27292 2.45 6.84715 2 6.32677 2C5.80638 2 5.38062 2.45 5.38062 3C5.38062 3.55 5.80638 4 6.32677 4ZM6.32677 5C5.80638 5 5.38062 5.45 5.38062 6C5.38062 6.55 5.80638 7 6.32677 7C6.84715 7 7.27292 6.55 7.27292 6C7.27292 5.45 6.84715 5 6.32677 5ZM5.38062 9C5.38062 8.45 5.80638 8 6.32677 8C6.84715 8 7.27292 8.45 7.27292 9C7.27292 9.55 6.84715 10 6.32677 10C5.80638 10 5.38062 9.55 5.38062 9Z"
                    fill="#818EA3"
                  />
                </svg>
                Изменить
              </button>
            </div>
          </div>
        </div>
        listCar.push(tile)
      };
      setListCar(listCar);
    };
  };

  // ------------------------------------------------------

  const selectorContainerClass = classNames({
    'admin-page__selector-container': true,
    'admin-page__selector-container_hide': filterHide,
  });

  // ------------------------------------------------------

  useEffect(getDataCarList, [update]);
  useEffect(buildCarList, [mainData]);

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
          <div className='admin-page-table__car admin-page-table__car_name'>
            <div className='admin-page-table__tile'>
              <b>Модель</b> 
            </div>
            <div className='admin-page-table__tile'>
              <b>Изображение</b> 
            </div>
            <div className='admin-page-table__tile'>
              <b>Категория</b>
            </div>
            <div className='admin-page-table__tile'>
              <b>Цвет</b>
            </div>
            <div className='admin-page-table__tile'>
              <b>Номер</b>
            </div>
            <div className='admin-page-table__tile'>
              <b>Цена Min</b>
            </div>
            <div className='admin-page-table__tile'>
              <b>Цена Max</b>
            </div>
            <div className='admin-page-table__tile'>
              <b>Бензин</b>
            </div>
            <div className='admin-page-table__tile'>
              <b>Описание</b>
            </div>
            <div className='admin-page-table__tile'/>
          </div>
          <SimpleBar 
            className='admin-page__simple-bar admin-page__simple-bar_table'
            autoHide = { false }
          >
            {listCar}
          </SimpleBar>
        </div>

        
        <div className='admin-page__main-window-footer'>
          {/* <PageButton
            data = {data}
            split = {40}
            page = {page}
            callBackPage = {setPage}
            callBeckLoading = {setListOrder}
          /> */}
        </div>
      </div>
    </div>
  );
};

const putStateToProps = (state) => {
  return {...state};
};

export default connect(putStateToProps)(AdminCar);