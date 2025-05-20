import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TestNowPage = () => {
  return (
    <div className="test-now-page">
      {/* Hero Section */}
      <section className="test-hero py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-3">Free Assessment</h1>
              <p className="lead mb-4">
                Take our comprehensive assessment to identify your child's strengths and areas for improvement.
                Our AI will create a personalized learning plan based on the results.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Assessment Form */}
      <section className="assessment-form py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4 p-md-5">
                  <h2 className="mb-4">Get Started</h2>
                  <p className="mb-4">
                    Please provide some basic information to customize the assessment for your child.
                  </p>
                  
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="childName">
                          <Form.Label>Child's Name</Form.Label>
                          <Form.Control type="text" placeholder="Enter name" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="childAge">
                          <Form.Label>Child's Age</Form.Label>
                          <Form.Control type="number" placeholder="Enter age" min="5" max="18" />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3" controlId="gradeLevel">
                      <Form.Label>Current Grade Level</Form.Label>
                      <Form.Select>
                        <option value="">Select grade level</option>
                        <option value="k">Kindergarten</option>
                        <option value="1">Grade 1</option>
                        <option value="2">Grade 2</option>
                        <option value="3">Grade 3</option>
                        <option value="4">Grade 4</option>
                        <option value="5">Grade 5</option>
                        <option value="6">Grade 6</option>
                        <option value="7">Grade 7</option>
                        <option value="8">Grade 8</option>
                        <option value="9">Grade 9</option>
                        <option value="10">Grade 10</option>
                        <option value="11">Grade 11</option>
                        <option value="12">Grade 12</option>
                      </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="subjectInterest">
                      <Form.Label>Subject of Interest</Form.Label>
                      <Form.Select>
                        <option value="">Select subject</option>
                        <option value="math">Mathematics</option>
                        <option value="english">English</option>
                        <option value="science">Science</option>
                        <option value="history">History</option>
                        <option value="naplan">NAPLAN Prep</option>
                      </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-4" controlId="parentEmail">
                      <Form.Label>Parent's Email</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                      <Form.Text className="text-muted">
                        We'll send the assessment results to this email.
                      </Form.Text>
                    </Form.Group>
                    
                    <div className="d-grid">
                      <Button variant="primary" size="lg" type="submit">
                        Start Assessment
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Info Section */}
      <section className="info-section py-5 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <h2 className="text-center mb-4">What to Expect</h2>
              <Row>
                <Col md={4} className="mb-4 mb-md-0">
                  <div className="text-center">
                    <div className="step-number mx-auto">1</div>
                    <h4 className="h5 mb-3">Complete the Assessment</h4>
                    <p>
                      Answer a series of adaptive questions that adjust to your child's skill level.
                    </p>
                  </div>
                </Col>
                <Col md={4} className="mb-4 mb-md-0">
                  <div className="text-center">
                    <div className="step-number mx-auto">2</div>
                    <h4 className="h5 mb-3">Receive Detailed Results</h4>
                    <p>
                      Get a comprehensive report highlighting strengths and areas for improvement.
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center">
                    <div className="step-number mx-auto">3</div>
                    <h4 className="h5 mb-3">Personalized Learning Plan</h4>
                    <p>
                      Our AI creates a customized learning path based on the assessment results.
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default TestNowPage;

