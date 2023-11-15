import React from 'react';
import './CustomersListItem.scss';

interface PropTypes {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
}
const CustomersListItem = (props: PropTypes) => {
  const { firstName, lastName, company, email } = props;
  return (
    <li className='customers-row'>
      <div className="customer-column">{firstName}</div>
      <div className="customer-column">{lastName}</div>
      <div className="customer-column">{company}</div>
      <div className="customer-column customer-email">
        <a href={`mailto:${email}`}>{email}</a>
      </div>
    </li>
  );
};

export default CustomersListItem;