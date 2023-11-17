import React from 'react';
import './ProductCard.scss';
import ProductImage from '../../shared/components/Image/ProductImage/ProductImage';

interface PropTypes {
  primImage: File | string;
  title: string;
  price: string;
  onDelete: () => void; 
  onEditClick: () => void;
}

const ProductCard = (props: PropTypes) => {
  const { primImage, title, price, onDelete, onEditClick } = props;
  const isExternal = typeof primImage === 'string';

  return (
    <div className='product-card'>
      <ProductImage image={primImage} onDelete={onDelete} onEditClick={onEditClick} external={isExternal} />
      <div className="product-details">
        <div className='product-name'>{title}</div>
        <div className='product-price'>${price}</div>
      </div>
    </div>
  );
};

export default ProductCard;