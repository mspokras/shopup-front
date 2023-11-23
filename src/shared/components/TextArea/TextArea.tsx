import React, { forwardRef } from 'react';
import './TextArea.scss';
import classNames from 'classnames';

interface PropTypes {
  className?: string;
  placeholder?: string;
  error?: string;
}
const TextArea = forwardRef<HTMLTextAreaElement, PropTypes>((props: PropTypes, ref: any) => {
  const { className, placeholder, error, ...rest } = props;
  return (
    <div className="textarea-container">
      <textarea className={classNames('textarea', className)} placeholder={placeholder} ref={ref} {...rest} />
      <div className='error-message'>{error}</div>
    </div>
  );
});

export default TextArea;