import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Australia'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    // Simulate payment processing
    setPaymentStatus('processing');
    
    setTimeout(() => {
      // In a real app, this would be an API call to process payment
      setPaymentStatus('success');
      
      // Redirect to dashboard after successful payment
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 2000);
  };

  return (
    <section className="payment-section py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4 p-md-5">
                <h1 className="text-center mb-4">Payment Information</h1>
                
                {paymentStatus === 'success' && (
                  <Alert variant="success" className="mb-4">
                    Payment successful! Redirecting to your dashboard...
                  </Alert>
                )}
                
                {paymentStatus === 'processing' && (
                  <Alert variant="info" className="mb-4">
                    Processing your payment...
                  </Alert>
                )}
                
                <div className="order-summary mb-4 p-3 bg-light rounded">
                  <h3 className="h5 mb-3">Order Summary</h3>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Standard Plan (Monthly)</span>
                    <span>$29.99</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tax</span>
                    <span>$3.00</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span>$32.99</span>
                  </div>
                </div>
                
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <h3 className="h5 mb-3">Card Details</h3>
                  
                  <Form.Group className="mb-3" controlId="cardName">
                    <Form.Label>Name on Card</Form.Label>
                    <Form.Control
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      required
                      placeholder="Enter name as it appears on card"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide the name on your card.
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="cardNumber">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{13,19}"
                      placeholder="XXXX XXXX XXXX XXXX"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid card number.
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="expiryDate">
                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Control
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          required
                          placeholder="MM/YY"
                          pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid expiry date (MM/YY).
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="cvv">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          required
                          pattern="[0-9]{3,4}"
                          placeholder="XXX"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid CVV.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <h3 className="h5 mb-3 mt-4">Billing Address</h3>
                  
                  <Form.Group className="mb-3" controlId="billingAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleChange}
                      required
                      placeholder="Enter your street address"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide your billing address.
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          placeholder="Enter city"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your city.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="state">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          placeholder="Enter state"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your state.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="zipCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          required
                          placeholder="Enter postal code"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your postal code.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                        >
                          <option value="Australia">Australia</option>
                          <option value="New Zealand">New Zealand</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Canada">Canada</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          Please select your country.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <div className="d-grid mt-4">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      size="lg"
                      disabled={paymentStatus === 'processing' || paymentStatus === 'success'}
                    >
                      {paymentStatus === 'processing' ? 'Processing...' : 'Complete Payment'}
                    </Button>
                  </div>
                  
                  <div className="text-center mt-3">
                    <small className="text-muted">
                      Your payment information is secure and encrypted.
                    </small>
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

export default PaymentPage;