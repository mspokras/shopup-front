import React from 'react';
import ModalProducts from '../ModalProducts';
import './ModalEditProduct.scss';
import { IProduct } from '../../../shared/types/types';

interface PropTypes {
  onClose?: () => void;
  onEditProduct?: (product: IProduct) => void;
  onDeleteProduct?: (product: IProduct) => void;
}

const ModalEditProduct = (props: PropTypes) => {
  const { onClose, onEditProduct, onDeleteProduct } = props;
  return (
    <ModalProducts 
      onClose={onClose} 
      onAddProduct={onEditProduct} 
      onDelete={onDeleteProduct} 
    />
  );
};

export default ModalEditProduct;