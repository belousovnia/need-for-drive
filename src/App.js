import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Homepage from './components/Homepage';
import OrderPage from './components/OrderPage';
import Step1 from './components/Step1';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/order/*' element={<OrderPage/>}>
          <Route path='step-1' element={<Step1/>}/>
          <Route path='step-2' element={<Step1/>}/>
          <Route path='step-3' element={<Step1/>}/>
          <Route path='step-4' element={<Step1/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
