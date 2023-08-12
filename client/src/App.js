import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./scenes/login";
import EventCreation from "./scenes/eventcreation";
import Signup1 from "./scenes/Signup1";
import Budget from "./scenes/budget";
import Layout from "./scenes/layout";
import Signup from "./scenes/signup";
import WelcomePage from "./scenes/welcomepage";
import Success from "./scenes/success";
import EventView from "./scenes/eventview";
import EventView1 from "./scenes/eventview1";
import Participants from "./scenes/participants";
import Invite from "./scenes/success/invite";
import EditEvent from "./scenes/eventview/editEvent";
import Login1 from "./scenes/login1";
import { MyContext } from "./Components/MyContext";
import SantaSurprise from "./scenes/santasurprise";
import Signup2 from "./scenes/signup2";
import ForgotPassword from "./Components/ResetPassword";
import { sendPasswordResetEmail } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <MyContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          sendPasswordResetEmail,
        }}
      >
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup1" element={<Signup1 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login1" element={<Login1 />} />
          <Route path="/signup2" element={<Signup2 />} />
          <Route path="/reset" element={<ForgotPassword />} />
          <Route path="/logout" element={<WelcomePage />} />
          <Route path="/*" element={<Layout />}>
            <Route path="eventcreate" element={<EventCreation />} />
            <Route path="budget" element={<Budget />} />
            <Route path="santasurprise" element={<SantaSurprise />} />
            <Route path="success" element={<Success />} />
            <Route path="eventview" element={<EventView />} />
            <Route path="eventview1" element={<EventView1 />} />
            <Route path="participants" element={<Participants />} />
            <Route path="invite" element={<Invite />} />
            <Route path="editevent" element={<EditEvent />} />
          </Route>
        </Routes>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
