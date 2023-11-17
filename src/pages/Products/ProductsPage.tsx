import React, { useState } from 'react';
import './ProductsPage.scss';
import TemplatePage from '../TemplatePage/TemplatePage';
import ProductCard from '../../widgets/ProductCard/ProductCard';
import PlusButton from '../../shared/components/Button/PlusButton/PlusButton';
import { productsData } from './productsData';
import { IProduct } from '../../shared/types/types';
import ModalProducts from '../../widgets/ModalProducts/ModalProducts';

const ProductsPage = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState(productsData);

  const deleteProduct = (productId: number) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddProduct = (product: IProduct) => {
    const updatedProducts = [...products, { id: products.length + 1001, ...product }];
    console.log(product);
    setProducts(updatedProducts);
    toggleModal();
  } 

  return (
    <div className='products-page'>
      <TemplatePage title="Products">
        <div className="products-grid">
          <PlusButton onClick={toggleModal} />
          {products.map((product: any) => (
            <ProductCard 
              key={product.id} 
              onDelete={() => deleteProduct(product.id)}
              {...product} 
            />
          ))}
        </div>
        {isModalVisible && <ModalProducts onClose={toggleModal} onAddProduct={handleAddProduct} />}
      </TemplatePage>
    </div>
  );
};

export default ProductsPage;