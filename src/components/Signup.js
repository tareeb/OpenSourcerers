import React, { useState } from 'react';
import { auth, googleProvider } from '../firebasex';

const SignUpComponent = () => {
 
  const handleGoogleSignUp = async () => {
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
    <div>
      <h2>Sign Up with Google</h2>
      <button onClick={handleGoogleSignUp}>Sign Up with Google</button>
    </div>
  );
};

export default SignUpComponent;
