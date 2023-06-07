import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import Home from './scenes/home';
import Login from './scenes/login';
import EventCreation from './scenes/eventcreation';
import Signup1 from './scenes/Signup1';
import Budget from './scenes/budget';
import GiftExchange from './scenes/giftExchange';
import Layout from './scenes/layout'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>} >
            <Route path='/' element={<Navigate to="/home" replace/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/signup1' element={<Signup1/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='eventcreate' element={<EventCreation/>} />
            <Route path='budget' element={<Budget/>} />
            <Route path='giftexchange' element={<GiftExchange/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
