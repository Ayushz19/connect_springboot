// src/components/DeleteUser.js

import React from 'react';

function DeleteUser({ userId, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      onDelete(userId);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
}

export default DeleteUser;
