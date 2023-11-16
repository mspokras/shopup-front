import React from 'react';
import './ProductCard.scss';
import ProductImage from '../../shared/components/Image/ProductImage/ProductImage';

interface PropTypes {
  productImage: string;
  name: string;
  price: string;
  onDelete: () => void; 
}

const ProductCard = (props: PropTypes) => {
  const { productImage, name, price, onDelete } = props;
  return (
    <div className='product-card'>
      <ProductImage image={productImage} onDelete={onDelete} />
      <div className="product-details">
        <div className='product-name'>{name}</div>
        <div className='product-price'>${price}</div>
      </div>
    </div>
  );
};

export default ProductCard;