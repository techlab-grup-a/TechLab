import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";


const HeaderNavBar = () => {
  const expand = "xl";

  return (
    <>
      <Navbar
        collapseOnSelect
        expand={expand}
        className="mb-0"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="#">TechLab UPC</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav fill className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link eventKey="1" as={Link} to={"/"}>
                Home
              </Nav.Link>
              <Nav.Link eventKey="2" as={Link} to={"/maquines"}>
                Màquines
              </Nav.Link>
              <Nav.Link eventKey="3" as={Link} to={"/reserves"}>
                Reserves
              </Nav.Link>
              <Nav.Link eventKey="4" as={Link} to={"/perfil"}>
                <FaUserCircle size={24} color={"white"} opacity={0.6} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default HeaderNavBar;
