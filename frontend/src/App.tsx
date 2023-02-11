import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Dashboard } from './pages/dashboard';

import {
  Route,
  Routes,
  redirect,
  Navigate
} from "react-router";
import Login from './pages/login';

import ServerApiProvider from './contexts/server-api-provider'
import Signup from './pages/signup';

function App() {

  return (
    <div className="App">
      <ServerApiProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace={true} />} />
          <Route path="/invitation/accept" index element={<Signup />} />
          <Route path="/dashboard" index element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </ServerApiProvider>
    </div>
  );
}

export default App;
