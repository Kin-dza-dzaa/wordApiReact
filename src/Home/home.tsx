import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar } from '../AppBar/app-bar';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = ():JSX.Element => {
  const authContext = useAuthContext();
    return (
      <React.Fragment>  
        <AppBar />
        {authContext.LogState ? <></> : <Outlet />}
      </React.Fragment>
    );
}

export default Home;