import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { logout } from "../helpers/APIConnector";
import "./LogoutSection.scss";

function LogoutSection() {
  const history = useHistory();

  async function attemptLogout() {
    const response = await logout();
    if (response.status === 200) {
      history.push("/login");
    }
  }

  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={() => attemptLogout()}
        className="logout-button"
      >
        Log Out
      </Button>
      <Navbar
        fixed="top"
        expand="xs"
        bg="dark"
        variant="dark"
        className="logout-navbar"
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link onClick={() => attemptLogout()}>Log out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default LogoutSection;
