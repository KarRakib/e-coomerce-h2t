import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import Product from './Product';
import { AddContext } from '../Context/ProductContext';
import { UserContext } from '../Context/AuthContext';
import { useEffect } from 'react';


// eslint-disable-next-line react/prop-types
const ProductDetails = ({ products }) => {
    const {user} = useContext(UserContext)
    const productDetails = useLoaderData();
    const [justCheck, setJustCheck] = useState()
    const { image, name, price } = productDetails;
    const [index, setIndex] = useState(0);
    const { incQty, decQty, qty, addToCart } = useContext(AddContext)
    useEffect(()=>{
        fetch('/products.json')
        .then(res=>res.json())
        .then(data=> setJustCheck(data))
    },[])
    const images = [{
        img: 'https://i.ibb.co/T4LWR3W/speaker1.webp'
    }, {
        img: 'https://i.ibb.co/yszJ8tF/headphones-c-4.webp'
    }, {
        img: 'https://i.ibb.co/gMKKdWb/headphones-c-3.webp'
    }]
    console.log(images);
    
    return (
        <div>
            <div className='product-detail-container'>
                <div>
                    <div className='image-container'>
                        <img className='product-detail-image'
                            src={image} alt="" />
                    </div>
                    <div className='small-images-container'>
                        {images?.map((item, i) => (
                            <img
                                key={i}
                                src={item.img}
                                className={i === index ? 'small-image selected-image' : 'small-image'}
                                onMouseEnter={() => setIndex(i)}
                            />
                        ))}
                    </div>
                </div>
                <div className='product-details-desc'>
                    <h1>{name} </h1>
                    <div className='reviews'>
                        <div className='flex'>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p> (7)</p>
                    </div>
                    <h4>Details</h4>
                    <p>Details</p>
                    <p className='price'>{price} </p>
                    <div className='quantity'>
                        <h3>Quantity</h3>
                        <p className='quantity-desc flex h-8 items-center '>
                            <span onClick={decQty} className='minus '><AiOutlineMinus /> </span>
                            <span className='num'>{qty} </span>
                            <span onClick={incQty} className='plus'><AiOutlinePlus /> </span>
                        </p>
                    </div>
                    <div className='buttons'>
                        <button disabled={!user?.email} onClick={() => addToCart(productDetails, qty)} type='button' className='add-to-cart'>Add to cart</button>
                        <button onClick='/' type='button' className='buy-now'>buy now </button>

                    </div>
                </div>
            </div>

            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products?.map((item) => (
                            <Product key={item._id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;