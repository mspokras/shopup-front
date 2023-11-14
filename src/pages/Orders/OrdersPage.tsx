import React from 'react';
import TemplatePage from '../TemplatePage/TemplatePage';
import './OrdersPage.scss';

const OrdersPage = () => {
  return (
    <div className='orders-page'>
      <TemplatePage title="Orders">
        Orders list
      </TemplatePage>
    </div>
  );
};

export default OrdersPage;