import React from 'react';
import './CustomersListItem.scss';
import trashBin from '../../../../assets/icons/Trash.svg'

interface PropTypes {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  _id: string;
  onDeleteCustomer: (customerId: string) => void;
}
const CustomersListItem = (props: PropTypes) => {
  const { firstName, lastName, companyName, email, _id, onDeleteCustomer } = props;
  return (
    <li className='customers-row'>
      <div className="customer-column">{firstName}</div>
      <div className="customer-column">{lastName}</div>
      <div className="customer-column">{companyName}</div>
      <div className="customer-column customer-email">
        <a href={`mailto:${email}`}>{email}</a>
      </div>
      <button className='customer-delete'>
        <img 
          className="customer-delete-icon" 
          src={trashBin} 
          alt="delete" 
          onClick={() => onDeleteCustomer(_id)}
        />
      </button>
    </li>
  );
};

export default CustomersListItem;