import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { getIsAuth, signInUser } from '../api/auth';
import { useNotification } from '../hooks';

export const AuthContext = createContext();

const defaultAuthInfo = {
    profile: null,
    isLoggedIn: false,
    isPending: false,
    error: ''
}

function AuthProvider({children}) {

    const [authInfo,setAuthInfo] = useState({...defaultAuthInfo})
    const {updateNotification} = useNotification()

    const navigate = useNavigate()

    const handleLogin = async (email , password) => {

        setAuthInfo({...authInfo, isPending: true})

        const {error , user } = await signInUser({email, password})

        if(error){
            updateNotification('error' , error)
            return setAuthInfo({...authInfo, isPending: false, error})
        }

        navigate('/', {replace: true})

        setAuthInfo({profile: {...user}, isPending: false, isLoggedIn: true, error: "", })

        // user?.
        localStorage.setItem('auth-token', user.token)
    }

    const isAuth = async () => {
        const token = localStorage.getItem('auth-token')
        if(!token) return;

        setAuthInfo({...authInfo, isPending: true})
        const {error , user} = await getIsAuth(token);

        if(error){
            updateNotification('error' , error)
            return setAuthInfo({...authInfo, isPending: false, error})
        }

        setAuthInfo({profile: {...user}, isPending: false, isLoggedIn: true, error: "", })

    }

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        setAuthInfo({...defaultAuthInfo})
    }



    useEffect(() =>{
        isAuth();
    } , []);

    // handle logout
  return (
    <AuthContext.Provider value = {{authInfo, handleLogin, isAuth , handleLogout}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider