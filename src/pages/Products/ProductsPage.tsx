import React, { useEffect, useState } from 'react';
import './ProductsPage.scss';
import TemplatePage from '../TemplatePage/TemplatePage';
import ProductCard from '../../widgets/ProductCard/ProductCard';
import PlusButton from '../../shared/components/Button/PlusButton/PlusButton';
import { IProduct, emptyProduct } from '../../entities/Product/product.models';
import ModalProducts from '../../widgets/ModalProducts/ModalProducts';
import ModalEditProduct from '../../widgets/ModalProducts/ModalEditProduct/ModalEditProduct';
import { useGetProductsQuery, useAddProductMutation, useDeleteProductMutation } from '../../entities/Product/api/productApi';

const ProductsPage = () => {
  const [isNewModalVisible, setNewModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [productToEdit, setProductToEdit] = useState<IProduct>(emptyProduct);
  const [productsBack, setProductsBack] = useState<IProduct[]>([]);
  const { data: productsBackData } = useGetProductsQuery();
  const [addProductMutation] = useAddProductMutation();
  const [deleteProductMutation] = useDeleteProductMutation();

  useEffect(() => {
    if (productsBackData) {
      setProductsBack(productsBackData);
    }
  }, [productsBackData]);

  const deleteProduct = (productId?: string) => {
    const updatedProducts = productsBack.filter((product: IProduct) => product._id !== productId);
    setProductsBack(updatedProducts);
    setEditModalVisible(false);
    productId && deleteProductMutation(productId);
  };

  const toggleNewProductModal = () => {
    setNewModalVisible(!isNewModalVisible);
  };

  const toggleEditProductModal = (product: IProduct) => {
    setEditModalVisible(!isEditModalVisible);
    setProductToEdit(product);
  }

  const handleChangeProduct = (product: IProduct) => {
    console.log(product);
    const updatedProducts = [...productsBack, { _id: productsBack.length.toString(), ...product }];
    console.log(updatedProducts);
    setProductsBack(updatedProducts);
  } 

  const handleAddProduct = (product: IProduct) => {
    const { name, description, price, images } = product

    const productData: any = {
      name,
      description: description,
      price,
      images, 
    };

    let formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price.toString());
    if (product.description) formData.append("description", product.description);
    for (let i = 0; i < product.images.length; i++) {
      formData.append("files", product.images[i]);
    };

    handleChangeProduct(product);  
    addProductMutation(formData).unwrap();
    toggleNewProductModal();
    console.log(product);
  }

  const handleEditProduct = (product: IProduct) => {
    toggleEditProductModal(product);
    // const updatedProducts = productsBack.map((existingProduct: IProduct) =>
    //   existingProduct._id === product._id ? { ...existingProduct, ...product } : existingProduct
    // );
    // setProductsBack(updatedProducts);
    // console.log(productsBack);
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
            onEditProduct={handleAddProduct} 
            onDeleteProduct={() => deleteProduct(productToEdit._id)}
            productData={productToEdit}
          />}
      </TemplatePage>
    </div>
  );
};

export default ProductsPage;