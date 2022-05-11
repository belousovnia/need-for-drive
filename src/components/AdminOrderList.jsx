import { React, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SelectList from './SelectList';
import { getListOrder } from './dataFunction/dataAdminOrder';
import SimpleBar from 'simplebar-react';
import AdminOrderTile from './AdminOrderTile';
import { getData } from './dataFunction/generalFunction';
import SelectListCallBack from './SelectListCallBack';
import classNames from 'classnames';
import PageButton from './PageButton';
import { useNavigate } from 'react-router-dom';

function AdminOrderList(props) {
  const {
    login,
  } = props;

  const navigate = useNavigate();
  
  const [ listOrder, setListOrder ] = useState([<div className="loading loading_center" key="loading-3"/>]);
  const [ page, setPage ] = useState(1);
  const [ data, setData ] = useState(false);
  const [ params, setParams ] = useState({});
  const [ city, setSity] = useState(null);
  const [ listCity, setListSity] = useState([]);
  const [ car, setCar ] = useState(null);
  const [ listCar, setListCar ] = useState([]);
  const [ orderStatus, setOrderStatus ] = useState(null);
  const [ listOrderStatus, setListOrderStatus ] = useState([]);
  const [ date, setDate ] = useState(null);
  const [ filterHide, setFilterHide ] = useState(true);
  const [ updateList, setUpdateList ] = useState(0);
  
  const listDate = [
    ['За день', 86400000],
    ['За неделю', 604800000],
    ['За месяц', 2678400000],
    ['За год', 31536000000],
  ];
  
  // ------------------------------------------------------

  const countNewId = useRef(0)

  function getId() {
    countNewId.current++
    return countNewId.current
  };

  async function getCityList() {
    const data = await getData('city', {'sort[name]': 1,});
    if (data.response) {
      navigate(`/admin/error/${data.response.status}`)
    };
    const list = [];
    data.forEach((i) => list.push([i.name, i.id]));
    setListSity(list);
  };

  async function getCarList() {
    const data = await getData('car', {'sort[name]': 1,});
    const list = [];
    data.forEach((i) => list.push([i.name, i.id]));
    setListCar(list);
  };

  async function getOrderStatusList() {
    const data = await getData('orderStatus');
    const list = [];
    data.forEach((i) => list.push([i.name, i.id]));
    setListOrderStatus(list);
  };

  async function getDataOrderList() {
    setListOrder([<div className="loading loading_center" key="loading-3"/>]);
    const newData = await getListOrder(login.data.access_token, page - 1, params);
    setData(newData);
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

      if (city) {
        listFilter['cityId[id]'] = city;
      };
      if (car) {
        listFilter['carId[id]'] = car;
      };
      if (orderStatus) {
        listFilter['orderStatusId[id]'] = orderStatus;
      };
      if (date) {
        const dateNow = new Date();
        listFilter['createdAt[$gt]'] = dateNow.getTime() - date;
      };
      setParams(listFilter);
    };
    
    if (windowWidth <= 767) {
      setFilterHide(!filterHide);
    };
  };

  function buildOrderList() {
    if (data) {
      const dataList = data.data.data;
      const newList = [];
      if (dataList !== []) {
        dataList.forEach(dataItem => {
          const itemId = getId();
          newList.push(
            <AdminOrderTile 
              data={dataItem} 
              id={itemId}
              key={`admin-page-tile-${itemId}`}
              update={setUpdateList}
            />
          );
        });
        setListOrder(newList);
      } else {
        setListOrder([]);
      };
    };
  };

  // ------------------------------------------------------

  const selectorContainerClass = classNames({
    'admin-page__selector-container': true,
    'admin-page__selector-container_hide': filterHide,
  });
  
  // ------------------------------------------------------

  useEffect(getDataOrderList, [params, page, updateList]);
  useEffect(buildOrderList, [data]);
  useEffect(getCityList, []);
  useEffect(getCarList, []);
  useEffect(getOrderStatusList, []);
  
  // ------------------------------------------------------

  return ( 
    <div className='admin-page__main-container'>
      <p className='admin-page__main-title'>Заказы</p>
      <div className='admin-page__main-window'>
        <div className='admin-page__main-window-header'>
          <div className={selectorContainerClass}>
            <SelectListCallBack
              listValue={listCity}
              collBack={setSity}
              placeholder='город'
              id='admin-page-list__filter-city'
            />
            <SelectListCallBack
              listValue={listCar}
              collBack={setCar}
              placeholder='автомобиль'
              id='admin-page-list__filter-car'
            />
            <SelectListCallBack
              listValue={listOrderStatus}
              collBack={setOrderStatus}
              placeholder='статус'
              id='admin-page-list__filter-order-status'
            />
            <SelectListCallBack
              listValue={listDate}
              collBack={setDate}
              placeholder='период'
              id='admin-page-list__filter-date'
            />
          </div>
          <button 
            className='admin-button admin-button_filter-table'
            onClick={changeFilter}
          >Фильтр</button>
        </div>
        <div className='admin-page__main-window-content admin-page__main-window-content_no-reduction'>
          <SimpleBar 
            className='admin-page__simple-bar'
            autoHide = { false }
          >
            {listOrder}
          </SimpleBar>
        </div>
        <div className='admin-page__main-window-footer'>
            <PageButton
              data = {data}
              split = {20}
              page = {page}
              callBackPage = {setPage}
              callBeckLoading = {setListOrder}
            />
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
    // changeLogin: bindActionCreators(changeLogin, dispatch),
  };
};

export default connect(putStateToProps, putActionToProps)(AdminOrderList);