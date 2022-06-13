import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function NavBar() {
  const [user, setUser] = useState({ Email: "", Password: "" });
  useEffect(() => {
    var localData = localStorage.getItem("userData");
    var parsedData = JSON.parse(localData);
    setUser(parsedData);
  }, []);

  function LogOut() {
    localStorage.removeItem("userData");
    window.location.reload();
  }

  function LoggedIn(props) {
    if (user == null) {
      return (
        <Nav>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register" className="btn btn-outline-primary">
            Register
          </Nav.Link>
        </Nav>
      );
    } else {
      return (
        <Nav>
          <NavDropdown title={`Hello ${user.UserName}`} id="basic-nav-dropdown">
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <Button className="btn btn-warning w-100" onClick={LogOut}>
              Log Out
            </Button>
          </NavDropdown>
        </Nav>
      );
    }
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">mailGo</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/categorie">Categories</Nav.Link>
            <Nav.Link href="/offer">Offers</Nav.Link>
            <Nav.Link href="/subscriber">Subscribers</Nav.Link>
            <NavDropdown title={`Mail Transactions`} id="basic-nav-dropdown">
              <NavDropdown.Item href="/send-email">Send Email</NavDropdown.Item>
              <NavDropdown.Item href="/sent-messages">
                Sent Messages
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {LoggedIn()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
