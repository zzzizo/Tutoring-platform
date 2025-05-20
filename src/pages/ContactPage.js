import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
              <p className="lead mb-4">
                Have questions or need assistance? We're here to help! Reach out to our team using any of the methods below.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Info and Form */}
      <section className="contact-section py-5">
        <Container>
          <Row>
            <Col lg={5} className="mb-4 mb-lg-0">
              <h2 className="mb-4">Get in Touch</h2>
              <p className="mb-4">
                Our support team is available to answer your questions about our AI tutoring platform, 
                subscription plans, or technical issues.
              </p>
              
              <div className="contact-info">
                <div className="d-flex mb-4">
                  <div className="contact-icon me-3">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h5 className="h6 mb-1">Our Office</h5>
                    <p className="mb-0">
                      123 Education Street, Suite 400<br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                </div>
                
                <div className="d-flex mb-4">
                  <div className="contact-icon me-3">
                    <FaPhone />
                  </div>
                  <div>
                    <h5 className="h6 mb-1">Phone</h5>
                    <p className="mb-0">(123) 456-7890</p>
                  </div>
                </div>
                
                <div className="d-flex mb-4">
                  <div className="contact-icon me-3">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h5 className="h6 mb-1">Email</h5>
                    <p className="mb-0">support@aitutor.com</p>
                  </div>
                </div>
                
                <div className="d-flex">
                  <div className="contact-icon me-3">
                    <FaClock />
                  </div>
                  <div>
                    <h5 className="h6 mb-1">Business Hours</h5>
                    <p className="mb-0">
                      Monday - Friday: 9am - 5pm<br />
                      Saturday: 10am - 2pm<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            
            <Col lg={7}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4 p-md-5">
                  <h2 className="mb-4">Send Us a Message</h2>
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="contactName">
                          <Form.Label>Your Name</Form.Label>
                          <Form.Control type="text" placeholder="Enter your name" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="contactEmail">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control type="email" placeholder="Enter your email" />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3" controlId="contactSubject">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control type="text" placeholder="Enter subject" />
                    </Form.Group>
                    
                    <Form.Group className="mb-4" controlId="contactMessage">
                      <Form.Label>Message</Form.Label>
                      <Form.Control as="textarea" rows={5} placeholder="Enter your message" />
                    </Form.Group>
                    
                    <div className="d-grid">
                      <Button variant="primary" type="submit" size="lg">
                        Send Message
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Map Section */}
      <section className="map-section py-5 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="map-container rounded shadow-sm overflow-hidden">
                {/* Replace with actual Google Maps embed */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ContactPage;

