import React from 'react';
import TemplatePage from '../TemplatePage/TemplatePage';
import SubmitButton from '../../shared/components/Button/SubmitButton/SubmitButton';
import './CustomersPage.scss';
import listItems from './customersData.json';
import CustomersListItem from '../../shared/components/ListItem/CustomersListItem/CustomersListItem';

const CustomersPage = () => {
  return (
    <div className='customers-page'>
      <TemplatePage title="Customers">
        <div className="customers-button">
          <SubmitButton label="Add new" />
        </div>
        <ul className='customers-list'>
          <li className="customers-headings-row">
            <div className="customer-heading">First Name</div>
            <div className="customer-heading">Last Name</div>
            <div className="customer-heading">Company</div>
            <div className="customer-heading">Email</div>
          </li>
          {listItems.map((item)=>(
            <CustomersListItem key={item.id} {...item} />
          ))}
        </ul>
      </TemplatePage>
    </div>
  );
};

export default CustomersPage;