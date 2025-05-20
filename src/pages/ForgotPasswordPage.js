import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    // Simulate API call
    setSubmitStatus('loading');
    
    setTimeout(() => {
      // In a real app, this would be an API call to send a reset email
      setSubmitStatus('success');
    }, 1500);
  };

  return (
    <section className="forgot-password-section py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4 p-md-5">
                <h1 className="text-center mb-4">Reset Password</h1>
                
                {submitStatus === 'success' ? (
                  <div className="text-center">
                    <Alert variant="success" className="mb-4">
                      Password reset instructions have been sent to your email.
                    </Alert>
                    <p>
                      Please check your inbox and follow the instructions to reset your password.
                      If you don't receive an email within a few minutes, please check your spam folder.
                    </p>
                    <Button as={Link} to="/login" variant="primary" className="mt-3">
                      Return to Login
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="text-center mb-4">
                      Enter your email address below and we'll send you instructions to reset your password.
                    </p>
                    
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                      <Form.Group className="mb-4" controlId="resetEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="Enter your email"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid email.
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <div className="d-grid">
                        <Button 
                          variant="primary" 
                          type="submit" 
                          size="lg"
                          disabled={submitStatus === 'loading'}
                        >
                          {submitStatus === 'loading' ? 'Sending...' : 'Send Reset Instructions'}
                        </Button>
                      </div>
                      
                      <div className="text-center mt-4">
                        <p>
                          Remember your password? <Link to="/login">Log in</Link>
                        </p>
                      </div>
                    </Form>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ForgotPasswordPage;