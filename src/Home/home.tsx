import React from 'react';
import { LoginForm } from '../LoginForm/login-form';
import AppBar from '../AppBar/app-bar';

const HomePage = ():JSX.Element => {
  return (
    <React.Fragment>
    <AppBar />
    <LoginForm />
    </React.Fragment>
  );
}

export default HomePage;