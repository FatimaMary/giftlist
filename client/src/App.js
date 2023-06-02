import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './scenes/Signup';
import Login from './scenes/login';
import EventCreation from './scenes/eventcreation';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='eventcreate' element={<EventCreation/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
