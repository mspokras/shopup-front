import React from 'react';
import TemplatePage from '../TemplatePage/TemplatePage';
import './CustomersPage.scss';

const CustomersPage = () => {
  return (
    <div className='customers-page'>
      <TemplatePage title="Customers">
        Customers list
      </TemplatePage>
    </div>
  );
};

export default CustomersPage;