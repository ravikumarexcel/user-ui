// Example Navigation component with react-bootstrap
import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function Navigation() {
  const navigate = useNavigate();
  // const [token, setToken] = useState(null);
  const tokenObject = { 'Role': '', 'Issuer': '', 'Username': '', 'exp': '', 'iat': '' };
  const [decodedToken, setDecodedToken] = useState(tokenObject);

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    navigate('/auth/login');
  }

  useEffect(() => {
    // Check if a token exists in local storage
    const storedToken = localStorage.getItem('token');
    console.log(storedToken);

    if (storedToken) {

      const decoded = jwtDecode(storedToken);
      setDecodedToken(decoded);
      console.log(decoded);
      // setDecodedToken(decoded);
    }
  }, [])

  return (
    <header>
      <Navbar className='p-2' bg="light" expand="lg">
        <Navbar.Brand href="/">User Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>
                <FontAwesomeIcon icon={faHome} />
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/dashboard">
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="mr-auto">

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {decodedToken.Username}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#" onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Navigation;
