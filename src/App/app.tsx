import { useQuery } from '@tanstack/react-query';
import { GetWords } from '../api/words-calls';
import { Div } from './app-styled';
import { useState } from 'react';
import React from 'react';
import { AppBar } from '../AppBar/app-bar';
import { LoginForm } from '../authorization/login-form';
import { RegistrationForm } from '../authorization/registration-form';

const App = ():JSX.Element => {
  const options: RequestInit  = {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: [["Content-type", "application/json"]],
  } 
  const [userState, setState] = useState(false);
  const result = useQuery(["words"], () => GetWords(options), {retry: false});
  if (result.isLoading) {
    return (
      <Div></Div>
    );
  }
  if (result.error) {
    return (
      <React.Fragment>
        <AppBar userState={userState} setState={setState}/>
        <LoginForm userState={userState} setState={setState}/>
        <RegistrationForm userState={userState} setState={setState}/>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <AppBar userState={userState} setState={setState}/>
      </React.Fragment>
    );
  }
}

export default App;