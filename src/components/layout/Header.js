import React from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { placeholderImages } from '../../utils/placeholderImages';

const Header = () => {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img 
            src={placeholderImages.logo}
            alt="AI Tutoring Platform" 
            height="30" 
            className="d-inline-block align-top"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/120x30?text=AI+Tutor';
            }}
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
            <Button as={Link} to="/login" variant="outline-primary" className="me-2">
              Log In
            </Button>
            <Button as={Link} to="/signup" variant="primary">
              Sign Up
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

