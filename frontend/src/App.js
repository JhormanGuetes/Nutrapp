//react
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

//components
import Home from './components/Home';
import User from './components/User';
import { UserProvider } from './context/UserContext';

export default function App() {

  return (
    <>
      <UserProvider>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route exact path='/' element={ <Home/> } />
            <Route path='/user' element={ <User /> } />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0px;
    }
`;