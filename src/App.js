import React from "react";
import Navbar from "./components/User/Navbar";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import EmailVerification from "./components/auth/EmailVerification";
import ForgetPassword from "./components/auth/ForgetPassword";
import ConfirmPassword from "./components/auth/ConfirmPassword";
import {Route , Routes } from 'react-router-dom';
import NotFound from "./components/NotFound";
import { useAuth } from "./hooks";
import AdminNavigator from "./navigator/AdminNavigator";

export default function App() {
  const {authInfo} = useAuth();
  console.log(authInfo);
  const isAdmin = authInfo.profile?.role === 'admin'
  console.log(isAdmin);

  if(isAdmin) return <AdminNavigator />

  return (
    <>
        <Navbar />
        
        <Routes>
            <Route path='/'  element = {<Home />}/>
            <Route path='/auth/signin'  element = {<Signin />}/>
            <Route path='/auth/signup'  element = {<Signup />}/>
            <Route path='/auth/verification'  element = {<EmailVerification />}/>
            <Route path='/auth/forget-password'  element = {<ForgetPassword />}/>
            <Route path='/auth/reset-password'  element = {<ConfirmPassword />}/>
            <Route path='*'  element = {<NotFound />}/>

        </Routes>
    </>
  )
  //<Route path='*'  element = {<NotFound />}/>
  
}
