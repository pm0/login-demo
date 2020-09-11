import React from "react";
import faker from "faker";
import PageTemplate from "./PageTemplate";
import UsersTable from "../components/UsersTable";
import LogoutButton from "../components/LogoutButton";

const testUserData = [];
for (let i = 0; i < 50; i++) {
  const name = faker.name.findName();
  const email = faker.internet.email();
  testUserData.push({ name, email });
}

function UsersPage() {
  return (
    <>
      <PageTemplate
        title="Users List"
        heading="Demo Users List"
        noPadding
        size="lg"
      >
        <UsersTable users={testUserData} />
      </PageTemplate>
      <LogoutButton />
    </>
  );
}

export default UsersPage;
