import React from 'react';
import './ProductsPage.scss';
import TemplatePage from '../TemplatePage/TemplatePage';

const ProductsPage = () => {
  return (
    <div className='products-page'>
      <TemplatePage title="Products">
        Products grid
      </TemplatePage>
    </div>
  );
};

export default ProductsPage;