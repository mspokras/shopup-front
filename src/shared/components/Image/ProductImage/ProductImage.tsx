import React from 'react';
import './ProductImage.scss';
import Trash from '../../../../assets/icons/Trash.svg';
import Edit from '../../../../assets/icons/Edit.svg';

interface PropTypes {
  image: string;
  onDelete: () => void;
}

const ProductImage = (props: PropTypes) => {
  const { image, onDelete } = props;
  const handleDeleteClick = () => {
    onDelete();
  };
  return (
    <div className='product-image-container'>
      <img src={image} alt="product" className="img-product" />
      <div className='icon-container icon-trash' onClick={handleDeleteClick}>
        <img src={Trash} alt="trash" className="img-trash" />
      </div>
      <div className='icon-container icon-edit'>
        <img src={Edit} alt="edit" className="img-edit" />
      </div>
    </div>
  );
};

export default ProductImage;