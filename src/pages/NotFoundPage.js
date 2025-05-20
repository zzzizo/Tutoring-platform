import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className="not-found-section py-5">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8} lg={6}>
            <h1 className="display-1 fw-bold text-primary">404</h1>
            <h2 className="mb-4">Page Not Found</h2>
            <p className="lead mb-5">
              The page you are looking for might have been removed, had its name changed, 
              or is temporarily unavailable.
            </p>
            <Button as={Link} to="/" variant="primary" size="lg">
              Return to Homepage
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NotFoundPage;

