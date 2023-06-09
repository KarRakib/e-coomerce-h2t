import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../Context/AuthContext';
import {  useRouteError } from 'react-router-dom';

const DisplayError = () => {
    const error = useRouteError();
    
    return (
        <div>
             <p className='text-red-500'>Something went wrong!!!</p>
            <p className='text-red-400'>{error.statusText || error.message}</p>
            <h4 className="text-3xl"> Please <button onClick={()=> auth.signOut()}>Sign out</button> and log back in</h4>
        </div>
    );
};

export default DisplayError;