import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createDocument } from '../services/firestoreService';
import { handleAuthError } from '../utils/authErrorHandler';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    subject: '',
    focusArea: '',
    agreeTerms: false
  });
  
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Available subjects
  const subjects = [
    { id: 'math', name: 'Mathematics' },
    { id: 'english', name: 'English' },
    { id: 'science', name: 'Science' },
    { id: 'naplan', name: 'NAPLAN Prep' }
  ];
  
  // Focus areas based on selected subject
  const focusAreas = {
    math: ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Number Theory'],
    english: ['Reading Comprehension', 'Writing', 'Grammar', 'Vocabulary', 'Literature'],
    science: ['Biology', 'Chemistry', 'Physics', 'Earth Science', 'Astronomy'],
    naplan: ['Numeracy', 'Reading', 'Writing', 'Language Conventions']
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Reset focus area when subject changes
    if (name === 'subject') {
      setFormData(prevData => ({
        ...prevData,
        focusArea: ''
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    try {
      // Create the user in Firebase Auth
      const userCredential = await signup(formData.email, formData.password);
      
      // Store additional user data in Firestore
      await createDocument('users', userCredential.user.uid, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        age: formData.age,
        subject: formData.subject,
        focusArea: formData.focusArea,
        createdAt: new Date().toISOString()
      });
      
      setSuccess('Account created successfully! Redirecting to login...');
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(handleAuthError(error));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <section className="signup-section py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4 p-md-5">
                <h1 className="text-center mb-4">Create Account</h1>
                
                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}
                
                {success && (
                  <Alert variant="success" className="mb-4">
                    {success}
                  </Alert>
                )}
                
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          placeholder="Enter first name"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your first name.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          placeholder="Enter last name"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your last name.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  
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
                  
                  <Form.Group className="mb-3" controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      min="5"
                      max="100"
                      placeholder="Enter your age"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid age.
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="subject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      {subjects.map(subject => (
                        <option key={subject.id} value={subject.id}>
                          {subject.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please select a subject.
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  {formData.subject && (
                    <Form.Group className="mb-3" controlId="focusArea">
                      <Form.Label>Focus Area</Form.Label>
                      <Form.Select
                        name="focusArea"
                        value={formData.focusArea}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a focus area</option>
                        {focusAreas[formData.subject]?.map(area => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please select a focus area.
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}
                  
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                      placeholder="Create a password"
                    />
                    <Form.Control.Feedback type="invalid">
                      Password must be at least 8 characters.
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Form.Group className="mb-4" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="Confirm your password"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please confirm your password.
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Form.Group className="mb-4" controlId="agreeTerms">
                    <Form.Check
                      type="checkbox"
                      name="agreeTerms"
                      label={
                        <span>
                          I agree to the <Link to="/terms" className="text-decoration-none">Terms of Service</Link> and <Link to="/privacy" className="text-decoration-none">Privacy Policy</Link>
                        </span>
                      }
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      required
                      feedback="You must agree before submitting."
                      feedbackType="invalid"
                    />
                  </Form.Group>
                  
                  <div className="d-grid mb-4">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <p className="mb-0">
                      Already have an account? <Link to="/login" className="text-decoration-none">Log In</Link>
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

export default SignupPage;
