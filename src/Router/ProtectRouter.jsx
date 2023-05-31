import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../Context/AuthContext';

// eslint-disable-next-line react/prop-types
const ProtectRouter = ({children}) => {
    const {user,loader}= useContext(UserContext)
    const location = useLocation()
    if(loader){
        return <h1>ppp</h1>
    }
    if(user){
        return children
    }
    return <Navigate to='/login' state={{from:location}} replace />
};

export default ProtectRouter;