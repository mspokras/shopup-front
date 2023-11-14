import React from 'react';
import './PageInput.scss';

interface PropTypes {
  placeholder?: string;
}

const PageInput = (props: PropTypes) => {
  const { placeholder } = props;
  return (
    <input className="page-input" id="form-input" type="text"  placeholder={placeholder} />
  );
};

export default PageInput;