import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

import LogIn from "../components/Auth/LogIn";
import LogOut from "../components/Auth/LogOut";
import Background from "../layout/Background";

const LoginPerfil = ({ user, handleSetUser, handleSetAdmin, handleSetAuth }) => {
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
            <LogIn handleSetUser={handleSetUser} />
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
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog className="bg-dark">
          <Modal.Header>
            <Modal.Title>{user.name}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <img
              src={user.imageUrl}
              style={{
                borderRadius: "50%",
              }}
              alt="Imatge perfil"
              referrerPolicy="no-referrer"
            />
          </Modal.Body>

          <Modal.Footer>
            <LogOut
              handleSetUser={handleSetUser}
              handleSetAdmin={handleSetAdmin}
              handleSetAuth={handleSetAuth}
            />
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
};

export default LoginPerfil;
