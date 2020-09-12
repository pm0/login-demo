import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import PageTemplate from "../pageTemplates/PageTemplate";
import UserSearch from "../components/UserSearch";
import UsersTable from "../components/UsersTable";
import LogoutSection from "../components/LogoutSection";
import { fetchUsersList } from "../helpers/APIConnector";

function UsersPage() {
  const [testUserData, setTestUserData] = useState([]);
  const [filteredTestUserData, setFilteredTestUserData] = useState([]);
  const [fetchingUsersList, setFetchingUsersList] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetchUsersList();
      if (response) {
        setFetchingUsersList(false);
        setTestUserData(response.data);
        setFilteredTestUserData(response.data);
      }
    })();
  }, []);

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
        {fetchingUsersList ? (
          <div className="d-flex justify-content-center align-items-center">
            <h3 className="mr-4 mb-0">Loading...</h3>
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            <UserSearch
              items={testUserData}
              onInputChange={input => updateFilteredData(input)}
            />
            <UsersTable users={filteredTestUserData} />
          </>
        )}
      </PageTemplate>
      <LogoutSection />
    </>
  );
}

export default UsersPage;
