import React from 'react';
import './SubmitButton.scss';

interface PropTypes {
  label: string;
  onClick?: () => void;
}

const SubmitButton = (props: PropTypes) => {
  const { label, onClick } = props;

  return (
    <button className='submit-button' onClick={onClick}>{label}</button>
  );
};

export default SubmitButton;