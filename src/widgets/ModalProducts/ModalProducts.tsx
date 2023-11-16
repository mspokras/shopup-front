import React from 'react';
import './ModalProducts.scss';
import Modal from '../../shared/components/Modal/Modal';
import FormInput from '../../shared/components/Input/FormInput/FormInput';
import SubmitButton from '../../shared/components/Button/SubmitButton/SubmitButton';
import PlusButton from '../../shared/components/Button/PlusButton/PlusButton';
import TextArea from '../../shared/components/TextArea/TextArea';

interface PropTypes {
  onClose?: () => void;
}

const ModalProducts = (props: PropTypes) => {
  const { onClose } = props;
  return (
    <Modal onClose={onClose}>
      <form className="modal-products">
        <div className="modal-pictures">
          <PlusButton bottomLabel='Add Cover' />
          <div className="pictures-small">
            <PlusButton />
          </div>
        </div>
        <div className="modal-inputs">
          <div className="inputs-main">
            <FormInput placeholder='Price' className='price-input' />
            <FormInput placeholder='Title' className='title-input' />
          </div>
          <TextArea placeholder='Description' className='desc-input' />
        </div>
        <SubmitButton label="Create New" />
      </form>
    </Modal>
  );
};

export default ModalProducts;