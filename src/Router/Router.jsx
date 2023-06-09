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
import AdminProtect from './AdminProtect';
import Product from '../Components/Product';
import AllOrders from '../Components/Dashboard/AllOrders';
import DashboardLayout from '../Components/Dashboard/DashboardLayout';
import DisplayError from './DisplayError';
import ForgetPassword from '../UseAuthentication/ForgetPassword';
import PaymentPage from '../Components/Dashboard/PaymentPage';
import MyOrderView from '../Components/Dashboard/MyOrderView';
import OrderView from '../Components/Dashboard/OrderView';
import AddProducts from '../Components/Dashboard/AddProducts';
import AddBestSell from '../Components/Dashboard/AddBestSell';

// eslint-disable-next-line react/prop-types
const Router = ({ children }) => {
    const [products, setProducts] = useState([])
    useEffect(() => {
      fetch('http://localhost:7000/prod')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])
    console.log(products);
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
                    loader: ({ params }) => fetch(`http://localhost:7000/prod/${params.id}`),
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
                    path:'/my-orders/:id',
                    loader:({params})=>fetch(`http://localhost:7000/my-orders/${params.id}`),
                    element:<MyOrderView></MyOrderView>
                },
                {
                    path:'/forget-pass',
                    element:<ForgetPassword></ForgetPassword>
                }
            ]
        },
        {
            path:'/admin',
            element:<AdminProtect><DashboardLayout/> </AdminProtect>,
            errorElement:<DisplayError></DisplayError>,
            children:[
                {
                    path:'/admin/all-orders',
                    element:<AllOrders></AllOrders>
                },
                {
                    path:'/admin/all-orders/:id',
                    loader:({params})=> fetch(`http://localhost:7000/my-orders/${params.id}`),
                    element:<OrderView></OrderView>
                },
                {
                    path:'/admin/all-user',
                    
                },
                {
                    path:'/admin/add-products',
                    element:<AddProducts></AddProducts>
                },
                {
                    path:'/admin/add-sell',
                    element:<AddBestSell></AddBestSell>
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