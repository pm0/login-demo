import React from "react";
import Table from "react-bootstrap/Table";
import "./UsersTable.scss";

function UsersTable(props) {
  return (
    <Table bordered striped className="users-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map(user => (
          <tr key={user.email}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default UsersTable;
