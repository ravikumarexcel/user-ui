// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from './User';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '' });

    const [show, setShow] = useState(false);
    const [showdelete, setShowdelete] = useState(false);

    const handleClose = () => setShow(false);
    const handleCloseDelete = () => setShowdelete(false);
    const handleShow = () => setShow(true);
    // const handleShowdelete = () => setShowdelete(true);

    const [selectedItem, setSelectedItem] = useState({ name: '', email: '' });


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
    // Event handler for selecting an item
    const handleSelectItem = (item) => {
        setSelectedItem(item);
        console.log(item);
        setShow(true);
    };
    // Event handler for selecting an item
    const handleSelectItemDelete = (item) => {
        setSelectedItem(item);
        console.log(item);
        setShowdelete(true);
    };

    return (
        <div className="container">
            <div class="row">
                <div class="col">
                    <h1>User List</h1>
                </div>
                <div class="col">
                </div>
                <div class="col">
                </div>
            </div>


            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">
                            <div class="float-right">
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
                                <div class="float-right">
                                    <button type="button" class="btn btn-primary" onClick={() => handleSelectItem(user)}>Edit</button>
                                    <button type="button" class="btn btn-secondary ms-2" onClick={() => handleSelectItemDelete(user)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!
                    {selectedItem.name}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showdelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete!
                    {selectedItem.name}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDeleteUser}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
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
