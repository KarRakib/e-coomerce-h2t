import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Nav from './Nav'

const Layout = () => {
    return (
        <div>
            {/* <Navbar></Navbar> */}
            {/* <Nav></Nav> */}
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Layout;