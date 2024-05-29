// src/components/GoogleLogin.js

import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginComponent = ({ onLogin }) => {
  const handleSuccess = (response) => {
    console.log('Login Success:', response);
    onLogin(true, response.profileObj);
  };

  const handleFailure = (response) => {
    console.log('Login Failed:', response);
  };

  return (
    <GoogleOAuthProvider clientId="733537706684-j8vrap00rinrbc210c1n5uu4m7tvioc1.apps.googleusercontent.com">
      <div>
        <h2>Login with Google</h2>
        <GoogleLogin
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
