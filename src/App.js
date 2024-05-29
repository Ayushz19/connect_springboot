// src/App.js

import React, { useEffect, useState } from 'react';
import AddUserForm from './components/AddUserForm';
import Userlist from './components/Userlist';
import GoogleLoginComponent from './components/GoogleLogin';


function App() {
  const [isAddUserFormVisible, setIsAddUserFormVisible] = useState(false);
  const handleAddUser = (newUser) => {
    // Send a POST request to your Spring Boot backend to add the new user
    fetch('http://localhost:8080/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(data => {
      console.log('New user added:', data);
      // Optionally, update the UI or perform any other actions
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch(error => console.error('Error adding user:', error));
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const handleLogin = (authenticated, profile) => {
    setIsAuthenticated(authenticated);
    setUserProfile(profile);
  };
 


  return (
    <div>
      <div>
      
       </div>
   <Userlist />
   
   <button onClick={() => setIsAddUserFormVisible(true)}>Add User</button>
       <AddUserForm onAdd={handleAddUser} isVisible={isAddUserFormVisible} />
    </div>
  );
}

export default App;
