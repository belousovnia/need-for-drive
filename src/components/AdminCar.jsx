import { React, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';
import { getSimpleData, deleteSubject, getData } from './dataFunction/generalFunction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import PageButton from './PageButton';
import SelectListCallBack from './SelectListCallBack';

function AdminCar(props) {
  const { login } = props;
  
  const navigate = useNavigate();
  
  const [ filterHide, setFilterHide ] = useState(true);
  const [ mainData, setMainData ] = useState(false);
  const [ listCar, setListCar ] = useState();
  const [ update, setUpdate ] = useState();
  const [ params, setParams ] = useState({'sort[name]': 1});
  const [ page, setPage ] = useState(1);
  
  const [ category, setCategory] = useState(null);
  const [ listCategory, setListCategory] = useState([]);
  
  const [ sort, setSort] = useState(null);

  const listSort = [
    ['Min цена по возрастанию', 'Min цена по возрастанию'],
    ['Min цена по убыванию', 'Min цена по убыванию'],
    ['Max цена по возрастанию', 'Max цена по возрастанию'],
    ['Max цена по убыванию', 'Max цена по убыванию'],
    ['Топлива по возрастанию', 'Топлива по возрастанию'],
    ['Топлива по убыванию', 'Топлива по убыванию'],
    ['Сначала новые машины', 'Сначала новые машины'],
    ['Сначала старые машины', 'Сначала старые машины'],
  ];

  // ------------------------------------------------------

  const countNewId = useRef(0)

  function getId() {
    countNewId.current++
    return countNewId.current
  };

  async function getDataCarList() {
    setListCar([<div className="loading loading_center" key="loading-3"/>]);
    const data = await getSimpleData('car', page - 1, 40, params);
    if (data.response) {
      navigate(`/admin/error/${data.response.status}`)
    };
    setMainData(data);
  };

  async function callBackDelete(id) {
    const question =  window.confirm(`Удалить заказ ${id} ?`);
    if (question) {
      await deleteSubject(login.data.access_token, id, 'car');
      setUpdate(id);
    };
  };

  async function buildCarList() {
    if (mainData) {
      const data = mainData.data.data;
      const listCar = [];
      for (let i in data) {
        const item = data[i];
        const colors = [];
        item.colors.forEach(i => {
          colors.push(`${i}  `);
        });
        const categoryId = () => {if (item.categoryId) return item.categoryId.name}
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
            {categoryId()}
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

  async function getListCategory() {
    const data = await getData('category');
    const list = [];
    data.forEach((i) => list.push([i.name, i.id]));
    setListCategory(list);
  };

  function changeFilter() {
    const windowWidth = document.documentElement.clientWidth;

    let hide;
    if (windowWidth <= 767) {
      hide = filterHide;
    } else {
      hide = false;
    };
    
    if (!hide) {
      const listFilter = {};

      if (category) {
        listFilter['categoryId[id]'] = category;
      };
      if (sort) {
        switch (sort){
          case 'Min цена по возрастанию':
            listFilter['sort[categoryId[priceMin]]'] = 1;
            break;
          case 'Min цена по убыванию':
            listFilter['sort[categoryId[priceMin]]'] = -1;;
            break;
          case 'Max цена по возрастанию':
            listFilter['sort[categoryId[priceMax]]'] = 1;
            break;
          case 'Max цена по убыванию':
            listFilter['sort[categoryId[priceMax]]'] = -1;
            break;
          case 'Топлива по возрастанию':
            listFilter['sort[tank]'] = 1;
            break;
          case 'Топлива по убыванию':
            listFilter['sort[tank]'] = -1;
            break;
          case 'Сначала старые машины':
            listFilter['sort[createdAt]'] = 1;
            break;
          case 'Сначала новые машины':
            listFilter['sort[createdAt]'] = -1;
            break;
        };
      } else {
        listFilter['sort[name]'] = 1;
      };
      setParams(listFilter);
    };
    
    if (windowWidth <= 767) {
      setFilterHide(!filterHide);
    };
  };

  // ------------------------------------------------------

  const selectorContainerClass = classNames({
    'admin-page__selector-container': true,
    'admin-page__selector-container_hide': filterHide,
  });

  // ------------------------------------------------------

  useEffect(getDataCarList, [ update, page, params ]);
  useEffect(buildCarList, [ mainData ]);
  useEffect(getListCategory, []);

  // ------------------------------------------------------

  return (
    <div className='admin-page-table'>
      <div className='admin-page-table__wrapped admin-page-table__wrapped_car'>
        <p className='admin-page__main-title'>
          Список автомобилей 
        </p>
        <div className='admin-page__main-window'>
          <div className='admin-page__main-window-header'>
            <div className={selectorContainerClass}>
              <SelectListCallBack
                listValue={listCategory}
                collBack={setCategory}
                placeholder='категория'
                id='admin-page-list__filter-category'
              />
              <SelectListCallBack
                listValue={listSort}
                collBack={setSort}
                placeholder='сортировка по'
                id='admin-page-list__filter-sort'
              />
            </div>
            <button 
              className='admin-button admin-button_filter-table'
              onClick={changeFilter}
            >Фильтр</button>
          </div>


          <div className='admin-page__main-window-content admin-page__main-window-content_no-reduction'>
            <div className='admin-page-table__car admin-page-table__name'>
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
              className='admin-page__simple-bar admin-page-table__simple-bar_table'
              autoHide = { false }
            >
              {listCar}
            </SimpleBar>
          </div>

          
          <div className='admin-page__main-window-footer'>
            <PageButton
              data = {mainData}
              split = {40}
              page = {page}
              callBackPage = {setPage}
              callBeckLoading = {setListCar}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const putStateToProps = (state) => {
  return {...state};
};

export default connect(putStateToProps)(AdminCar);