// UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Dropdown } from 'react-bootstrap';
import './UserList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaEllipsisV } from "react-icons/fa";

const User = ({ user, onDelete }) => {
  const handleDelete = () => {
    onDelete(user);
  };
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState({ id: null, name: '', email: '', phone: '' });

  const handleClose = () => setShow(false);
  const handleCloseDelete = () => setShowDelete(false);

  const handleShow = () => {
    setSelectedItem({ id: null, name: '', email: '', phone: '' });
    setShow(true);
  };

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
        setShow(false); // Close the modal after adding a new user
      })
      .catch(error => {
        console.error('Error adding user:', error);
        // Handle the error if needed
      });
  };

  const handleEditUser = () => {
    // Update existing user in the API
    axios.put(`http://localhost:3002/users/${selectedItem.id}`, selectedItem)
      .then(response => {
        // If the update was successful, update the local state
        setUsers(prevUsers =>
          prevUsers.map(user => (user.id === selectedItem.id ? response.data : user))
        );
        setShow(false); // Close the modal after editing a user
      })
      .catch(error => {
        console.error('Error editing user:', error);
        // Handle the error if needed
      });
  };

  const handleModalAction = () => {
    if (selectedItem.id) {
      // If an existing user is selected, perform edit
      handleEditUser();
    } else {
      // Otherwise, add a new user
      handleAddUser();
    }
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
              <div className="three-dots">
                  <FaEllipsisV className="your-custom-class" />
              </div>
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
          <Modal.Title>{selectedItem.id ? 'Edit User' : 'Add New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Name"
            value={selectedItem.id ? selectedItem.name : newUser.name}
            onChange={(e) => {
              if (selectedItem.id) {
                setSelectedItem({ ...selectedItem, name: e.target.value });
              } else {
                setNewUser({ ...newUser, name: e.target.value });
              }
            }}
          />

          <label>Email:</label>
          <input
            type="text"
            placeholder="Email"
            value={selectedItem.id ? selectedItem.email : newUser.email}
            onChange={(e) => {
              if (selectedItem.id) {
                setSelectedItem({ ...selectedItem, email: e.target.value });
              } else {
                setNewUser({ ...newUser, email: e.target.value });
              }
            }}
          />

          <label>Phone:</label>
          <input
            type="text"
            placeholder="Phone"
            value={selectedItem.id ? selectedItem.phone : newUser.phone}
            onChange={(e) => {
              if (selectedItem.id) {
                setSelectedItem({ ...selectedItem, phone: e.target.value });
              } else {
                setNewUser({ ...newUser, phone: e.target.value });
              }
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalAction}>
            {selectedItem.id ? 'Edit User' : 'Add User'}
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
            Cancel
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
