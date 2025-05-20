import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import teamImage from '../assets/images/our-team.jpg';

const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="about-hero py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-3">About Us</h1>
              <p className="lead mb-0">
                We're on a mission to make quality education accessible to every student.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      
      <section className="about-content py-5">
        <Container>
          <Row className="mb-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="h3 mb-4">Our Story</h2>
              <p>
                Founded in 2023, our AI tutoring platform was created by a team of educators, 
                technologists, and parents who saw the need for more personalized learning experiences.
              </p>
              <p>
                We believe that every student learns differently, and traditional education often 
                fails to address individual learning styles and paces. Our AI-powered platform adapts 
                to each student's unique needs, providing customized lessons and feedback.
              </p>
            </Col>
            <Col lg={6}>
              <img 
                src={teamImage}
                alt="Our team" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;


