import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Homepage from './components/Homepage';
import OrderPage from './components/OrderPage';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/order/*' element={<OrderPage/>}>
          <Route path='step-1' element={<Step1/>}/>
          <Route path='step-2' element={<Step2/>}/>
          <Route path='step-3' element={<Step3/>}/>
          <Route path='step-4' element={<Step4/>}/>
          <Route path='step-5/:orderId' element={<Step4/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
