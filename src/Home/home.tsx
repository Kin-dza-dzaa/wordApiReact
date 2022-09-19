import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar } from '../AppBar/app-bar';
import { useAuthContext } from '../hooks/useAuthContext';
import { Words } from '../Collections/collections';

const Home = ():JSX.Element => {
  const authContext = useAuthContext();
    return (
      <React.Fragment>  
        <AppBar />
        {authContext.LogState ? <></> : <Outlet />}
        {authContext.LogState ? <Words /> : <h1>Un Authorized</h1> }
      </React.Fragment>
    );
}

export default Home;