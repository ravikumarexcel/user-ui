// src/components/User.js
import React from 'react';

const User = ({ user, onDelete }) => {
  return (
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  );
};

export default User;
