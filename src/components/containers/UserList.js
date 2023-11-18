// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from './User';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  useEffect(() => {
    // Fetch users from the API
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDeleteUser = (userId) => {
    // Delete user from the list
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  const handleAddUser = () => {
    // Add a new user to the list
    setUsers(prevUsers => [...prevUsers, newUser]);
    setNewUser({ name: '', email: '' });
  };

  return (
    <div>
      <h1>User List</h1>
      <div>
        {users.map(user => (
          <User key={user.id} user={user} onDelete={handleDeleteUser} />
        ))}
      </div>
      <div>
        <h2>Add New User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
};

export default UserList;
