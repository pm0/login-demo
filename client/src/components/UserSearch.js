import React, { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "./UserSearch.scss";
import "react-bootstrap-typeahead/css/Typeahead.css";

export default function UserSearch(props) {
  const { items, onInputChange } = props;
  const [selectedNames, setSelectedNames] = useState([]);
  const typeaheadRef = React.createRef();

  function handleSelection(values) {
    setSelectedNames(values);
    if (values.length === 1) {
      onInputChange(values[0].name);
    } else {
      onInputChange(typeaheadRef.current.getInput().value);
    }
  }

  return (
    <div className="user-search">
      <Typeahead
        id="user-search"
        placeholder="Search users by name"
        options={items}
        labelKey="name"
        selected={selectedNames}
        onChange={handleSelection}
        onInputChange={onInputChange}
        clearButton
        ref={typeaheadRef}
      />
    </div>
  );
}
