import React, { useRef } from 'react';
import './FormInput.scss';

interface PropTypes {
  placeholder?: string;
  icon?: string;
  type?: string;
}

const FormInput = React.forwardRef<HTMLInputElement,PropTypes>((props, ref) => {
  const { placeholder, icon, ...rest } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const inputFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleRef = (el: HTMLInputElement | null) => {
    inputRef.current = el;
    if (ref) {
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref.hasOwnProperty('current')) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
      }
    }
  };

  return (
    <div className="form-control" onClick={inputFocus}>
      <img src={icon} alt="icon" className="form-icon" />
      <input 
        className="form-input" 
        id="form-input" 
        ref={handleRef}
        placeholder={placeholder}  
        {...rest}
      />
    </div>
  );
});

export default FormInput;