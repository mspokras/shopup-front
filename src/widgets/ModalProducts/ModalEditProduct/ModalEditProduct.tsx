import React from 'react';
import ModalProducts from '../ModalProducts';
import './ModalEditProduct.scss';
import { IProduct } from '../../../shared/types/types';

interface PropTypes {
  onClose?: () => void;
  onEditProduct?: (product: IProduct) => void;
}

const ModalEditProduct = (props: PropTypes) => {
  const { onClose, onEditProduct } = props;
  return (
    <ModalProducts onClose={onClose} />
  );
};

export default ModalEditProduct;