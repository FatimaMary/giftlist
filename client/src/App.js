import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import Login from './scenes/login';
import EventCreation from './scenes/eventcreation';
import Signup1 from './scenes/Signup1';
import Budget from './scenes/budget';
import GiftExchange from './scenes/giftExchange';
import Layout from './scenes/layout'
import Signup from './scenes/signup';
import Navbar from './Components/Navbar';
import WelcomePage from './scenes/welcomepage';
import Success from './scenes/success';
import EventView from './scenes/eventview';
import EventView1 from './scenes/eventview1';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WelcomePage/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/signup1' element={<Signup1/>} />
          <Route path='/login' element={<Login/>} />
          <Route element={<Layout/>} >
            <Route path='eventcreate' element={<EventCreation/>} />
            <Route path='budget' element={<Budget/>} />
            <Route path='giftexchange' element={<GiftExchange/>} />
            <Route path='success' element={<Success/>} />
            <Route path='eventview' element={<EventView/>} />
            <Route path='eventview1' element={<EventView1/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
