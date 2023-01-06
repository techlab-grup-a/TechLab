// import { browserHistory } from "react-router"; // Al fer REFRESH S'HA DE CONTEMPLAR I "TANCAR SESSIO O POSAR ADMIN = FALSE"
// window.onload = function() {
//   console.log('adeuuuu')

// };

// if(sessionStorage.reload && history.location.pathname!=='/') {
//   console.log(this.props);
//     sessionStorage.reload = "";
//     history.push('/');
//   }

import API_URL from "../services/config";
import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Form,
  InputGroup,
  Table,
  Modal,
  Button,
  Dropdown,
  DropdownButton,
  Badge,
  Card,
  Row,
  Col
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";


const Admin = ({ user }) => {
  const SECRET_API = "54d23618-9e0b-4574-a3e0-f7c8131d362f"
  // Usuari(s)
  const [usuaris, setUsuaris] = useState([]);
  const [usuari, setUsuari] = useState({
    id: "",
    nom_complert: "",
    email: "",
    role: "",
    auth: "",
    nfcid: "",
  });

  // Maquines
  const [maquina, setMaquina] = useState({ id: "", nom: "" });
  const [maquines, setMaquines] = useState([]);

  // Control
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = React.useState(new Date());

  // Reserv(es)
  const [reserva, setReserva] = useState([]);

  // Búsqueda
  const [searchUsuaris, setSearchUsuaris] = useState('');
  const [searchMaquines, setSearchMaquines] = useState('');

  // Dades usuari
  const [auth, setAuth] = useState('');
  const [nfc_id, setNfcId] = useState('');
  const [refetchUsuaris, setRefechUsuaris] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL + `/maq/`)
      .then((res) => {
        setMaquines(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let id_token = sessionStorage.getItem("id_token");

    axios
      .get(API_URL + `/usr/?id_token=${id_token}`)
      .then((res) => {
        console.log(res);
        setUsuaris(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refetchUsuaris]);

  const handleModifyData = (usuari) => {
    setShowModal(true);
    
    setAuth(usuari.auth);
    setNfcId(usuari.nfcid);

    setUsuari({
      id: usuari.id,
      nom: usuari.nom_complert,
      email: usuari.email,
      role: usuari.role,
      auth: usuari.auth,
      nfcid: usuari.nfcid,
    });
  };

  function handleClickPutUser() {
    const pattern = new RegExp("^$|[a-z0-9][a-z0-9][:][a-z0-9][a-z0-9]:[a-z0-9][a-z0-9][:][a-z0-9][a-z0-9]$");
    if (pattern.test(nfc_id)) {
      let id_token = sessionStorage.getItem("id_token");
      
      const putData = {
        id_token: id_token,
        id_usr: usuari.id,
        auth: auth,
        nfc_id: nfc_id
      };

      axios
        .put(API_URL + "/usr/", putData)
        .then((res) => {
          console.log("RESPONSE RECEIVED: ", res);
          setShowModal(false);
          alert('Usuari actualitzat');
          setRefechUsuaris(!refetchUsuaris)
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        });
    } else {
      alert('Format incorrecte');
    }
  }


  const handleRunMaquina = (id_maquina, run) => {
    const putData = {
      secret: SECRET_API,
      id_maq: id_maquina,
      run: run,
    };

    axios
      .put(API_URL + "/maq/", putData)
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
        alert('Resposta exitosa');
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
    
  }

  const handleSelectAuth = (e) => {
    if (e === 'auth-1') {
      setAuth(1);
    } else if (e === 'auth-2') {
      setAuth(2);
    } else if (e === 'auth-3') {
      setAuth(3);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };
 



  return (
    <Container>
      <Container>
        <Form style={{margin: "20px 0px 20px 0px"}}>
          <InputGroup>
            <Form.Control
              onChange={(e) => {
                setSearchUsuaris(e.target.value);
              }}
              placeholder="Buscar"
            />
          </InputGroup>
        </Form>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th></th>
              <th>Nom</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Auth</th>
              <th>NFC_ID</th>
            </tr>
          </thead>

          <tbody>
            {usuaris
              .filter((usuari) => {
                return searchUsuaris.toLowerCase() === ""
                  ? usuari
                  : usuari.nom_complert
                      .toLowerCase()
                      .includes(searchUsuaris.toLocaleLowerCase());
              })
              .map((usuari, indx) => (
                <tr 
                key={usuari.id}
                onClick={(e) => {
                  handleModifyData(usuari);
                }}
                >
                  <th scope="row">{indx}</th>
                  <td>{usuari.nom_complert}</td>
                  <td>{usuari.email}</td>
                  <td>{usuari.role}</td>
                  <td>{usuari.auth}</td>
                  <td>{usuari.nfcid}</td>
                </tr>
              ))}
          </tbody>
        </Table>


        {showModal && (
          <Modal show onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>{usuari.nom}</Modal.Title>
            </Modal.Header>
            <Modal.Body>


              <Container style={{display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: '20px'}}>

              <DropdownButton
                title="Auth"
                variant="outline-primary"
                onSelect={handleSelectAuth}
                >
                <Dropdown.Item eventKey="auth-1">1</Dropdown.Item>
                <Dropdown.Item eventKey="auth-2">2</Dropdown.Item>
                <Dropdown.Item eventKey="auth-3">3</Dropdown.Item>
              </DropdownButton>



                {(() => {
                  switch (auth) {
                    case 1:
                      return <Badge style={{width: "70px", heigth: '20px'}} pill bg={"success"}> {auth} </Badge>;
                    case 2:
                      return <Badge style={{width: "70px", heigth: '20px'}} pill bg={"danger"}> {auth} </Badge>;
                      case 3:
                        return <Badge style={{width: "70px", heigth: '20px'}} pill bg={"primary"}> {auth} </Badge>;
                        default:
                          return <Badge style={{width: "70px", heigth: '20px'}} pill bg={"warning"}> {auth} </Badge>;
                        }
                      })()}

              </Container>

                <InputGroup style={{margin: "20px 0px 20px 0px"}}>
                  <Form.Control
                    onChange={(e) => {
                      setNfcId(e.target.value);
                    }}
                    placeholder="NFC_ID"
                  />
                </InputGroup>

            </Modal.Body>
            <Modal.Footer>
              <Button
                className="rounded-pill w-100"
                variant="primary"
                onClick={handleClickPutUser}
              >
                Modificar
              </Button>
            </Modal.Footer>
          </Modal>
        )}


      </Container>

      <Container style={{marginBottom: "20px"}}>
        <Form>
          <InputGroup>
            <Form.Control
              onChange={(e) => {
                setSearchMaquines(e.target.value);
              }}
              placeholder="Buscar"
            />
          </InputGroup>
        </Form>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Row xs={1} md={4} className="g-8">
            {maquines
              .filter((maq) => {
                return searchMaquines.toLowerCase() === ""
                  ? maq
                  : maq.nom_uni
                      .toLowerCase()
                      .includes(searchMaquines.toLocaleLowerCase());
              })
              .map((maq, idx) => (
              <Col>
                <Card style={{marginTop: "20px"}}>
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
                    <Card.Text>
                      {maq.id_lab} <br/>
                      <b><i>Auth:</i></b> {maq.auth_min} <br/>
                      <b><i>Corrent:</i></b> {maq.corrent}
                    </Card.Text>

                    <Button
                      onClick={() => handleRunMaquina(maq.id, true)}
                      style={{marginBottom: "10px"}}
                      className="rounded-pill w-100"
                      variant="primary"
                      id={maq.id}
                      value={maq.nom}
                    >
                      Activar
                    </Button>

                    <Button
                      onClick={() => handleRunMaquina(maq.id, false)}
                      className="rounded-pill w-100"
                      variant="danger"
                      id={maq.id}
                      value={maq.nom}
                    >
                      Desactivar
                    </Button>

                  </Card.Body>
                  <Card.Footer>
                  {(() => {
                      let currentTimestamp = new Date();
                      let difference = currentTimestamp - maq.status;
                      if ( (difference / (1000 * 60)) > 5) {
                        return <Badge style={{width: "100px", heigth: '20px'}} pill bg={"warning"}> Unreachable </Badge>;
                      }  else {
                        return <Badge style={{width: "100px", heigth: '20px'}} pill bg={"primary"}> Ok </Badge>;
                      }
                      })()}
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        </Container>
    </Container>
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
