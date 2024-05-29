// src/components/AddUserForm.js

import React, { useState } from "react";

function AddUserForm({ isVisible, onAdd }) {
  const [firstName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = { firstName, lastName, email };
    onAdd(newUser);
    setName("");
    setLastName("");
    setEmail("");

    const user = { firstName, lastName, email };

    fetch("http://localhost:8080/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User added:", data);
        setName("");
        setEmail("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  if (!isVisible) return null;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Add User</button>
    </form>
  );
}

export default AddUserForm;
