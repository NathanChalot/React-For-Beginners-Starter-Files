import React from 'react';

const Login = () => {
  return (
    <nav className="login">
      <h2>Login</h2>
      <p>Sign in to manage your store's inventory.</p>
      <button className="github">
        Login with Github.
      </button>
      <button className="facebook">
        Login with Facebook.
      </button>
      <button className="twitter">
        Login with Twitter.
      </button>
    </nav>
  );
};

export default Login;
