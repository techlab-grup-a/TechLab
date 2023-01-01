import React, { useState, useEffect, useRef} from "react";
import { Modal, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { MDBBadge, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { TextField, MenuItem, InputLabel  } from '@mui/material';

import { browserHistory } from "react-router"; // Al fer REFRESH S'HA DE CONTEMPLAR I "TANCAR SESSIO O POSAR ADMIN = FALSE"
import { tableBodyClasses } from "@mui/material";

const Admin = ({ user }) => {
  const API_URL = "http://localhost:5000/";
  // Universitats
  // const [universitat, setUniversitat] = useState({});
  // const [universitats, setUniversitats] = useState([]);

  // Maquines
  const [maquina, setMaquina] = useState({ id: "", nom: "" });
  const [maquines, setMaquines] = useState([]);

  // Control
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = React.useState(new Date());

  // Usuari(s)
  const [usuaris, setUsuaris] = useState([]);
  const [usuari, setUsuari] = useState({id:"", nom_complert:"", email:"", role:"", auth:"", nfcid:""});


  // Reserv(es)
  const [reserva, setReserva] = useState([]);

/*   const authorization = [
    {
      value:1,
      label:1
    },
    {
      value:2,
      label:2
    },    
    {
      value:3,
      label:3
    },
    {
      value:4,
      label:4
    },
    {
      value:5,
      label:5
    },
  ];

 */

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

  const handlemModifyData = (usuari) => {
    console.log(usuari);
    setShowModal(true);
    setUsuari({ id: usuari.id, nom: usuari.nom_complert, email: usuari.email, role:usuari.role, auth:usuari.auth, nfcid:usuari.nfcid });
    console.log('Usuari: ', usuari, usuari.id, usuari.nom_complert, usuari.email, usuari.role, usuari.auth, usuari.nfcid);
    console.log("ZZZZZZZZZZZZZZZZZZZZZZZ");
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const inputAuth = useRef(null);
  const inputNFCID = useRef(null);

  function handleClick() {
    console.log("Auth: ", inputAuth.current.value);
    console.log("NFCID: ", inputNFCID.current.value);

    const postData = {
      auth: usuari.auth,
      nfcid: usuari.nfcid,
    };

    axios
      .post(API_URL + "/usr/", postData)
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
        setShowModal(false);
        alert(`${usuari.nom_complert} actualitzat`);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
  };


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
                        case false:
                          return <StatusIndicator color="#F17E7E" />; //vermell
                        case true:
                          return <StatusIndicator color="#75C282" />; //verd
                        default:
                          return <StatusIndicator color="#FFD056" />; //groc
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
          <MDBTableHead class="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">NOM</th>
              <th scope="col">MAIL</th>
              <th scope="col">ROL</th>
              <th scope="col">AUTH</th>
              <th scope="col">NFCID</th>
              <th scope="col">EDITA</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {usuaris.map((usuari, indx) => (
              <tr>
                <th scope="row">{indx}</th>
                <td>{usuari.id}</td>
                <td>{usuari.nom_complert}</td>
                <td>{usuari.email}</td>
                <td>{usuari.role}</td>
                <td>{usuari.auth}</td>
                <td>{usuari.nfcid}</td>
                <td>
                  <button  onClick={(e) => handlemModifyData(usuari)}>
                    <i><FontAwesomeIcon icon={solid('edit')} /></i>
                  </button>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
      {showModal && (
        <Modal show onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{usuari.nom}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="mt-3">
              <div class="form-outline form-white mt-3">
                <input ref={inputAuth} type="text" id="formWhite" class="form-control" />
                <label class="form-label" for="formWhite"  >AUTH</label>
              </div>
{/*               <TextField
                ref={inputAuth}
                id="auth"
                select
                label="AUTH"
                defaultValue={usuari.auth}
              >
                {authorization.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField> */}
            </div>
            <div class="mt-3" >
              <div class="form-outline form-white mt-3">
                <input ref={inputNFCID} type="text" id="formWhite" class="form-control" />
                <label class="form-label" for="formWhite"  >NFCID</label>
              </div>
            </div>

{/*             <div class="mt-3"><TextField id="nfcid" type="text" label="NFCID" defaultValue={usuari.nfcid} variant="standard" /></div>
 */}
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="rounded-pill w-100"
              variant="primary"
              onClick={handleClick}
            >
              Acceptar canvis
            </Button>
          </Modal.Footer>
        </Modal>
      )}
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
