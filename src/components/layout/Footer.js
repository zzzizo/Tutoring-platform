import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row className="mb-5">
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="mb-4 text-white">AI Tutoring Platform</h5>
            <p className="text-muted mb-4">
              Personalized learning experiences powered by artificial intelligence.
              Our mission is to make quality education accessible to every student.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" className="me-3 text-white" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" className="me-3 text-white" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" className="me-3 text-white" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" className="me-3 text-white" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={20} />
              </a>
              <a href="https://youtube.com" className="text-white" target="_blank" rel="noopener noreferrer">
                <FaYoutube size={20} />
              </a>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-lg-0">
            <h5 className="mb-4 text-white">Company</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/about" className="text-muted text-decoration-none">About Us</Link></li>
              <li className="mb-2"><Link to="/team" className="text-muted text-decoration-none">Our Team</Link></li>
              <li className="mb-2"><Link to="/careers" className="text-muted text-decoration-none">Careers</Link></li>
              <li className="mb-2"><Link to="/press" className="text-muted text-decoration-none">Press</Link></li>
              <li className="mb-2"><Link to="/blog" className="text-muted text-decoration-none">Blog</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-muted text-decoration-none">Contact Us</Link></li>
            </ul>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-lg-0">
            <h5 className="mb-4 text-white">Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/help" className="text-muted text-decoration-none">Help Center</Link></li>
              <li className="mb-2"><Link to="/tutorials" className="text-muted text-decoration-none">Tutorials</Link></li>
              <li className="mb-2"><Link to="/webinars" className="text-muted text-decoration-none">Webinars</Link></li>
              <li className="mb-2"><Link to="/faq" className="text-muted text-decoration-none">FAQs</Link></li>
              <li className="mb-2"><Link to="/community" className="text-muted text-decoration-none">Community</Link></li>
              <li className="mb-2"><Link to="/partners" className="text-muted text-decoration-none">Partners</Link></li>
            </ul>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-lg-0">
            <h5 className="mb-4 text-white">Contact Us</h5>
            <ul className="list-unstyled contact-info">
              <li className="mb-3 d-flex">
                <FaMapMarkerAlt className="text-primary me-2 mt-1" />
                <span>123 Education Street, Suite 400<br />San Francisco, CA 94107</span>
              </li>
              <li className="mb-3 d-flex">
                <FaPhone className="text-primary me-2 mt-1" />
                <span>(123) 456-7890</span>
              </li>
              <li className="mb-3 d-flex">
                <FaEnvelope className="text-primary me-2 mt-1" />
                <span>support@aitutor.com</span>
              </li>
              <li className="d-flex">
                <FaClock className="text-primary me-2 mt-1" />
                <span>Monday - Friday: 9am - 5pm<br />Saturday: 10am - 2pm<br />Sunday: Closed</span>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6}>
            <h5 className="mb-4 text-white">Subscribe</h5>
            <p className="text-muted mb-3">Get the latest news and updates</p>
            <Form className="mb-3">
              <Form.Group className="mb-3" controlId="subscribeEmail">
                <Form.Control
                  type="email"
                  placeholder="Your email address"
                  className="bg-dark border-secondary text-white"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Subscribe
              </Button>
            </Form>
            <p className="text-muted small">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </Col>
        </Row>
        
        <hr className="border-secondary" />
        
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="text-muted mb-0">
              © {currentYear} AI Tutoring Platform. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <img 
              src="/payment-methods.png" 
              alt="Payment methods" 
              height="24" 
              className="payment-methods"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;


