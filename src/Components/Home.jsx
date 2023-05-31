import React from 'react';
import HeroBanner from './HeroBanner';
import Product from './Product';

const Home = ({products}) => {
  console.log(products);

  return (
    <div>
      <HeroBanner />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {products.map((product) => <Product key={product._id} product={product} />)}
      </div>
    </div>
  );
};

export default Home;