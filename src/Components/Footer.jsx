import React, { useEffect, useState } from 'react';

const Footer = () => {
    const  [array, setArray] = useState([]);
    console.log(array.sizes[0] );
    console.log(array.images[0] );
    
      useEffect(()=>{
        fetch('/product.json')
        .then(res=> res.json())
        .then(data=> setArray(data))
      } ,[])

    return (
        <div>
            
            
            
        </div>
    );
};

export default Footer;