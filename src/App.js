import API_URL from "./services/config";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderNavBar from "./pages/HeaderNavBar";
import Home from "./pages/Home";
import LoginPerfil from "./pages/LoginPerfil";
import Maquines from "./pages/Maquines";
import NoPage from "./pages/NoPage";
import Reserves from "./pages/Reserves";
import Admin from "./pages/Admin";

import axios from "axios";

export default function App() {
  const [admin, setAdmin] = useState(false);
  const [auth, setAuth] = useState(null);

  const [user, setUser] = useState(null);

  const handleSetUser = (usr) => {
    console.log("[handleSetUser] User set to:", usr);
    setUser(usr);
  };

  useEffect(() => {
    if (user) {
      let id_token = sessionStorage.getItem("id_token");

      axios
        .get(API_URL + `/usr/?id_usr=${user.googleId}&id_token=${id_token}`)
        .then((res) => {
          console.log('uasuariiiiiii', res.data)
          setAdmin(res.data["role"] === "admin");
          setAuth(res.data["auth"]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeaderNavBar user={user} admin={admin} />}>
          <Route index element={<Home />} />
          {user && <Route path="reserves" element={<Reserves user={user} />} />}
          <Route path="maquines" element={<Maquines user={user} auth={auth}/>} />
          <Route path="admin" element={<Admin user={user} setAdmin={setAdmin}/>} />
          <Route
            path="perfil"
            element={
              <LoginPerfil
                user={user}
                handleSetUser={handleSetUser}
                handleSetAdmin={setAdmin}
                handleSetAuth={setAuth}
              />
            }
          />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
