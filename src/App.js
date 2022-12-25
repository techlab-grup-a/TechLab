import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HeaderNavBar from "./pages/HeaderNavBar";
import Home from "./pages/Home";
import LoginPerfil from "./pages/LoginPerfil";
import Maquines from "./pages/Maquines";
import NoPage from "./pages/NoPage";
import Reserves from "./pages/Reserves";

// import Perfil from "./pages/Perfil";
// import Background from "./layout/Background";

export default function App() {
  const [user, setUser] = useState();
  // const [token, setToken] = useState();

  const handleSetUser = (usr) => {
    console.log("[handleSetUser] User set to:", usr);
    setUser(usr);
  };

  // const handleSetToken = (tkn) => {
  //   console.log("[handleSetToken] Token set to:", tkn);
  //   setToken(tkn);
  //   console.log("[handleSetToken] Token set to:", token);
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeaderNavBar />}>
          <Route index element={<Home />} />
          <Route path="maquines" element={<Maquines />} />
          <Route 
            path="reserves" 
            element={<Reserves user={user}/>} />
          {/* <Route path="login" element={<Login />} /> */}
          {/* <Route path="perfil" element={<Perfil />} /> */}
          <Route 
            path="perfil" 
            element={
            <LoginPerfil 
              user={user}
              // token={token}
              handleSetUser={handleSetUser}
              // handleSetToken={handleSetToken}
            />
            } 
          />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
