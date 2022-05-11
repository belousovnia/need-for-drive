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
import AdminCarEditor from './components/AdminCarEditor';
import AdminCategory from './components/AdminCategory';
import AdminCategoryEditor from './components/AdminCategoryEditor';
import AdminRateType from './components/AdminRateType';
import AdminRateTypeEditor from './components/AdminRateTypeEditor';
import AdminRate from './components/AdminRate';
import AdminRateEditor from './components/AdminRateEditor';
import AdminCity from './components/AdminCity';
import AdminCityEditor from './components/AdminCityEditor';
import AdminPoint from './components/AdminPoint';
import AdminPointEditor from './components/AdminPointEditor';
import AdminOrderStatus from './components/AdminOrderStatus';
import AdminOrderStatusEditor from './components/AdminOrderStatusEditor';
import AdminError from './components/AdminError';

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
        <Route path='admin-login' element={<AdminLogin/>}/>
        <Route path='/admin/*' element={<AdminPage/>}>
          <Route path='order' element={<AdminOrderList/>}/>
          <Route path='order/:orderId' element={<AdminOrderEditor/>}/>
          <Route path='car' element={<AdminCar/>}/>
          <Route path='car/:carId' element={<AdminCarEditor/>}/>
          <Route path='category' element={<AdminCategory/>}/>
          <Route path='category/:categoryId' element={<AdminCategoryEditor/>}/>
          <Route path='rate-type' element={<AdminRateType/>}/>
          <Route path='rate-type/:rateTypeId' element={<AdminRateTypeEditor/>}/>
          <Route path='rate' element={<AdminRate/>}/>
          <Route path='rate/:rateId' element={<AdminRateEditor/>}/>
          <Route path='city' element={<AdminCity/>}/>
          <Route path='city/:cityId' element={<AdminCityEditor/>}/>
          <Route path='point' element={<AdminPoint/>}/>
          <Route path='point/:pointId' element={<AdminPointEditor/>}/>
          <Route path='order-status' element={<AdminOrderStatus/>}/>
          <Route path='order-status/:orderStatusId' element={<AdminOrderStatusEditor/>}/>
          <Route path='error/:errorCode' element={<AdminError/>}/>
          <Route path='*' element={<AdminError/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
