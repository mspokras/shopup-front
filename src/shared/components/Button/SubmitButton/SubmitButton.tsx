import React from 'react';
import './SubmitButton.scss';

interface PropTypes {
  label: string;
}

const SubmitButton = (props: PropTypes) => {
  const { label } = props;
  return (
    <button className='submit-button'>{label}</button>
  );
};

export default SubmitButton;