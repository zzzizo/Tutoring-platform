import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

// Import check icon if you have one
// import CheckIcon from '../assets/images/check-icon.svg';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  
  // Pricing plans data
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Perfect for occasional study help',
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      features: [
        'Access to 3 subjects',
        'Basic AI tutoring',
        'Weekly progress reports',
        'Email support'
      ],
      popular: false
    },
    {
      id: 'standard',
      name: 'Standard',
      description: 'Ideal for regular students',
      monthlyPrice: 39.99,
      yearlyPrice: 399.99,
      features: [
        'Access to all subjects',
        'Advanced AI tutoring',
        'Daily progress reports',
        'Priority email support',
        'Practice tests',
        'Personalized study plan'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Best for serious academic achievement',
      monthlyPrice: 59.99,
      yearlyPrice: 599.99,
      features: [
        'Everything in Standard',
        'Human tutor reviews',
        'Live Q&A sessions',
        'Phone support',
        'Parent dashboard',
        'Advanced analytics',
        'Guaranteed results'
      ],
      popular: false
    }
  ];

  // Fallback for check icon if SVG fails to load
  const renderCheckIcon = () => {
    try {
      // If you have a CheckIcon SVG, use this:
      // return <img src={CheckIcon} alt="Check" className="me-2" width="18" />;
      return <FaCheck className="me-2 text-primary" />;
    } catch (error) {
      return <FaCheck className="me-2 text-primary" />;
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pricing-hero py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-3">Simple, Transparent Pricing</h1>
              <p className="lead mb-4">
                Choose the plan that fits your child's learning needs. All plans include our 
                AI-powered personalized learning system.
              </p>
              <div className="billing-toggle d-flex justify-content-center align-items-center mb-4">
                <span className={billingCycle === 'monthly' ? 'fw-bold' : ''}>Monthly</span>
                <Form.Check
                  type="switch"
                  id="billing-switch"
                  className="mx-3"
                  checked={billingCycle === 'yearly'}
                  onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                />
                <span className={billingCycle === 'yearly' ? 'fw-bold' : ''}>Yearly</span>
                <Badge bg="success" className="ms-2 px-2 py-1">Save 16%</Badge>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-cards py-5">
        <Container>
          <Row>
            {plans.map(plan => (
              <Col key={plan.id} md={4} className="mb-4">
                <Card className={`h-100 border-0 shadow-sm ${plan.popular ? 'popular-plan' : ''}`}>
                  {plan.popular && (
                    <div className="popular-badge">Most Popular</div>
                  )}
                  <Card.Body className="p-4">
                    <h3 className="h4 mb-2">{plan.name}</h3>
                    <p className="text-muted mb-4">{plan.description}</p>
                    <div className="price-container mb-4">
                      <h2 className="price mb-0">
                        ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                      </h2>
                      <span className="billing-period">
                        {billingCycle === 'monthly' ? '/month' : '/year'}
                      </span>
                    </div>
                    <hr />
                    <div className="features mb-4">
                      <h5 className="h6 mb-3">What's included:</h5>
                      <ul className="list-unstyled">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="mb-2 d-flex align-items-start">
                            {renderCheckIcon()}
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="d-grid">
                      <Button 
                        as={Link} 
                        to={`/signup?plan=${plan.id}&billing=${billingCycle}`} 
                        variant={plan.popular ? "primary" : "outline-primary"}
                        size="lg"
                      >
                        Get Started
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="faq-section py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Frequently Asked Questions</h2>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="faq-item mb-4">
                <h4>Can I switch plans later?</h4>
                <p>
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be applied 
                  at the start of your next billing cycle.
                </p>
              </div>
              <div className="faq-item mb-4">
                <h4>Is there a free trial?</h4>
                <p>
                  We offer a free assessment and sample lessons to help you determine if our platform 
                  is right for your child before subscribing.
                </p>
              </div>
              <div className="faq-item mb-4">
                <h4>How many children can use one account?</h4>
                <p>
                  Each subscription is for one child. If you have multiple children, you can add 
                  additional child profiles to your account at a discounted rate.
                </p>
              </div>
              <div className="faq-item mb-4">
                <h4>Can I cancel my subscription?</h4>
                <p>
                  Yes, you can cancel your subscription at any time. If you cancel, you'll continue 
                  to have access until the end of your current billing period.
                </p>
              </div>
              <div className="faq-item mb-4">
                <h4>Do you offer refunds?</h4>
                <p>
                  We offer a 14-day money-back guarantee if you're not satisfied with our service.
                </p>
              </div>
            </Col>
          </Row>
          <div className="text-center mt-5">
            <p className="mb-4">Still have questions?</p>
            <Button as={Link} to="/contact" variant="outline-primary" size="lg">
              Contact Us
            </Button>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="mb-4">Ready to transform your child's learning experience?</h2>
              <p className="lead mb-4">
                Join thousands of parents who have seen their children improve their grades and 
                confidence with our AI tutoring platform.
              </p>
              <Button as={Link} to="/test-now" variant="primary" size="lg" className="me-3">
                Try Free Assessment
              </Button>
              <Button as={Link} to="/signup" variant="outline-primary" size="lg">
                Sign Up Now
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default PricingPage;


