import { React } from 'react';
import { Routes, Route, useLocation} from 'react-router-dom';
import Homepage from './components/Homepage';
import OrderPage from './components/OrderPage';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import AdminLogin from './components/AdminLogin';
import AdminPage from './components/AdminPage';
import AdminOrderList from './components/AdminOrderList';
import AdminOrderEditor from './components/AdminOrderEditor';
import AdminCar from './components/AdminCar';

function App() {
  const location = useLocation().pathname
  


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
        <Route path='admin-login' element={<AdminLogin/>}/>
        <Route path='/admin/*' element={<AdminPage/>}>
          <Route path='order' element={<AdminOrderList/>}/>
          <Route path='order/:orderId' element={<AdminOrderEditor/>}/>
          <Route path='car' element={<AdminCar/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
