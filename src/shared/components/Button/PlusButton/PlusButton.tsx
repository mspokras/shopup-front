import React from 'react';
import './PlusButton.scss';
import Plus from '../../../../assets/icons/Plus.svg';

const PlusButton = () => {
  return (
    <button className='plus-button'>
      <img src={Plus} alt="plus" />
    </button>
  );
};

export default PlusButton;