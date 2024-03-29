import API_URL from "../services/config";
import React, { useState, useEffect } from "react";
import { Modal, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { addMonths } from "date-fns";
// import Background from "../layout/Background";


const Maquines = ({ user, auth }) => {
  // Universitats
  const [universitat, setUniversitat] = useState({});
  const [universitats, setUniversitats] = useState([]);

  // Maquines
  const [maquina, setMaquina] = useState({ id: "", nom: "" });
  const [maquines, setMaquines] = useState([]);

  // Control
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = React.useState(new Date());

  // Reserva
  const [reserva, setReserva] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL + "/uni/")
      .then((res) => {
        console.log(res);
        setUniversitats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(API_URL + `/maq/?id_uni=${universitat}&auth=${auth}`)
      .then((res) => {
        console.log(res);
        setMaquines(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [universitat]);

  useEffect(() => {
    let id_token = sessionStorage.getItem("id_token");

    axios
      .get(
        API_URL +
          `/res/?id_maq=${
            maquina.id
          }&dia=${date.getFullYear()}-${date.getMonth() +
            1}-${date.getDate()}&id_usr=${
            user ? user.googleId : null
          }&id_token=${id_token}`
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
  const handleReservaMaquina = (maq) => {
    console.log(user);
    if (!user) {
      navigate("/perfil");
    } else {
      setShowModal(true);
      setMaquina({ id: maq.id, nom: maq.value });
      console.log("Maq :", maq, maq.id, maq.value);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleHora = (indx) => {
    let resv = [...reserva];
    resv[indx].ocupada = !resv[indx].ocupada;
    setReserva(resv);
  };

  const handleReservaHores = () => {
    let token_type = sessionStorage.getItem("token_type");
    let access_token = sessionStorage.getItem("access_token");
    let id_token = sessionStorage.getItem("id_token");

    console.log("Usuari: ", user);
    console.log("Token_Type: ", token_type);
    console.log("Access_Token: ", access_token);
    console.log("Hores: ", reserva);

    const postConfig = {
      headers: { Authorization: `${token_type} ${access_token}` },
    };

    const postData = {
      id_maq: maquina.id,
      id_usr: user.googleId,
      dia: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      hores: reserva,
      id_token: id_token,
    };

    axios
      .post(API_URL + "/res/", postData, postConfig)
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
        setShowModal(false);
        alert(`${maquina.nom} reservada`);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
  };

  return (
    <div style={{ margin: "0px"}}>
    {/* <Background /> */}

      <div
        style={{
          margin: "20px",
        }}
      >
        {/* <h1>Universitats</h1> */}

        <div>
          <Row xs={1} md={3} className="g-4">
            {universitats.map((uni, idx) => (
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>{uni.nom}</Card.Title>
                    <Card.Text>{uni.info}</Card.Text>
                    <Button
                      value={uni.id}
                      variant="primary"
                      onClick={(e) => {
                        console.log("Clicat: ", e.target.value);
                        setUniversitat(e.target.value);
                      }}
                    >
                      Buscar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* <h1>Maquines</h1> */}

        <div
          style={{
            margin: "20px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Row xs={1} md={4} className="g-4">
            {maquines.map((maq, idx) => (
              <Col>
                <Card style={{width: "100%"}}>
                  <Card.Body
                    style={{
                      alignItems: "center"
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
                    <Card.Text>{maq.id_lab}</Card.Text>

                    <Button
                      className="rounded-pill w-100"
                      variant="primary"
                      id={maq.id}
                      value={maq.nom}
                      onClick={(e) => handleReservaMaquina(e.target)}
                    >
                      Reservar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {showModal && (
            <Modal show onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title> {maquina.nom}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <DatePicker
                  wrapperClassName="DatePicker"
                  selected={date}
                  minDate={new Date()}
                  maxDate={addMonths(new Date(), 2)}
                  onChange={(date) => {
                    console.log(date);
                    setDate(date);
                  }}
                  dateFormat="MMMM d, yyyy"
                />

                <Graella>
                  {reserva.map((resv, indx) => (
                    <Button
                      id={resv.hora}
                      variant={resv.ocupada ? "primary" : "outline-primary"}
                      className="w-100"
                      onClick={() => handleHora(indx)}
                    >
                      {resv.hora}
                    </Button>
                  ))}
                </Graella>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  className="rounded-pill w-100"
                  variant="primary"
                  onClick={handleReservaHores}
                >
                  Reservar
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

const Graella = styled.div`
  display: grid;
  width: 400px;
  height: auto;
  margin: 10px 0px 0px 0px;
  text-align: center;
  grid-template-rows: 50px 50px 50px 50px;
  grid-template-columns: 100px 100px 100px 100px;
  grid-gap: 20px;
`;

export default Maquines;
