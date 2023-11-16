import React, { useState } from 'react';
import TemplatePage from '../TemplatePage/TemplatePage';
import SubmitButton from '../../shared/components/Button/SubmitButton/SubmitButton';
import './CustomersPage.scss';
import customersData from './customersData.json';
import CustomersListItem from '../../shared/components/ListItem/CustomersListItem/CustomersListItem';
import ModalCustomers from '../../widgets/ModalCustomers/ModalCustomers';
import { ICustomer } from '../../shared/types/types';

const CustomersPage = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [customers, setCustomers] = useState(customersData);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddCustomer = (customer: ICustomer) => {
    const updatedCustomers = [...customers, { id: customers.length + 1000, ...customer }];
    setCustomers(updatedCustomers);
  };

  return (
    <div className='customers-page'>
      <TemplatePage title="Customers">
        <div className="customers-button">
          <SubmitButton label="Add new" onClick={toggleModal} />
        </div>
        <ul className='customers-list'>
          <li className="customers-headings-row">
            <div className="customer-heading">First Name</div>
            <div className="customer-heading">Last Name</div>
            <div className="customer-heading">Company</div>
            <div className="customer-heading">Email</div>
          </li>
          {customers.map((customer)=>(
            <CustomersListItem key={customer.id} {...customer} />
          ))}
        </ul>
        {isModalVisible && <ModalCustomers onClose={toggleModal} onAddCustomer={handleAddCustomer} />}
      </TemplatePage>
    </div>
  );
};

export default CustomersPage;