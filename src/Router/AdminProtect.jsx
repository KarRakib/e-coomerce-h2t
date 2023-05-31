import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const AdminProtect = ({children}) => {
    const {user, loader} = useContext(UserContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)
    const location = useLocation();
    if(loader|| isAdminLoading){
        return <h1>Loading</h1>
    }
    if(user && isAdmin){
        return children;
    }
return <Navigate to='/login' state={{from:location}} replace />
};

export default AdminProtect;