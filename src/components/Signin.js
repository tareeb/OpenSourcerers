import React, { useState } from 'react';
import { auth, googleProvider } from '../firebasex';
import account_img from "../images/account.png";
import './Signin.css';

const LoginComponent = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
      const handleGoogleLogin = async () => {
        try {
          await auth.signInWithPopup(googleProvider);
          const user = auth.currentUser;
          const idToken = await user.getIdToken();
          console.log('JWT Token:', idToken);
        } catch (error) {
          console.error(error.message);
        }
      };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        <img src={account_img}></img>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <button className="dropdown-item">Login</button>
          <button className="dropdown-item">Sign Up</button>
        </div>
      )}
    </div>  
  );
};

export default LoginComponent;
