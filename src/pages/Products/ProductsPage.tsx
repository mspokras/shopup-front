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
import { getToken } from '../../entities/Admin/admin.models';

const ProductsPage = () => {
  const [isNewModalVisible, setNewModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [products, setProducts] = useState(productsData);
  const [productToEdit, setProductToEdit] = useState<IProduct>(productsData[0]);
  const [productsBack, setProductsBack] = useState([]);
  const { data: productsBackData } = useGetProductsQuery();

  useEffect(() => {
    if (productsBackData) {
      setProductsBack(productsBackData);
    }
  }, [productsBackData]);

  const getAllProducts = async () => {
    try {
      const token = getToken().token;
      if (!token) {
        console.log('no token');
         return;
      }
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const result = await useGetProductsQuery();
      console.log(result);
   } catch (e) {
      console.error(e);
   }
 };
 

  useEffect(() => {
    getAllProducts();
  }, []);

  console.log(productsBack);

  const deleteProduct = (productId: number | undefined) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
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
    const updatedProducts = [...products, { id: products.length, ...product }];
    setProducts(updatedProducts);
  } 

  const handleAddProduct = (product: IProduct) => {
    handleChangeProduct(product);
    toggleNewProductModal();
  }

  const handleEditProduct = (product: IProduct) => {

    console.log('Making changes:', product);
    const updatedProducts = products.map((existingProduct: IProduct) =>
      existingProduct.id === product.id ? { ...existingProduct, ...product } : existingProduct
    );
    setProducts(updatedProducts);
    setEditModalVisible(false);
  };

  return (
    <div className='products-page'>
      <TemplatePage title="Products">
        <div className="products-grid">
          <PlusButton onClick={toggleNewProductModal} />
          {products.map((product: any) => (
            <ProductCard 
              key={product.id} 
              onDelete={() => deleteProduct(product.id)}
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