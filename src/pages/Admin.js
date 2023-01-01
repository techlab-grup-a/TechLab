import React, { useState, useEffect } from "react";
import { Modal, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { MDBBadge, MDBBtn } from "mdb-react-ui-kit";

import { browserHistory } from "react-router"; // Al fer REFRESH S'HA DE CONTEMPLAR I "TANCAR SESSIO O POSAR ADMIN = FALSE"

const Admin = ({ user }) => {
  const API_URL = "http://localhost:5000/";
  // Universitats
  // const [universitat, setUniversitat] = useState({});
  // const [universitats, setUniversitats] = useState([]);

  // Maquines
  const [maquina, setMaquina] = useState({ id: "", nom: "" });
  const [maquines, setMaquines] = useState([]);

  // Control
  // const [showModal, setShowModal] = useState(false);
  const [date, setDate] = React.useState(new Date());

  // Usuari(s)
  const [usuaris, setUsuaris] = useState([]);

  // Reserv(es)
  const [reserva, setReserva] = useState([]);

  useEffect(() => {
    let id_token = sessionStorage.getItem("id_token");

    axios
      .get(API_URL + `/usr/?id_token=${id_token}`)
      .then((res) => {
        console.log("USUARIIIIIIIIIIIIIIIS");
        console.log(res);
        setUsuaris(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(API_URL + `/maq/?id_uni=${universitat}`)
  //     .then((res) => {
  //       console.log(res);
  //       setMaquines(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [universitat]);

  useEffect(() => {
    axios
      .get(
        API_URL +
          `/res/?id_maq=${
            maquina.id
          }&dia=${date.getFullYear()}-${date.getMonth() +
            1}-${date.getDate()}&id_usr=${user ? user.googleId : null}`
      )
      .then((res) => {
        console.log(res);
        setReserva(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date, maquina]);

  const navigate = useNavigate();
  // const handleReservaMaquina = (maq) => {
  //   console.log(user);
  //   if (!user) {
  //     navigate("/perfil");
  //   } else {
  //     setShowModal(true);
  //     setMaquina({ id: maq.id, nom: maq.value });
  //     console.log("Maq :", maq, maq.id, maq.value);
  //   }
  // };

  // const handleClose = () => {
  //   setShowModal(false);
  // };

  // const handleHora = (indx) => {
  //   let resv = [...reserva];
  //   resv[indx].ocupada = !resv[indx].ocupada;
  //   setReserva(resv);
  // };

  // const handleReservaHores = () => {
  //   let token_type = sessionStorage.getItem("token_type");
  //   let access_token = sessionStorage.getItem("access_token");
  //   let id_token = sessionStorage.getItem("id_token");

  //   console.log("Usuari: ", user);
  //   console.log("Token_Type: ", token_type);
  //   console.log("Access_Token: ", access_token);
  //   console.log("Hores: ", reserva);

  //   const postConfig = {
  //     headers: { Authorization: `${token_type} ${access_token}` },
  //   };

  //   const postData = {
  //     id_maq: maquina.id,
  //     id_usr: user.googleId,
  //     dia: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
  //     hores: reserva,
  //     id_token: id_token,
  //   };

  //   axios
  //     .post(API_URL + "/res/", postData, postConfig)
  //     .then((res) => {
  //       console.log("RESPONSE RECEIVED: ", res);
  //       setShowModal(false);
  //       alert(`${maquina.nom} reservada`);
  //     })
  //     .catch((err) => {
  //       console.log("AXIOS ERROR: ", err);
  //     });
  // };

  // window.onload = function() {
  //   console.log('adeuuuu')

  // };

  // if(sessionStorage.reload && history.location.pathname!=='/') {
  //   console.log(this.props);
  //     sessionStorage.reload = "";
  //     history.push('/');
  //   }

  return (
    <div
      style={{
        margin: "20px",
      }}
    >
      <h1>Maquines</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Row xs={1} md={4} className="g-8">
          {maquines.map((maq, idx) => (
            <Col>
              <Card>
                <Card.Body
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Card.Img
                    style={{
                      maxWidth: "250px",
                    }}
                    variant="top"
                    src={require(`../assets/maquines/${maq.image_url}`)}
                  />
                  <Card.Title>{maq.nom}</Card.Title>
                  <Card.Text>{maq.id_lab}</Card.Text>

                  <Button
                    className="rounded-pill w-100"
                    variant="success"
                    id={maq.id}
                    value={maq.nom}
                  >
                    Activar
                  </Button>
                  <Button
                    className="rounded-pill w-100"
                    variant="danger"
                    id={maq.id}
                    value={maq.nom}
                  >
                    Desactivar
                  </Button>
                  <h3>
                    Corrent{" "}
                    <span class="label label-default">Valor corrent</span>
                  </h3>
                  <Status>
                    {(() => {
                      switch (maq.status) {
                        case 1:
                          return <StatusIndicator color="#F17E7E" />;
                        case 2:
                          return <StatusIndicator color="#FFD056" />;
                        case 3:
                          return <StatusIndicator color="#75C282" />;
                        default:
                          return <StatusIndicator color="#AAA5A5" />;
                      }
                    })()}
                  </Status>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <h1>Usuaris</h1>
      <div>
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col">Mail</th>
              <th scope="col">Rol</th>
              <th scope="col">Auth </th>
              <th scope="col">NFCID </th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {usuaris.map((usuari, indx) => (
              <tr>
                <th scope="row">{usuari.id_usr}</th>
                <td>{usuari.nom_complert}</td>
                <td>{usuari.mail}</td>
                <td>{usuari.role}</td>
                <td>{usuari.auth}</td>
                <td>{usuari.nfc_id}</td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    </div>
  );
};

const Status = styled.div`
  display: flex;
  align-items: center;
`;

const StatusIndicator = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 10px;
  margin-left: 1rem;
  position: absolute;
  right: 7rem;
`;

export default Admin;
