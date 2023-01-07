import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  ProgressBar,
  Modal,
  InputGroup
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../services/config";

const Reserves = ({ user }) => {
  const [reserves, setReserves] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [pin, setPin] = useState(null);

  const navigate = useNavigate();
  const handleCloseModal = () => navigate("/");
  const handleCloseReserva = () => navigate("/maquines");

  useEffect(() => {
    let token_type = sessionStorage.getItem("token_type");
    let id_token = sessionStorage.getItem("id_token");

    const postConfig = {
      headers: { Authorization: `${token_type} ${id_token}` },
    };

    axios
      .get(API_URL + `/res/usr/${user.googleId}`, postConfig)
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
        setReserves(res.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
  }, [refetch]);


  const handleActivaPinMaquina = (dia, hores, id_usr, id_maq) => {
    const pattern = new RegExp("^[0-9][0-9][0-9][0-9][0-9][0-9]$");
    if (pattern.test(pin)) {
      let id_token = sessionStorage.getItem("id_token");

      const postData = {
        dia: dia,
        hores: hores,
        id_maq: id_maq,
        id_token: id_token,
        pin: pin
      };

      axios
      .post(API_URL + `/res/usr/${user.googleId}`, postData)
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
        setRefetch(!refetch);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 403) {
            alert("Pin incorrecte")
          }
        }
      });

  } else {
    alert('El pin ha de tenir 6 digits');
  }
}

  const handleCancelaReserva = (dia, hores, id_usr, id_maq) => {
    console.log(dia, hores, id_usr, id_maq)

    let id_token = sessionStorage.getItem("id_token");
      
    const putData = {
      dia: dia,
      hores: hores,
      id_maq: id_maq,
      id_token: id_token
    };

    axios
      .put(API_URL + `/res/usr/${id_usr}`, putData)
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
        alert('Reserva cancelada');
        setRefetch(!refetch)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });

  }



  if (reserves != null) {
    return (
      <div
        style={{
          margin: "20px",
        }}
      >
        {reserves.map((resv, indx) => (
          <Card
            style={{
              marginBottom: "20px",
              maxWidth: "1200px",
            }}
          >
            <Card.Header>
              <b>{resv.nom_uni}</b> | <u>{resv.id_lab}</u> <br />
              <b>Dia:</b> {resv.dia} <br />
              <b>Hora:</b> {resv.hora}
              <br />
            </Card.Header>

            <Container>
              <Card.Body>
                <Row>
                  <Col sm={4}>
                    <Card.Title>{resv.nom_maq}</Card.Title>
                    <Card.Img
                      style={{
                        maxWidth: "250px",
                      }}
                      variant="top"
                      src={require(`../assets/maquines/${resv.image_url}`)}
                    />
                  </Col>

                  <Col
                    style={{
                      alignContent: "center",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    sm={5}
                  >
                  
                    <InputGroup>
                      <Form.Control
                        style={{ margin: "0px 0px 20px 0px" }}
                        type="text"
                        placeholder="PIN"
                        // disabled={!resv["pin_actiu"] || resv["status"]}

                        onChange={(e) => {
                          setPin(e.target.value);
                        }}
                        />
                    </InputGroup>

                    <Button
                      onClick={() => handleActivaPinMaquina(
                        resv.dia,
                        resv.hora,
                        resv.id_usr,
                        resv.id_maq
                      )}
                      // disabled={!resv["pin_actiu"] || resv["status"]}
                      style={{
                        margin: "0px 0px 10px 0px",
                        borderRadius: "20px",
                      }}
                      className="w-100"
                      variant="primary"
                    >
                      Activa
                    </Button>

                    <Button
                      onClick={() => handleCancelaReserva(
                        resv.dia,
                        resv.hora,
                        resv.id_usr,
                        resv.id_maq
                      )}
                      style={{
                        margin: "0px 0px 10px 0px",
                        borderRadius: "20px",
                      }}
                      className="w-100"
                      variant="danger"
                    >
                      Cancel·lar
                    </Button>
                    
                  </Col>
                </Row>
              </Card.Body>
            </Container>

            {
            /* 
            <Card.Footer>
              <ProgressBar variant="primary" animated now={75} />
            </Card.Footer> 
            */
            }
          </Card>
        ))}
      </div>
    );
  } else {
    return (
      <Modal show centered>
        <Modal.Header closeButton onHide={handleCloseModal}>
          <Modal.Title>Ooops!</Modal.Title>
        </Modal.Header>
        <Modal.Body>No disposes de cap reserva en aquest moment.</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleCloseReserva}
            variant="outline-primary"
            className="w-100"
            style={{ borderRadius: "20px" }}
          >
            Reservar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default Reserves;
