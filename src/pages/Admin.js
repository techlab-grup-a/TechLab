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
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
// import { MDBBadge, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
// import { TextField, MenuItem, InputLabel } from "@mui/material";

// import { browserHistory } from "react-router"; // Al fer REFRESH S'HA DE CONTEMPLAR I "TANCAR SESSIO O POSAR ADMIN = FALSE"
// import { tableBodyClasses } from "@mui/material";

const Admin = ({ user }) => {
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
  const [search, setSearch] = useState('');

  // Dades usuari
  const [auth, setAuth] = useState('');
  const [nfc_id, setNfcId] = useState('');


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

  const handleModifyData = (usuari) => {
    console.log(usuari);

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
    console.log(
      "Usuari: ",
      usuari,
      usuari.id,
      usuari.nom_complert,
      usuari.email,
      usuari.role,
      usuari.auth,
      usuari.nfcid
    );
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

 

  // window.onload = function() {
  //   console.log('adeuuuu')

  // };

  // if(sessionStorage.reload && history.location.pathname!=='/') {
  //   console.log(this.props);
  //     sessionStorage.reload = "";
  //     history.push('/');
  //   }

  return (
    <Container>
      <Form>
        <InputGroup>
          <Form.Control
            onChange={(e) => {
              setSearch(e.target.value);
              console.log(e.target.value);
            }}
            placeholder="Buscar"
          />
        </InputGroup>
      </Form>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th></th>
            {/* <th>Id</th> */}
            <th>Nom</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Auth</th>
            <th>NFC_ID</th>
            {/* <th>EDITA</th> */}
          </tr>
        </thead>

        <tbody>
          {usuaris
            .filter((usuari) => {
              return search.toLowerCase() === ""
                ? usuari
                : usuari.nom_complert
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase());
            })
            .map((usuari, indx) => (
              <tr 
              key={usuari.id}
              onClick={(e) => {
                handleModifyData(usuari);
                console.log('holaaaaa:', usuari)
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

            
            <Form style={{margin: "20px 0px 20px 0px"}}>
              <InputGroup>
                <Form.Control
                  onChange={(e) => {
                    // setSearch(e.target.value);
                    console.log(e.target.value);
                  }}
                  placeholder="NFC_ID"
                />
              </InputGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="rounded-pill w-100"
              variant="primary"
              onClick={handleClick}
            >
              Modificar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );

  //   return (
  //     <div
  //       style={{
  //         margin: "20px",
  //       }}
  //     >
  //       <h1>Maquines</h1>
  //       <div
  //         style={{
  //           display: "flex",
  //           justifyContent: "space-around",
  //           alignItems: "center",
  //         }}
  //       >
  //         <Row xs={1} md={4} className="g-8">
  //           {maquines.map((maq, idx) => (
  //             <Col>
  //               <Card>
  //                 <Card.Body
  //                   style={{
  //                     alignItems: "center",
  //                   }}
  //                 >
  //                   <Card.Img
  //                     style={{
  //                       maxWidth: "250px",
  //                     }}
  //                     variant="top"
  //                     src={require(`../assets/maquines/${maq.image_url}`)}
  //                   />
  //                   <Card.Title>{maq.nom}</Card.Title>
  //                   <Card.Text>{maq.id_lab}</Card.Text>

  //                   <Button
  //                     className="rounded-pill w-100"
  //                     variant="success"
  //                     id={maq.id}
  //                     value={maq.nom}
  //                   >
  //                     Activar
  //                   </Button>
  //                   <Button
  //                     className="rounded-pill w-100"
  //                     variant="danger"
  //                     id={maq.id}
  //                     value={maq.nom}
  //                   >
  //                     Desactivar
  //                   </Button>
  //                   <h3>
  //                     Corrent{" "}
  //                     <span class="label label-default">Valor corrent</span>
  //                   </h3>
  //                   <Status>
  //                     {(() => {
  //                       switch (maq.status) {
  //                         case false:
  //                           return <StatusIndicator color="#F17E7E" />; //vermell
  //                         case true:
  //                           return <StatusIndicator color="#75C282" />; //verd
  //                         default:
  //                           return <StatusIndicator color="#FFD056" />; //groc
  //                       }
  //                     })()}
  //                   </Status>
  //                 </Card.Body>
  //               </Card>
  //             </Col>
  //           ))}
  //         </Row>
  //       </div>

  //       <h1>Usuaris</h1>
  //       <div>
  //         <MDBTable>
  //           <MDBTableHead class="table-dark">
  //             <tr>
  //               <th scope="col">#</th>
  //               <th scope="col">ID</th>
  //               <th scope="col">NOM</th>
  //               <th scope="col">MAIL</th>
  //               <th scope="col">ROL</th>
  //               <th scope="col">AUTH</th>
  //               <th scope="col">NFCID</th>
  //               <th scope="col">EDITA</th>
  //             </tr>
  //           </MDBTableHead>
  //           <MDBTableBody>
  //             {usuaris.map((usuari, indx) => (
  //               <tr>
  //                 <th scope="row">{indx}</th>
  //                 <td>{usuari.id}</td>
  //                 <td>{usuari.nom_complert}</td>
  //                 <td>{usuari.email}</td>
  //                 <td>{usuari.role}</td>
  //                 <td>{usuari.auth}</td>
  //                 <td>{usuari.nfcid}</td>
  //                 <td>
  //                   <button  onClick={(e) => handleModifyData(usuari)}>
  //                     <i><FontAwesomeIcon icon={solid('edit')} /></i>
  //                   </button>
  //                 </td>
  //               </tr>
  //             ))}
  //           </MDBTableBody>
  //         </MDBTable>
  //       </div>
  //       {showModal && (
  //         <Modal show onHide={handleClose} centered>
  //           <Modal.Header closeButton>
  //             <Modal.Title>{usuari.nom}</Modal.Title>
  //           </Modal.Header>
  //           <Modal.Body>
  //             <div class="mt-3">
  //               <div class="form-outline form-white mt-3">
  //                 <input ref={inputAuth} type="text" id="formWhite" class="form-control" />
  //                 <label class="form-label" for="formWhite"  >AUTH</label>
  //               </div>
  // {/*               <TextField
  //                 ref={inputAuth}
  //                 id="auth"
  //                 select
  //                 label="AUTH"
  //                 defaultValue={usuari.auth}
  //               >
  //                 {authorization.map((option) => (
  //                   <MenuItem key={option.value} value={option.value}>
  //                     {option.value}
  //                   </MenuItem>
  //                 ))}
  //               </TextField> */}
  //             </div>
  //             <div class="mt-3" >
  //               <div class="form-outline form-white mt-3">
  //                 <input ref={inputNFCID} type="text" id="formWhite" class="form-control" />
  //                 <label class="form-label" for="formWhite"  >NFCID</label>
  //               </div>
  //             </div>

  // {/*             <div class="mt-3"><TextField id="nfcid" type="text" label="NFCID" defaultValue={usuari.nfcid} variant="standard" /></div>
  //  */}
  //           </Modal.Body>
  //           <Modal.Footer>
  //             <Button
  //               className="rounded-pill w-100"
  //               variant="primary"
  //               onClick={handleClick}
  //             >
  //               Acceptar canvis
  //             </Button>
  //           </Modal.Footer>
  //         </Modal>
  //       )}
  //     </div>
  //   );
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
