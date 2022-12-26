import React, {useState, useEffect} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";

const Reserves = ({ user }) => {

  // useEffect(() => {

  //   axios
  //     .get(API_URL + "/uni/")
  //     .then((res) => {
  //       console.log(res);
  //       setUniversitats(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div
      style={{
        margin: "20px",
      }}
    >
      <h1>Reserves</h1>

      <Table responsive="md">
        <thead>
          <tr>
            <th>Màquina</th>
            <th>Hora</th>
            <th>Dip heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
        </tbody>
      </Table>

      <Card
        style={{
          marginBottom: "20px",
          maxWidth: "1200px",
        }}
      >
        <Card.Header> 
          <b>EPSEM</b> | <u>Lab-1</u> <br/>
          <b>Dia:</b> 26/12/2022 <br/>
          <b>Hora:</b> 8-10<br/>

        </Card.Header>

        <Container>
          <Card.Body>
            <Row>
              <Col sm={4}>
                <Card.Title>Fresadora</Card.Title>
                <Card.Img
                  style={{
                    maxWidth: "250px",
                  }}
                  variant="top"
                  src={require(`../assets/maquines/fresadora.jpg`)}
                />
              </Col>

              <Col sm={5}>
                <Form.Control
                  style={{margin: "0px 0px 20px 0px"}}
                  type="text"
                  placeholder="PIN"
                  aria-label="Disabled input example"
                  disabled={false}
                  // readOnly
                />
                <Button
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


      <Card
        style={{
          marginBottom: "20px",
          maxWidth: "1200px",
        }}
      >
        <Card.Header> 
          <b>EPSEM</b> | <u>Lab-1</u> <br/>
          <b>Dia:</b> 26/12/2022 <br/>
          <b>Hora:</b> 8-10<br/>

        </Card.Header>

        <Container>
          <Card.Body>
            <Row>
              <Col sm={4}>
                <Card.Title>Fresadora</Card.Title>
                <Card.Img
                  style={{
                    maxWidth: "250px",
                  }}
                  variant="top"
                  src={require(`../assets/maquines/impressora.jpg`)}
                />
              </Col>

              <Col 
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column"
                }}
              sm={5}>
                <Form.Control
                  style={{margin: "0px 0px 20px 0px"}}
                  type="text"
                  placeholder="PIN"
                  aria-label="Disabled input example"
                  disabled={false}
                  // readOnly
                />
                <Button
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
    </div>
  );
};

export default Reserves;
