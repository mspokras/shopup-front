import React from 'react';
import './App.scss';
import LoginForm from '../../pages/LoginForm/LoginForm';
import { Route, Routes } from 'react-router-dom';
import ProductsPage from '../../pages/Products/ProductsPage';

function App() {
  return (
    <Routes>
      <Route index element={<LoginForm />} />
      <Route path='/products' element={<ProductsPage />}/>
    </Routes>
  );
}

export default App;
