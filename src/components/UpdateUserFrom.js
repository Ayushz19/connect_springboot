import React from "react";
import { useState, useEffect } from "react";

const UpdateUserFrom = ({ userId, onSave }) => {
  const [firstName, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/employees/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
      })
      .catch((error) => console.error("Error fetching user", error));
  }, [userId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting form...");
    const user = { firstName, lastName, email };
    console.log("Updating user:", user);


    fetch(`http://localhost:8080/api/employees/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
    .then(response =>{
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data=>{
        console.log('User updated' , data);
        onSave(data);
    })
    .catch(error =>{
        console.error('Error' ,error);
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setName(e.target.value)}
          required
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
      <button type="submit">Update User</button>
    </form>
  );
}

export default UpdateUserFrom;
