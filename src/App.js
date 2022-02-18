import React from 'react';
import { Routes, Route, Link} from 'react-router-dom';
import LineBurger from './components/LineBurger';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeHeadHiding } from './store/actions';
import IconsSocialMedia from './components/IconsSocialMedia';
import Homepage from './components/Homepage';

function App(props) {
  const { headHiding, changeHeadHiding } = props;
  const checkHeadHiding = headHiding ? 'header__active' : '';

  return (
      <div className='app'>

        <header className={`header ${checkHeadHiding}`}>
          <div className='header__container-button'>
            <button
              className='button-burger'
              onClick={() => changeHeadHiding(!props.headHiding)}
            >
              <LineBurger/>
              <LineBurger/>
              <LineBurger/>
            </button>
            
            <button className='language'> 
              Eng
            </button>
          </div>

          <div className='header__content'>
            <a href="" className='header__link'>ПАРКОВКА</a>
            <a href="" className='header__link'>СТРАХОВКА</a>
            <a href="" className='header__link'>БЕНЗИН</a>
            <a href="" className='header__link'>ОБСЛУЖИВАНИЕ</a>
            <IconsSocialMedia/>
          </div>
          <div className='header__transparent-block'/>  
      </header>

      <div className='content'>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
        </Routes>
      </div>
    </div>

  );
};

const putStateToProps = (state) => {
  return {
    headHiding: state.headHiding,
  };
};

const putActionToProps = (dispatch) => {
  return {
    changeHeadHiding: bindActionCreators(changeHeadHiding, dispatch),
  }
}

const WrappedMainComponent 
  = connect(putStateToProps, putActionToProps)(App);

export default connect(putStateToProps, putActionToProps)(WrappedMainComponent);
