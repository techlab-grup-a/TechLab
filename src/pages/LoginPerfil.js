import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import LogIn from "../components/Auth/LogIn";
import LogOut from "../components/Auth/LogOut";
import Modal from "react-bootstrap/Modal";
import Background from "../layout/Background";

// const LoginPerfil = ({ user, handleSetUser, handleSetToken }) => {
const LoginPerfil = ({ user, handleSetUser }) => {

  const navigate = useNavigate();
  const handleClose = () => navigate("/");

  if (!user) {
    return (
      <>
        <Modal show onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Accés</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Accedint al teu compte podràs gestionar les teves reserves!
          </Modal.Body>
          <Modal.Footer>
            <LogIn
              handleSetUser={handleSetUser}
              // handleSetToken={handleSetToken}
            />
          </Modal.Footer>
        </Modal>
        <Background />
      </>
    );
  }

  return (
    <div>
      <Background />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          position: "relative",
        }}
      >
        {/* <img src={user.imageUrl} /> */}
        <h3>Okay usuari ha accedit!</h3>
        <p>Nom: {user.name}</p>
        <p>Email: {user.email}</p>
        <br />
        <br />
        <LogOut handleSetUser={handleSetUser} />
      </div>
    </div>
  );
};

export default LoginPerfil;
