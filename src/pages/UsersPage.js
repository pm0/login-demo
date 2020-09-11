import React, { useState } from "react";
import faker from "faker";
import PageTemplate from "./PageTemplate";
import UserSearch from "../components/UserSearch";
import UsersTable from "../components/UsersTable";
import LogoutButton from "../components/LogoutButton";

const testUserData = [];
for (let i = 0; i < 50; i++) {
  const name = faker.name.findName();
  const email = faker.internet.email();
  testUserData.push({ name, email });
}

function UsersPage() {
  const [filteredTestUserData, setFilteredTestUserData] = useState(
    testUserData
  );

  function updateFilteredData(input) {
    if (input) {
      setFilteredTestUserData(
        testUserData.filter(user =>
          user.name.toLowerCase().includes(input.toLowerCase())
        )
      );
    } else {
      setFilteredTestUserData(testUserData);
    }
  }

  return (
    <>
      <PageTemplate title="Users List" heading="Demo Users List" size="lg">
        <UserSearch
          items={testUserData}
          onInputChange={input => updateFilteredData(input)}
        />
        <UsersTable users={filteredTestUserData} />
      </PageTemplate>
      <LogoutButton />
    </>
  );
}

export default UsersPage;
