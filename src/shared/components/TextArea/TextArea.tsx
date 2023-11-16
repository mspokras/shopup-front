import React from 'react';
import './TextArea.scss';
import classNames from 'classnames';

interface PropTypes {
  className?: string;
  placeholder?: string;
}
const TextArea = (props: PropTypes) => {
  const { className, placeholder } = props;
  return (
    <textarea className={classNames('textarea', className)} placeholder={placeholder} />
  );
};

export default TextArea;