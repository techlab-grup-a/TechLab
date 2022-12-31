import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderNavBar from "./pages/HeaderNavBar";
import Home from "./pages/Home";
import LoginPerfil from "./pages/LoginPerfil";
import Maquines from "./pages/Maquines";
import NoPage from "./pages/NoPage";
import Reserves from "./pages/Reserves";

export default function App() {
  const [user, setUser] = useState(null);
  const handleSetUser = (usr) => {
    console.log("[handleSetUser] User set to:", usr);
    setUser(usr);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeaderNavBar user={user}/>}>
          <Route index element={<Home />} />
          {user && <Route path="reserves" element={<Reserves user={user}/>} />}
          <Route 
            path="maquines" 
            element={<Maquines user={user}/>} />
          <Route 
            path="perfil" 
            element={
            <LoginPerfil 
              user={user}
              handleSetUser={handleSetUser}
            />
            } 
          />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}