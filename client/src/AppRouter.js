import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/users">
          <UsersPage />
        </Route>
        <Route exact path="/">
          <RegistrationPage />
        </Route>
      </Switch>
    </Router>
  );
}
