import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Product = ({ product }) => {
  return (
    <div>
      <div className='product-card'>
      <Link to={`/products/${product?._id}`}>
        <img
          className='product-image'
          width={250}
          height={250}
          src={product?.image} alt="" srcSet="" />
          </Link>
       <div className='flex justify-between'>
       <p className='product-name'>{product?.name}</p>
      
        <p className='product-price'>{product?.price}Tk </p>
       </div>
      </div>

    </div>
  );
};

export default Product;