import React from 'react';
import './PlusButton.scss';
import Plus from '../../../../assets/icons/Plus.svg';

interface PropTypes {
  onClick?: () => void;
  bottomLabel?: string;
}

const PlusButton = (props: PropTypes) => {
  const { onClick, bottomLabel } = props;
  return (
    <button className='plus-button' onClick={onClick}>
      <img src={Plus} alt="plus" />
      {bottomLabel && <div className='bottom-label'>{bottomLabel}</div>}
    </button>
  );
};

export default PlusButton;