import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Modal,
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  ProgressBar,
} from "react-bootstrap";
import axios from "axios";


import LogIn from "../components/Auth/LogIn";
import LogOut from "../components/Auth/LogOut";
import Background from "../layout/Background";

// import Table from "react-bootstrap/Table";
//   <Table responsive="md">
//   <thead>
//     <tr>
//       <th>Màquina</th>
//       <th>Hora</th>
//       <th>Dip heading</th>
//       <th>Table heading</th>
//       <th>Table heading</th>
//       <th>Table heading</th>
//       <th>Table heading</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td>1</td>
//       <td>Table cell</td>
//       <td>Table cell</td>
//       <td>Table cell</td>
//       <td>Table cell</td>
//       <td>Table cell</td>
//       <td>Table cell</td>
//     </tr>
//   </tbody>

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

    <div
    // className="modal show"
    // style={{ display: 'block', position: 'initial' }}

  >
    <Background />

    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}

    > 

    <Modal.Dialog
    className="bg-dark"
    >
      <Modal.Header>
        <Modal.Title>{user.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        
        <img 
          src={user.imageUrl}
          style={{
            borderRadius: "50%"
          }}
          referrerPolicy="no-referrer"
        />
        <hr></hr>
        <b>Autorització:</b> 5
      </Modal.Body>

      <Modal.Footer>
        <LogOut handleSetUser={handleSetUser} />
        {/* <Button variant="secondary">Close</Button>
        <Button variant="primary">Save changes</Button> */}
      </Modal.Footer>
    </Modal.Dialog>
    </div>

  </div>

    // <div>
    //   <Background />
    //   <div
    //     style={{
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //       backgroundColor: "rgba(255, 255, 255, 0.5)",
    //       position: "relative",
    //     }}
    //   >
    //     {/* <img src={user.imageUrl} /> */}
    //     {/* <h3>Okay usuari ha accedit!</h3>
    //     <p>Nom: {user.name}</p>
    //     <p>Email: {user.email}</p>
    //     <br />
    //     <br /> */}

    //     <Modal.Dialog>
    //             <Modal.Header closeButton>
    //               <Modal.Title>Modal title</Modal.Title>
    //             </Modal.Header>

    //             <Modal.Body>
    //               <p>Modal body text goes here.</p>
    //             </Modal.Body>

    //             <Modal.Footer>
    //               <Button variant="secondary">Close</Button>
    //               <Button variant="primary">Save changes</Button>
    //             </Modal.Footer>
    //           </Modal.Dialog>

    //     <LogOut handleSetUser={handleSetUser} />
    //   </div>
    // </div>
  );
};

export default LoginPerfil;
