import React, { useState } from 'react';
import { LoginForm } from '../LoginForm/login-form';
import AppBar from '../AppBar/app-bar';
import { JsxTagNameExpression } from 'typescript';

const HomePage = ():JSX.Element => {
  const [animationState, setState]:[boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false);
  const toggleAnimation = ():void => {
    setState((currentState) => !currentState)
  }
  return (
    <React.Fragment>
    <AppBar toggleAnimation={toggleAnimation}/>
    <LoginForm animationState={animationState}/>
    </React.Fragment>
  );
}

// interface HttpMetaData {
//   method: string,
//   mode: RequestMode,
//   headers: [string, string][],
// }

// const options: HttpMetaData = {
//   method: 'GET',
//   mode: 'cors',
//   headers: [["Authorization", 
//   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMGYwZGFjNDgtNTMzMS00OTllLWFiOWMtMjMwNTBhNGUxNzliIn0.ldiF2fPBhYUFpUx8F3QCTcMCzH2vWke4DKqj2wr4t5w"],

// ],
// }

// const fetchWords = ():void => {
//   fetch("http://127.0.0.1:8000/words", options
//   ).then((response) => response.json() 
//   ).then((dataJson) => console.log(dataJson)
//   ).catch((err) => console.log(err))
// }

export default HomePage;