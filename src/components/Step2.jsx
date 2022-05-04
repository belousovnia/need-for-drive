import { React, useEffect, useMemo } from 'react';
import { getCar, getCategory} from './dataFunction/dataStep2';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeTiles } from '../store/actions';
import { changeCategoryList } from '../store/actions';
import { prettify } from './dataFunction/generalFunction';
import { changeCategoryFilter } from '../store/actions';
import { changeCar } from '../store/actions';

function Step2(props) {
  const {
    tiles,
    changeTiles,
    categoryList,
    changeCategoryList,
    categoryFilter,
    changeCategoryFilter,
    car,
    changeCar,
  } = props;

  const data = useMemo(() => getCar(), []);
  const categoryData = useMemo(() => getCategory(), []);

  async function buildButton() {
    let receivedData = [...await categoryData];
    let count = 0; 
    let listButton = [];
    receivedData.unshift({
      'id': 'inputAllCar',
      'name': 'Все модели',
    });
    for (let i in receivedData) {
      let defaultInput;
      if (categoryFilter == receivedData[i].name) {
        defaultInput =  
          <input
            type='radio' 
            className='radio-button__input'
            name='inputCategory'
            id={`category${count}`} 
            defaultChecked
          />
      } else {
        defaultInput =  
          <input
            type='radio' 
            className='radio-button__input'
            name='inputCategory'
            id={`category${count}`} 
          />
      };
      let newItem = 
        <div className='radio-button__container' key={receivedData[i].id}>
          {defaultInput}
          <label
            className='radio-button__label' 
            htmlFor={`category${count}`}
            onClick={() => changeCategoryFilter(receivedData[i].name)}
          >
            <div className='radio-button__point'/>
            <p className='radio-button__title'>{receivedData[i].name}</p>
          </label>
        </div>  
      count = count + 1;  
      listButton.push(newItem);
    };
    changeCategoryList(listButton);
  };


  async function buildTile() {
    let dataCar = await data;
    let newTiles = [];
    let count = 0;

    for (let i in dataCar) {
      let item = dataCar[i];

      if ( item.categoryId.name == categoryFilter || 
        categoryFilter == 'Все модели') {
          let defaultInput = 
            <input
              type='radio' 
              className='step-2__tile-input'
              name='inputCar'
              id={`tileCar${count}`} 
            />
          if (car != undefined){
            if (item.id == car.id){
            defaultInput =
              <input
                type='radio' 
                className='step-2__tile-input'
                name='inputCar'
                id={`tileCar${count}`}
                defaultChecked 
              />
            };
          };
  
          let newTile =
            <div key={item.id}>
              {defaultInput}
              <label 
                className='step-2__tile' 
                htmlFor={`tileCar${count}`}
                onClick={() => {
                  const element = document.getElementById('order-page-data__button');
                  element.scrollIntoView({block: "center", behavior: "smooth"});
                  changeCar(item);
                }}
              >
                <p className='step-2__tile-name'>{item.name}</p>
                <p className='step-2__tile-price'>{prettify(item.priceMin)} - {prettify(item.priceMax)}₽</p>
                <div className='step-2__tile-img-wrapped'>
                  <img 
                    className='step-2__tile-img' 
                    src={item.thumbnail.path}
                    onError={(i) => {
                      i.target.src = require('../media/car.jpg')
                    }}
                  />
                </div>     
              </label>
            </div> 
          newTiles.push(newTile);
          count = count + 1;
        };
    };
    changeTiles(newTiles);
  };

  // ------------------------------------------------------

  useEffect(() => {
    try {
      changeTiles([<div className="loading" key="loading-1"/>]);
      buildTile();
      buildButton();
    } catch {};
  }, [categoryFilter]);

  return ( 
    <div className='step-2'>
      <div className='step-2__category-wrapped'>
        {categoryList}
      </div>
      <div className='step-2__block-tile'>
        {tiles}
      </div>
    </div>
  );
};

const putStateToProps = (state) => {
  return {...state};
};

const putActionToProps = (dispatch) => {
  return {
    changeTiles: bindActionCreators(changeTiles, dispatch),
    changeCategoryList: bindActionCreators(changeCategoryList, dispatch),
    changeCategoryFilter: bindActionCreators(changeCategoryFilter, dispatch),
    changeCar: bindActionCreators(changeCar, dispatch),
  };
};

const WrappedStep2Component 
  = connect(putStateToProps, putActionToProps)(Step2);

export default connect(putStateToProps, putActionToProps)(WrappedStep2Component);