import React from 'react';
import './Navigation.scss';
import NavButton from '../../shared/components/Button/NavButton/NavButton';
import NavLink from '../../shared/components/Link/NavLink/NavLink';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate('/login');
  }

  return (
    <div className='nav-container'>
      <nav className='nav-menu'>
        <NavLink label="Products" path="/products" />
        <NavLink label="Customers" path="/customers" />
        <NavLink label="Orders" path="/orders" />
      </nav>
      <NavButton label="Log Out" onClick={handleLogOut} />
  </div>
  );
};

export default Navigation;