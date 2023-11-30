// UserList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Dropdown } from 'react-bootstrap';
import './UserList.css';

const User = ({ user, onDelete }) => {
  const handleDelete = () => {
    onDelete(user);
  };

//   return (
//     <td>
//       <div className="float-right">
//         <Button variant="danger" onClick={handleDelete}>
//           Delete
//         </Button>
//       </div>
//     </td>
//   );
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState({ id: null, name: '', email: '', phone: '' });

  const handleClose = () => setShow(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // Fetch users from the API
    axios.get('http://localhost:3002/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDeleteUser = () => {
    // Delete user from the API
    axios.delete(`http://localhost:3002/users/${selectedItem.id}`)
      .then(response => {
        // If the deletion was successful, update the local state
        setUsers(prevUsers => prevUsers.filter(user => user.id !== selectedItem.id));
        setShowDelete(false);
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        // Handle the error if needed
      });
  };

  const handleAddUser = () => {
    // Add a new user to the API
    axios.post('http://localhost:3002/users', newUser)
      .then(response => {
        // If the addition was successful, update the local state
        setUsers(prevUsers => [...prevUsers, response.data]);
        setNewUser({ name: '', email: '', phone: '' });
        setShow(false); // Close the modal after adding a new user
      })
      .catch(error => {
        console.error('Error adding user:', error);
        // Handle the error if needed
      });
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setShow(true);
  };

  const handleSelectItemDelete = (item) => {
    setSelectedItem(item);
    setShowDelete(true);
  };

  return (
    <div className="container">
      <h1>User List</h1>

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">
              <div className="float-right">
                <Button variant="primary" onClick={handleShow}>
                  Add new
                </Button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>

              <td>
                <div className="float-right">
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id={`dropdownMenuButton-${user.id}`} className="custom-dropdown-toggle">
                      <div className="three-dots">...</div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleSelectItem(user)}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleSelectItemDelete(user)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </td>

              <td>
                <User user={user} onDelete={handleSelectItemDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />

          <label>Email:</label>
          <input
            type="text"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />

          <label>Phone:</label>
          <input
            type="text"
            placeholder="Phone"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {selectedItem.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;
