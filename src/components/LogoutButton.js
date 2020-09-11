import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./LogoutButton.scss";

function LogoutButton() {
  let history = useHistory();

  return (
    <Button
      variant="outline-secondary"
      onClick={() => history.push("/login")}
      className="logout-button"
    >
      Log Out
    </Button>
  );
}

export default LogoutButton;
