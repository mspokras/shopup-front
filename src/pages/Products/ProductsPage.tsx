import React, { useState } from 'react';
import './ProductsPage.scss';
import TemplatePage from '../TemplatePage/TemplatePage';
import ProductCard from '../../widgets/ProductCard/ProductCard';
import PlusButton from '../../shared/components/Button/PlusButton/PlusButton';
import { productsData } from './productsData';

const ProductsPage = () => {
  const [products, setProducts] = useState(productsData);

  const deleteProduct = (productId: number) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    console.log(updatedProducts);
    setProducts(updatedProducts);
  };
  return (
    <div className='products-page'>
      <TemplatePage title="Products">
        <div className="products-grid">
          <PlusButton />
          {products.map((product: any) => (
            <ProductCard 
              key={product.id} 
              onDelete={() => deleteProduct(product.id)}
              {...product} 
            />
          ))}
        </div>
      </TemplatePage>
    </div>
  );
};

export default ProductsPage;