import React, { useEffect, useState } from 'react';
import './ProductsPage.scss';
import TemplatePage from '../TemplatePage/TemplatePage';
import ProductCard from '../../widgets/ProductCard/ProductCard';
import PlusButton from '../../shared/components/Button/PlusButton/PlusButton';
import { productsData } from './productsData';
import { IProduct } from '../../entities/Product/product.models';
import ModalProducts from '../../widgets/ModalProducts/ModalProducts';
import ModalEditProduct from '../../widgets/ModalProducts/ModalEditProduct/ModalEditProduct';
import { useGetProductsQuery } from '../../entities/Product/api/productApi';

const ProductsPage = () => {
  const [isNewModalVisible, setNewModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  // const [mockedProducts, setMockedProducts] = useState(productsData);
  const [productToEdit, setProductToEdit] = useState<IProduct>(productsData[0]);
  const [productsBack, setProductsBack] = useState([]);
  const { data: productsBackData } = useGetProductsQuery();

  useEffect(() => {
    if (productsBackData) {
      setProductsBack(productsBackData);
    }
  }, [productsBackData]);

  console.log(productsBack);

  const deleteProduct = (productId: number | undefined) => {
    const updatedProducts = productsBack.filter((product) => product["_id"] !== productId);
    setProductsBack(updatedProducts);
    setEditModalVisible(false);
  };

  const toggleNewProductModal = () => {
    setNewModalVisible(!isNewModalVisible);
  };

  const toggleEditProductModal = (product: IProduct) => {
    setEditModalVisible(!isEditModalVisible);
    setProductToEdit(product);
  }

  const handleChangeProduct = (product: IProduct) => {
    const updatedProducts = [...productsBack, { id: productsBack.length, ...product }];
    // setProducts(updatedProducts);
  } 

  const handleAddProduct = (product: IProduct) => {
    handleChangeProduct(product);
    toggleNewProductModal();
  }

  const handleEditProduct = (product: IProduct) => {

    console.log('Making changes:', product);
    // const updatedProducts = products.map((existingProduct: IProduct) =>
    //   existingProduct.id === product.id ? { ...existingProduct, ...product } : existingProduct
    // );
    // setProducts(updatedProducts);
    setEditModalVisible(false);
  };

  return (
    <div className='products-page'>
      <TemplatePage title="Products">
        <div className="products-grid">
          <PlusButton onClick={toggleNewProductModal} />
          {productsBack.map((product: any) => (
            <ProductCard 
              key={product._id} 
              onDelete={() => deleteProduct(product._id)}
              onEditClick={() => handleEditProduct(product)}
              {...product} 
            />
          ))}
        </div>
        {isNewModalVisible && 
          <ModalProducts 
            onClose={toggleNewProductModal} 
            onAddProduct={handleAddProduct} 
          />}
        {isEditModalVisible && 
          <ModalEditProduct 
            onClose={() => toggleEditProductModal(productToEdit)} 
            onEditProduct={() => handleEditProduct(productToEdit)} 
            onDeleteProduct={() => deleteProduct(productToEdit.id)}
            productData={productToEdit}
          />}
      </TemplatePage>
    </div>
  );
};

export default ProductsPage;