import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '../Components/Layout';
import Home from '../Components/Home';
import ProductDetails from '../Components/ProductDetails';
import Register from '../UseAuthentication/Register';
import LogIn from '../UseAuthentication/LogIn';
import MyOrder from '../Components/Dashboard/MyOrder';
import SignUp from '../UseAuthentication/SignUp';
import ProtectRouter from './ProtectRouter';
import Product from '../Components/Product';
import AllOrders from '../Components/Dashboard/AllOrders';
import DashboardLayout from '../Components/Dashboard/DashboardLayout';
import DisplayError from './DisplayError';
import ForgetPassword from '../UseAuthentication/ForgetPassword';
import PaymentPage from '../Components/Dashboard/PaymentPage';

const Router = ({ children }) => {
    const [products, setProducts] = useState([])
    useEffect(() => {
      fetch('http://localhost:7000/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout></Layout>,
            children: [
                {
                    path: '/',
                    element: <Home products={products}></Home>
                },
                {
                    path: '/products/:id',
                    loader: ({ params }) => fetch(`http://localhost:7000/products/${params.id}`),
                    element: <ProductDetails products={products}></ProductDetails>
                },
                {
                    path:'/products',
                    element:<Product></Product>
                },
                {
                    path:'/register',
                    element:<SignUp></SignUp>
                },
                {
                    path:'/login',
                    element:<LogIn></LogIn>
                },
                {
                    path:'/my-orders',
                    element:<ProtectRouter><MyOrder></MyOrder></ProtectRouter>
                },
                {
                    path:'/payment',
                    element:<PaymentPage></PaymentPage>
                },
                {
                    path:'/forget-pass',
                    element:<ForgetPassword></ForgetPassword>
                }
            ]
        },
        {
            path:'/admin',
            element:<DashboardLayout></DashboardLayout>,
            errorElement:<DisplayError></DisplayError>,
            children:[
                {
                    path:'/admin/all-orders',
                    element:<AllOrders></AllOrders>
                },
                {
                    path:'/admin/all-user',
                    
                }
            ]
        }
    ])
    return (
        <RouterProvider router={router}>
            {children}
        </RouterProvider>
    );
};

export default Router;