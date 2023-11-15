import React from 'react';
import TemplatePage from '../TemplatePage/TemplatePage';
import './OrdersPage.scss';
import { ordersData } from './ordersData.ts';
import OrdersListItem from '../../shared/components/ListItem/OrdersListItem/OrdersListItem';

const OrdersPage = () => {
  return (
    <div className='orders-page'>
      <TemplatePage title="Orders">
        <ul className="orders-list">
          <li className="orders-headings-row">
            <div className="order-heading">First Name</div>
            <div className="order-heading">Last Name</div>
            <div className="order-heading">Business Name</div>
            <div className="order-heading">Mobile</div>
            <div className="order-heading">Shipping Address</div>
          </li>
          {ordersData.map((order: any) => (
            <OrdersListItem key={order.id} {...order} />
          ))}
        </ul>
      </TemplatePage>
    </div>
  );
};

export default OrdersPage;