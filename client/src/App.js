import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import Signup from './scenes/Signup';
import Login from './scenes/login';
import EventCreation from './scenes/eventcreation';
import Signup1 from './scenes/Signup1';
import Budget from './scenes/budget';
import GiftExchange from './scenes/giftExchange';
import Layout from './scenes/layout';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path='/' element={<Signup/>} />
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
