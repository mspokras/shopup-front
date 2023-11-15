import React from 'react';
import './ProductsPage.scss';
import TemplatePage from '../TemplatePage/TemplatePage';
import device_1 from '../../assets/images/device1.png'
import device_2 from '../../assets/images/device2.png'
import device_3 from '../../assets/images/device3.png'
import device_4 from '../../assets/images/device4.png'
import device_5 from '../../assets/images/device5.png'
import device_6 from '../../assets/images/device6.png'
import ProductCard from '../../widgets/ProductCard/ProductCard';
import PlusButton from '../../shared/components/Button/PlusButton/PlusButton';

const ProductsPage = () => {
  const productName = "8BitDo Retro Mechanical Keyboard, Bluetooth/2.4G/USB-C Hot Swappable Gaming Keyboard with 87 Keys, Dual Super Programmable Buttons for Windows and Android - Fami Edition";
  return (
    <div className='products-page'>
      <TemplatePage title="Products">
        <div className="products-grid">
          <PlusButton />
          <ProductCard productImage={device_1} name={productName} price="900" />
          <ProductCard productImage={device_2} name={productName} price="550" />
          <ProductCard productImage={device_3} name={productName} price="800" />
          <ProductCard productImage={device_4} name={productName} price="950" />
          <ProductCard productImage={device_5} name={productName} price="1000" />
          <ProductCard productImage={device_6} name={productName} price="750" />
          <ProductCard productImage={device_2} name={productName} price="550" />
          <ProductCard productImage={device_3} name={productName} price="800" />
          <ProductCard productImage={device_4} name={productName} price="950" />
          <ProductCard productImage={device_5} name={productName} price="1000" />
          <ProductCard productImage={device_6} name={productName} price="750" />
          <ProductCard productImage={device_2} name={productName} price="550" />
          <ProductCard productImage={device_3} name={productName} price="800" />
          <ProductCard productImage={device_4} name={productName} price="950" />
          <ProductCard productImage={device_5} name={productName} price="1000" />
          <ProductCard productImage={device_6} name={productName} price="750" />
          <ProductCard productImage={device_2} name={productName} price="550" />
          <ProductCard productImage={device_3} name={productName} price="800" />
          <ProductCard productImage={device_4} name={productName} price="950" />
        </div>
      </TemplatePage>
    </div>
  );
};

export default ProductsPage;