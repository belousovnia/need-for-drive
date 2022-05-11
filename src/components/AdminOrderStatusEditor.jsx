import { React, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  getSimpleData,
  putData,
  addData,
  deleteSubject,
} from './dataFunction/generalFunction';
import { useNavigate } from 'react-router-dom';

function AdminOrderStatusEditor(props) {
  const {
    login,
  } = props;

  const navigate = useNavigate();
  const { orderStatusId } = useParams();

  const [ name, setName ] = useState(null);
  const [ alertName, setAlerName ] = useState(false);

  // --------------------------------------------------------
  
  async function getDataOrderStatus() {
    const inputName = document.getElementById('admin-table-editor__input-name');

    if (orderStatusId === 'new') {
      setName(null);
      inputName.value = null;
      return;
    };
    
    const data = await getSimpleData(`orderStatus/${orderStatusId}`);
    if (data.response) {
      navigate(`/admin/error/${data.response.status}`)
    };
    const item = data.data.data;
    setName(item.name);
    inputName.value = item.name;
  };

  async function deleteOrderStatus() {
    const question =  window.confirm(`Удалить статус заказа?`);
    if (question) {
      await deleteSubject(login.data.access_token, orderStatusId, 'orderStatus');
      navigate('/admin/order-status');
    };
  };

  async function putOrderStatus() {
    if (name) {
      let putDataOrderStatus = {
        'name': name,
      };

      setAlerName(false);
  
      if (orderStatusId === 'new') {
        addData(login.data.access_token, 'orderStatus', putDataOrderStatus);
      } else {
        putData(login.data.access_token, 'orderStatus', orderStatusId, putDataOrderStatus);
      };
  
      navigate('/admin/order-status');
    } else {
      setAlerName(true);
    };
  };

  function addListener() {
    const inputName = document.getElementById('admin-table-editor__input-name');
    inputName.addEventListener('change', () => {
      setName(inputName.value);
    });
  };

  // --------------------------------------------------------

  const inputNameClass = classNames({
    'admin-page-editor__input': true,
    'admin-page-editor__input_alert': alertName,
  });
  const titleAlertNameClass = classNames({
    'admin-page-editor__input-title-alert': true,
    'off': !alertName,
  });
      
  // --------------------------------------------------------

  useEffect(getDataOrderStatus, []);
  useEffect(addListener, []);

  // --------------------------------------------------------
  return (
    <div className='admin-table-editor'>
      <div className='admin-page-table__wrapped'>
        <p className='admin-page__main-title'>
          Редактирование статуса заказа
        </p>
        <div className='admin-page__main-window admin-page__main-window_admin-page-editor'>
          <div className='admin-page-editor__main-window-content'>
            <div className='admin-page-editor__input-conteiner'>
              <p className='admin-page-editor__input-title'>Название </p>
              <input 
                type="text" 
                id='admin-table-editor__input-name'  
                className={inputNameClass}
              />
              <p className={titleAlertNameClass}>необходимо ввести название</p>
            </div>
          </div>
          <div className='admin-page__main-window-footer admin-page__main-window-footer_editor'>
            <div className='admin-page-editor__footer-button-container'>
              <button 
                className='admin-button admin-button_margin' 
                onClick={putOrderStatus}
              >
                <p className='admin-button__title '>Сохранить</p>
              </button>
              <button 
                className='admin-button admin-button_gray'
                onClick={getDataOrderStatus}
              >
                <p className='admin-button__title '>Отменить</p>
              </button>
            </div>
            
            <button 
              className='admin-button admin-button_red'
              onClick={deleteOrderStatus}
            >
              <p className='admin-button__title '>Удалить</p>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

const putStateToProps = (state) => {
  return {...state};
};

export default connect(putStateToProps)(AdminOrderStatusEditor);