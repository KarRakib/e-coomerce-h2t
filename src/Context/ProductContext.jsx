import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from './AuthContext';
import { format } from 'date-fns';


export const AddContext = createContext()

// eslint-disable-next-line react/prop-types
const ProductContext = ({ children }) => {
    const { user } = useContext(UserContext)

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [qty, setQty] = useState(1);

    const currentDate = new Date();
    const toDay = format(currentDate, 'yyyy-MM-dd HH:mm:ss');


    const orderNumber = Math.floor(Math.random() * 1000000) + 1;
    let foundProduct;
    let index;
    const addToCart = (product, quantity) => {
        console.log(cartItems, totalPrice);
        if (user?.email) {
            const alreadyAddProduct = cartItems.find(cart => cart._id === product._id);
            setTotalPrice((prevTotalPrice) => {
                return prevTotalPrice + parseInt(product.price) * quantity
            });
            setTotalQuantity(prevQuantity => prevQuantity + quantity);

            if (alreadyAddProduct) {

                const updateCartItems = cartItems.map(cartProduct => {
                    if (cartProduct._id === product._id) return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity,
                        order: orderNumber,
                        date: toDay,
                        user: user?.email,
                        status: 'pending',

                    }
                })
                setCartItems(updateCartItems)
            }
            else {
                product.quantity = quantity;
                setCartItems([...cartItems, {
                    ...product, order: orderNumber,
                    date: toDay,
                    user: user?.email,
                    status: 'pending',

                }])
            }
            toast.success(`${qty} ${product.name}`, {
                position: toast.POSITION.TOP_RIGHT
            })
            console.log('check', cartItems);
            localStorage.setItem('item', [...cartItems, { cartItems }])
        }
        else {
            toast.success('Please login or Register')
        }
    }
    const removeCart = (product) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (confirmDelete) {
            foundProduct = cartItems.find(item => item._id === product._id)
            const newCartItems = cartItems.filter(item => item._id !== product._id);
            setTotalPrice(prvPrice => prvPrice - foundProduct.price * foundProduct.quantity);
            setTotalQuantity(prevQuantity => prevQuantity - foundProduct.quantity);
            setCartItems(newCartItems);
        }
        else {

        }
    }

    const toggleCartQuantity = (id, value) => {
        foundProduct = cartItems.find(item => item._id === id)
        index = cartItems.findIndex(product => product._id === id);
        const newCartItems = cartItems.filter(item => item._id !== id)

        if (value === 'inc') {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }])
            setTotalPrice(preTotalPrice => preTotalPrice + parseInt(foundProduct.price))
            setTotalQuantity(prvTotalQuantity => prvTotalQuantity + 1)
        } else if (value = 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }])
                setTotalPrice(prvTotalPrice => prvTotalPrice - parseInt(foundProduct.price))
                setTotalQuantity(prevQuantity => prevQuantity - 1);
            }
        }
    }
    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;

            return prevQty - 1;

        }

        );
    }
    // const orderSendData = (data) => {
    //     console.log(data);
    //     fetch('http://localhost:7000/add-order', {
    //         method: 'POST',
    //         headers: { 'content-type': 'application/json' },
    //         body: JSON.stringify(cartItems)

    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.acknowledged) {
    //                 toast.success(`price: ${totalPrice} items: ${totalQuantity}`, {
    //                     position: toast.POSITION.TOP_RIGHT
    //                 })
    //                 setCartItems([])
    //                 setTotalQuantity(0)
    //                 setTotalPrice(' ')
    //             }

    //         })
    // }
    const resetCart = () => {
        setCartItems([])
        setTotalQuantity(0)
        setTotalPrice(' ')
    }
    const cartInfo = { showCart, setShowCart, cartItems,  resetCart, totalPrice, totalQuantity, setTotalQuantity, setTotalPrice, qty, incQty, decQty, addToCart, toggleCartQuantity, removeCart }
    return (
        <AddContext.Provider value={cartInfo}>
            {children}
        </AddContext.Provider>
    );
};

export default ProductContext;