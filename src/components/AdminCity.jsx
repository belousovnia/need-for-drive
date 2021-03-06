import { React, useEffect, useState, useRef } from 'react';
import SimpleBar from 'simplebar-react';
import { getSimpleData, deleteSubject} from './dataFunction/generalFunction';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminCity(props) {
  const { login } = props;
  
  const navigate = useNavigate();

  const [ mainData, setMainData ] = useState(false);
  const [ update, setUpdate ] = useState();
  const [ listCity, setListCity ] = useState();

  // ------------------------------------------------------

  const countNewId = useRef(0)

  function getId() {
    countNewId.current++
    return countNewId.current
  };

  async function getDataCityList() {
    setListCity([<div className="loading loading_center" key="loading-3"/>]);
    const data = await getSimpleData('city');
    if (data.response) {
      navigate(`/admin/error/${data.response.status}`)
    };
    setMainData(data);
  };
  
  async function callBackDelete(name, id) {
    const question =  window.confirm(`Удалить город ${name}: ${id}`);
    if (question) {
      await deleteSubject(login.data.access_token, id, 'city');
      setUpdate(id);
    };
  };

  async function buildCityList() {
    if (mainData) {
      const data = mainData.data.data;
      const newListCity = [];
      for (let i in data) {
        const item = data[i];
        const tile = 
        <div className='admin-page-table__city' key={getId()}>
          <div className='admin-page-table__tile'>
            {item.name} 
          </div>
          <div className='admin-page-table__tile'/>
          <div className='admin-page-table__tile'>
            <div className='admin-page-tile__button-container admin-page-tile__button-container_table'>
              <button   
                className='admin-page-tile__button_cansel admin-page-tile__button admin-page-tile__button_table'
                onClick={() => callBackDelete(item.name, item.id)}
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
        newListCity.push(tile)
      };
      setListCity(newListCity);
    };
  };

  // ------------------------------------------------------

  useEffect(getDataCityList, [update]);
  useEffect(buildCityList, [ mainData ]);

  // ------------------------------------------------------

  return (
    <div className='admin-page-table'>
      <div className='admin-page-table__wrapped admin-page-table__wrapped_car'>
        <p className='admin-page__main-title'>
          Список городов 
        </p>
        <div className='admin-page__main-window'>
          <div className='admin-page__main-window-content admin-page__main-window-content_no-footer'>
            
            <SimpleBar 
              className='admin-page__simple-bar admin-page-table__simple-bar_table'
              autoHide = { false }
            >
              <div className='admin-page-table__city admin-page-table__name'>
                <div className='admin-page-table__tile'>
                  <b>Название</b> 
                </div>
                <div className='admin-page-table__tile'/>
                <div className='admin-page-table__tile'/>
              </div>
              {listCity}
            </SimpleBar>
          </div>

          <div className='admin-page__main-window-footer admin-page__main-window-footer_no-page-button'>
          </div>
        </div>
      </div>
    </div>
  );
};

const putStateToProps = (state) => {
  return {...state};
};

export default connect(putStateToProps)(AdminCity);