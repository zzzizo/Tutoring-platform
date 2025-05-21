import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { handleAuthError } from '../utils/authErrorHandler';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, currentUser } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password);
      
      // Get the redirect path from location state or default to dashboard
      const redirectPath = location.state?.from?.pathname || '/dashboard';
      navigate(redirectPath);
    } catch (error) {
      setError(handleAuthError(error));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <section className="login-section py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4 p-md-5">
                <h1 className="text-center mb-4">Log In</h1>
                
                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}
                
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid email.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Enter your password"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide your password.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="d-flex justify-content-between mb-4">
                    <Form.Group controlId="rememberMe">
                      <Form.Check
                        type="checkbox"
                        name="rememberMe"
                        label="Remember me"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Link to="/forgot-password" className="text-decoration-none">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="d-grid mb-4">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Logging in...' : 'Log In'}
                    </Button>
                  </div>
                  <div className="text-center">
                    <p className="mb-0">
                      Don't have an account? <Link to="/signup" className="text-decoration-none">Sign up</Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default LoginPage;


