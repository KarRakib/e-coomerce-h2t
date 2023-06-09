import { useEffect, useState } from "react";


const useToken = (email) => {
    const [token ,setToken] = useState('')
    useEffect(()=>{
        fetch(`http://localhost:7000/jwt?eamil=${email}`)
        .then(res=> res.json())
        .then(data=> {
            if(data.accessToken){
                localStorage.setItem('h2t-token',data.accessToken)
                setToken(data.accessToken)
            }
        })
    },[email])
    return [token]
};

export default useToken;