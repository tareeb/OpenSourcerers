import React, { useState } from 'react';
import { auth, googleProvider } from '../firebasex';

import toast, { Toaster,  } from 'react-hot-toast';

import account_img from "../images/account.png";
import google_img from  "../images/google.png";

import { Base_Url } from "../API"
import { useEffect  } from "react"

import './Signin.css';

const LoginComponent = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [Token, setToken] = useState();
    const [signIn, setSignIn] = useState(false)
    

    const storedUsername = localStorage.getItem("username");
    const storedId = localStorage.getItem("id");
    const storedUuid = localStorage.getItem("uuid");

    useEffect(() => {
      if (storedUsername) {
        setSignIn(true);
      }
    }, [isOpen]);
   
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleGoogleLogin = async () => {
      try {
        await auth.signInWithPopup(googleProvider);
        const user = auth.currentUser;
        const idToken = await user.getIdToken();
        console.log('JWT Token:', idToken);
        setToken(idToken);
      } catch (error) {
        toast.error('Error Connecting with Google');
        console.error(error.message);
      }

    };

    useEffect(() => {
      if (Token) {
        console.log("Token is there");
        try {
          fetch(Base_Url + "login/", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "idToken": Token }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setSignIn(true);
              localStorage.setItem("username", data.name);
              localStorage.setItem("id", data.id);
              localStorage.setItem("uuid", data.uuid);
            });
        } catch (error) {
          toast.error('Error Connecting to Server');
          console.error(error.message);
        }
      }
    }, [Token]);
    
    const logout = () => {
      localStorage.clear();
      setSignIn(false);
      auth.signOut();
    }

  return (
    <div className="dropdown">

      <button className="dropdown-toggle" onClick={toggleDropdown}>
        <img src={account_img}></img>
      </button>
      
      {isOpen && !signIn && (
        <div className="dropdown-menu">
          <button className="dropdown-item" onClick={handleGoogleLogin}>
            <img src={google_img} style={{width:"25px"}} ></img>
            <span>Login</span>
          </button>
        </div>
      )}

      {isOpen && signIn && (
        <div className="dropdown-menu">
          {storedUsername ? (
            <p className='username'>{storedUsername}</p>
          ) : null }
          <button className="dropdown-item" onClick={logout}>
            logout
          </button>
        </div>
      )}

      <Toaster position="top-right" />

    </div>  
  );
};

export default LoginComponent;
