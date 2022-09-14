import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginForm } from './Authorization/login-form';
import { RegistrationForm } from './Authorization/registration-form';
import { AuthProvider } from './context/auth-state-provider';
import Home from './Home/home';

const App = ():JSX.Element => {
    return (
      <React.Fragment>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Home />}>
              <Route path='sign-in' element={<LoginForm />}/>
              <Route path='sign-up' element={<RegistrationForm />}/>
            </Route>
          </Routes>
        </AuthProvider>
      </React.Fragment>
    );

}

export default App;