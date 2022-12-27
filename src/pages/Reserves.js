import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";

import axios from "axios";

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

const Reserves = ({ user }) => {
  const API_URL = "http://localhost:5000/";
  const [reserves, setReserves] = useState([]);
  const [pin, setPin] = useState("");

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
        setReserves(res.data)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
  }, []);

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
                  <Form.Control
                    style={{ margin: "0px 0px 20px 0px" }}
                    type="text"
                    placeholder="PIN"
                    aria-label="Disabled input example"
                    disabled={resv['pin_actiu']}
                    // readOnly
                  />
                  <Button
                    disabled={resv['pin_actiu']}
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
                    style={{
                      margin: "0px 0px 10px 0px",
                      borderRadius: "20px",
                    }}
                    className="w-100"
                    variant="danger"
                  >
                    Cancel·lar
                  </Button>
                  {/* <ProgressBar variant="primary" animated now={45} /> */}
                </Col>
              </Row>
            </Card.Body>
          </Container>

          <Card.Footer>
            <ProgressBar variant="primary" animated now={75} />
          </Card.Footer>
        </Card>

      ))}
      
    </div>
  );
};

export default Reserves;
