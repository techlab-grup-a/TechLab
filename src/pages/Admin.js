import API_URL from "../services/config";
import React, { useState, useEffect } from "react";
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
  Col,
} from "react-bootstrap";

import axios from "axios";

export const CustomDropdown = (props) => (
  <div className="form-group">
    <strong>{props.nom}</strong>
    <select
      className="form-control"
      name="{props.nom}"
      onChange={props.onChange}
    >
      <option defaultValue>Select {props.name}</option>
      {props.options.map((item, index) => (
        <option key={index} value={item.id}>
          {item.nom}
        </option>
      ))}
    </select>
  </div>
);

const Admin = ({ user, setAdmin}) => {
  const SECRET_API = "54d23618-9e0b-4574-a3e0-f7c8131d362f";
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
  const [maquines, setMaquines] = useState([]);

  // Control
  const [showModal, setShowModal] = useState(false);

  // Búsqueda
  const [searchUsuaris, setSearchUsuaris] = useState("");
  const [searchMaquines, setSearchMaquines] = useState("");

  // Dades usuari
  const [auth, setAuth] = useState("");
  const [nfc_id, setNfcId] = useState("");
  const [refetchUsuaris, setRefechUsuaris] = useState(false);

  // Nova màquina
  const [nom_maq, setNomMaq] = useState(null);
  const [id_maq, setIdMaq] = useState(null);
  const [url_maq, setUrlMaq] = useState(null);
  const [id_uni, setIdUni] = useState(null);
  const [id_lab, setIdLab] = useState(null);
  const [unis, setUnis] = useState([]);
  const [labs, setLabs] = useState([]);

  // Nou TechLab
  const [nom_lab, setNomLab] = useState(null);
  const [id_uni_lab, setIdUniLab] = useState(null);

  // Refresh page
  useEffect(() => {
    window.onbeforeunload = function() {
        return true;
    };

    return () => {
        window.onbeforeunload = '';
    };
}, []);

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

    const interval = setInterval(() => {
      axios
        .get(API_URL + `/maq/`)
        .then((res) => {
          setMaquines(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios
      .get(API_URL + `/uni/`)
      .then((res) => {
        setUnis(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(API_URL + `/lab/${id_uni}`)
      .then((res) => {
        setLabs(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id_uni]);

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

  const handleAddMaquina = () => {
    let id_token = sessionStorage.getItem("id_token");

    const postData = {
      id_token: id_token,
      nom_maq: nom_maq,
      url_maq: url_maq,
      id_maq: id_maq,
      id_uni: id_uni,
      id_lab: id_lab,
      auth: auth,
    };

    axios
      .post(API_URL + "/maq/", postData)
      .then((res) => {
        alert("Maquina afegida");
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
  };

  const handleAddLaboratori = () => {
    let id_token = sessionStorage.getItem("id_token");

    console.log('holalkdsjkdl', nom_lab, id_uni_lab);

    const postData = {
      id_token: id_token,
      id_lab: nom_lab
    };

    axios
      .post(API_URL + `/lab/${id_uni_lab}`, postData)
      .then((res) => {
        alert("TechLab afegit");
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
  };

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
    const pattern = new RegExp(
      "^$|[a-z0-9][a-z0-9][:][a-z0-9][a-z0-9]:[a-z0-9][a-z0-9][:][a-z0-9][a-z0-9]$"
    );
    if (nfc_id) {
      if (pattern.test(nfc_id)) {
        let id_token = sessionStorage.getItem("id_token");

        const putData = {
          id_token: id_token,
          id_usr: usuari.id,
          auth: auth,
          nfc_id: nfc_id,
        };

        axios
          .put(API_URL + "/usr/", putData)
          .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
            setShowModal(false);
            alert("Usuari actualitzat");
            setRefechUsuaris(!refetchUsuaris);
          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
          });
      } else {
        alert("Format incorrecte");
      }
    }
    else {
      let id_token = sessionStorage.getItem("id_token");

      const putData = {
        id_token: id_token,
        id_usr: usuari.id,
        auth: auth
      };

      axios
        .put(API_URL + "/usr/", putData)
        .then((res) => {
          console.log("RESPONSE RECEIVED: ", res);
          setShowModal(false);
          alert("Usuari actualitzat");
          setRefechUsuaris(!refetchUsuaris);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        });
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
        alert("Resposta exitosa");
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
  };

  const handleSelectAuth = (e) => {
    if (e === "auth-1") {
      setAuth(1);
    } else if (e === "auth-2") {
      setAuth(2);
    } else if (e === "auth-3") {
      setAuth(3);
    }
  };

  const handleClose = () => {
    setAuth(undefined);
    setShowModal(false);
  };

  return (
    <Container>

      {/* 
        
        Nova màquina 
      
      */}
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Nova màquina</Modal.Title>
          </Modal.Header>

          <Container>
            <InputGroup style={{ margin: "20px 0px 20px 0px" }}>
              <Form.Control
                onChange={(e) => {
                  setNomMaq(e.target.value);
                }}
                placeholder="Nom"
              />
            </InputGroup>

            <InputGroup style={{ margin: "20px 0px 20px 0px" }}>
              <Form.Control
                onChange={(e) => {
                  setIdMaq(e.target.value);
                }}
                placeholder="Addreça (MAC)"
              />
            </InputGroup>

            <InputGroup style={{ margin: "0px 0px 20px 0px" }}>
              <Form.Control
                onChange={(e) => {
                  setUrlMaq(e.target.value);
                }}
                placeholder="Imatge (URL)"
              />
            </InputGroup>
          </Container>

          <Container>
            <CustomDropdown
              // name={this.state.nom}
              options={unis}
              onChange={(e) => {
                console.log("unis", e.target.value);
                setIdUni(e.target.value);
              }}
            />
          </Container>

          <Container style={{ margin: "20px 0px 20px 0px" }}>
            <CustomDropdown
              // name={this.state.nom}
              options={labs}
              onChange={(e) => {
                console.log("labs", e.target.value);
                setIdLab(e.target.value);
              }}
            />
          </Container>

          <Container style={{ margin: "0px 0px 20px 0px" }}>
            <DropdownButton
              title="Auth"
              variant="outline-primary"
              onSelect={handleSelectAuth}
            >
              <Dropdown.Item eventKey="auth-1">1</Dropdown.Item>
              <Dropdown.Item eventKey="auth-2">2</Dropdown.Item>
              <Dropdown.Item eventKey="auth-3">3</Dropdown.Item>
            </DropdownButton>

            {!showModal &&
              (() => {
                switch (auth) {
                  case 1:
                    return (
                      <Badge
                        style={{ width: "70px", heigth: "20px" }}
                        pill
                        bg={"success"}
                      >
                        {" "}
                        {auth}{" "}
                      </Badge>
                    );
                  case 2:
                    return (
                      <Badge
                        style={{ width: "70px", heigth: "20px" }}
                        pill
                        bg={"danger"}
                      >
                        {" "}
                        {auth}{" "}
                      </Badge>
                    );
                  case 3:
                    return (
                      <Badge
                        style={{ width: "70px", heigth: "20px" }}
                        pill
                        bg={"primary"}
                      >
                        {" "}
                        {auth}{" "}
                      </Badge>
                    );
                  default:
                    return (
                      <Badge
                        style={{ width: "70px", heigth: "20px" }}
                        pill
                        bg={"warning"}
                      >
                        {" "}
                        {auth}{" "}
                      </Badge>
                    );
                }
              })()}
          </Container>

          <Modal.Footer>
            <Button
              onClick={handleAddMaquina}
              style={{ borderRadius: "20px" }}
              className="w-100"
              variant="primary"
            >
              Afegir
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
      
      {/* 
        
        Nou TechLab 
        
      */}
      <Container>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Nou <b><i>TechLab</i></b></Modal.Title>
          </Modal.Header>
            
            <Container>

          <InputGroup style={{ margin: "20px 0px 20px 0px" }}>
              <Form.Control
                onChange={(e) => {
                  setNomLab(e.target.value);
                }}
                placeholder="Nom"
                />
            </InputGroup>
              </Container>

            <Container style={{margin: "0px 0 20px 0px"}}>

            <CustomDropdown
              options={unis}
              onChange={(e) => {
                console.log("unis", e.target.value);
                setIdUniLab(e.target.value);
              }}
              />
              </Container>

              <Modal.Footer>
            <Button
              onClick={handleAddLaboratori}
              style={{ borderRadius: "20px" }}
              className="w-100"
              variant="primary"
            >
              Afegir
            </Button>
          </Modal.Footer>

          </Modal.Dialog>
        </div>
      </Container>


      <Container>
        <Form style={{ margin: "20px 0px 20px 0px" }}>
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
              <Container
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: "20px",
                }}
              >
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
                      return (
                        <Badge
                          style={{ width: "70px", heigth: "20px" }}
                          pill
                          bg={"success"}
                        >
                          {" "}
                          {auth}{" "}
                        </Badge>
                      );
                    case 2:
                      return (
                        <Badge
                          style={{ width: "70px", heigth: "20px" }}
                          pill
                          bg={"danger"}
                        >
                          {" "}
                          {auth}{" "}
                        </Badge>
                      );
                    case 3:
                      return (
                        <Badge
                          style={{ width: "70px", heigth: "20px" }}
                          pill
                          bg={"primary"}
                        >
                          {" "}
                          {auth}{" "}
                        </Badge>
                      );
                    default:
                      return (
                        <Badge
                          style={{ width: "70px", heigth: "20px" }}
                          pill
                          bg={"warning"}
                        >
                          {" "}
                          {auth}{" "}
                        </Badge>
                      );
                  }
                })()}
              </Container>

              <InputGroup style={{ margin: "20px 0px 20px 0px" }}>
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

      <Container style={{ marginBottom: "20px" }}>
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
                  <Card style={{ marginTop: "20px" }}>
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
                        src={maq.image_url}
                        referrerPolicy="no-referrer"
                      />
                      <Card.Title>{maq.nom}</Card.Title>
                      <Card.Text>
                        {maq.id_lab} <br />
                        <b>
                          <i>Auth:</i>
                        </b>{" "}
                        {maq.auth_min} <br />
                        <b>
                          <i>Corrent:</i>
                        </b>{" "}
                        {maq.corrent}
                      </Card.Text>

                      <Button
                        onClick={() => handleRunMaquina(maq.id, true)}
                        style={{ marginBottom: "10px" }}
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

                        // let currentTimestamp = new Date();
                        // let difference = currentTimestamp.getTime()/1000 - maq.status;
                        // console.log(
                        //   // currentTimestamp, '\n',
                        //   // currentTimestamp.getTime(), '\n',
                        //   // Date.now(), '\n',
                        //   // maq.status, '\n',
                        //   Date.now() - maq.status
                        //   );
                        
                        // let currDate = new Date();
                        if (!maq.status) {
                          return (
                            <Badge
                              style={{ width: "100px", heigth: "20px" }}
                              pill
                              bg={"warning"}
                            >
                              {" "}
                              Unreachable{" "}
                            </Badge>
                          );
                        } else {
                          return (
                            <Badge
                              style={{ width: "100px", heigth: "20px" }}
                              pill
                              bg={"primary"}
                            >
                              {" "}
                              Ok{" "}
                            </Badge>
                          );
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

export default Admin;
