import React from 'react';
import './NavButton.scss';

interface PropTypes {
  label: string;
}

const NavButton = (props: PropTypes) => {
  const { label } = props;
  return (
    <button className='nav-button'>{label}</button>
  );
};

export default NavButton;