import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { getDocument } from '../../services/firestoreService';
import logo from '../../assets/images/logo.webp';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      
      try {
        const data = await getDocument('users', currentUser.uid);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img 
            src={logo}
            alt="AI Tutoring Platform" 
            height="30" 
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            <NavDropdown title="Subjects" id="subjects-dropdown">
              <NavDropdown.Item as={NavLink} to="/subjects/math">Mathematics</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/subjects/english">English</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/subjects/naplan">NAPLAN Prep</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/subjects">All Subjects</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/pricing">Pricing</Nav.Link>
            <Nav.Link as={NavLink} to="/test-now">Free Assessment</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
          </Nav>
          
          <div className="d-flex align-items-center">
            {currentUser ? (
              <NavDropdown 
                title={
                  <span>
                    <FaUserCircle className="me-1" />
                    {userData ? `${userData.firstName} ${userData.lastName}` : currentUser.email}
                  </span>
                } 
                id="user-dropdown"
              >
                <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Button as={Link} to="/login" variant="outline-primary" className="me-2">
                  Log In
                </Button>
                <Button as={Link} to="/signup" variant="primary">
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
