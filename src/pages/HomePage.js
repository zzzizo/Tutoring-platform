import React from 'react';
import { Container, Row, Col, Button, Carousel, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar, FaQuoteLeft, FaArrowRight } from 'react-icons/fa';
import heroImage from '../assets/images/hero-image.avif';
import iconPersonalized from '../assets/images/icon-personalized.png';
import iconFeedback from '../assets/images/icon-feedback.png';
import iconProgress from '../assets/images/icon-progress.png';
import math from '../assets/images/math.png';
import english from '../assets/images/english.png';
import naplan from '../assets/images/naplan.png';
import { placeholderImages } from '../utils/placeholderImages';

const HomePage = () => {
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Parent of 10th grader",
      image: placeholderImages.testimonials.testimonial1,
      quote: "My daughter's math scores improved dramatically after just 2 months. The personalized approach really works!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Parent of 7th grader",
      image: placeholderImages.testimonials.testimonial2,
      quote: "The AI tutor identified my son's learning gaps and created a custom plan that helped him catch up quickly.",
      rating: 5
    },
    {
      id: 3,
      name: "Jessica Williams",
      role: "Parent of 9th grader",
      image: placeholderImages.testimonials.testimonial3,
      quote: "My son actually enjoys studying now! The interactive lessons keep him engaged in a way traditional homework never did.",
      rating: 4
    }
  ];

  // Subject preview data
  const subjects = [
    {
      id: "math",
      title: "Mathematics",
      description: "From basic arithmetic to advanced calculus, our AI adapts to your child's level.",
      image: math,
      color: "#E3F2FD"
    },
    {
      id: "english",
      title: "English",
      description: "Improve reading comprehension, writing skills, and grammar through personalized lessons.",
      image: english,
      color: "#F3E5F5"
    },
    {
      id: "naplan",
      title: "NAPLAN Prep",
      description: "Targeted preparation for Australia's National Assessment Program tests.",
      image: naplan,
      color: "#E8F5E9"
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-3">
                AI-Powered Tutoring for Every Student
              </h1>
              <p className="lead mb-4">
                Personalized learning experiences that adapt to your child's unique needs and learning style.
              </p>
              <div className="d-grid gap-2 d-md-flex">
                <Button as={Link} to="/signup" variant="primary" size="lg">
                  Get Started
                </Button>
                <Button as={Link} to="/test-now" variant="outline-primary" size="lg">
                  Try for Free
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <img 
                src={heroImage} 
                alt="Student learning with AI tutor" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <h2 className="text-center mb-5">Why Choose Our AI Tutoring Platform?</h2>
          <Row>
            <Col md={4} className="mb-4 mb-md-0">
              <div className="text-center">
                <div className="feature-icon mb-3 mx-auto">
                  <img 
                    src={iconPersonalized} 
                    alt="Personalized Learning" 
                    height="60"
                  />
                </div>
                <h3 className="h4 mb-3">Personalized Learning</h3>
                <p>
                  Our AI adapts to your child's learning style, pace, and knowledge gaps to create a truly personalized experience.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4 mb-md-0">
              <div className="text-center">
                <div className="feature-icon mb-3 mx-auto">
                  <img 
                    src={iconFeedback} 
                    alt="Instant Feedback" 
                    height="60"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/60?text=FB';
                    }}
                  />
                </div>
                <h3 className="h4 mb-3">Instant Feedback</h3>
                <p>
                  Students receive immediate feedback on their work, helping them understand mistakes and learn faster.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center">
                <div className="feature-icon mb-3 mx-auto">
                  <img 
                    src={iconProgress} 
                    alt="Progress Tracking" 
                    height="60"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/60?text=PT';
                    }}
                  />
                </div>
                <h3 className="h4 mb-3">Progress Tracking</h3>
                <p>
                  Detailed analytics and progress reports help parents and students track improvement over time.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Subjects Preview */}
      <section className="subjects-section py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Explore Our Subjects</h2>
          <Row>
            {subjects.map(subject => (
              <Col key={subject.id} md={4} className="mb-4">
                <Card className="h-100 border-0 shadow-sm" style={{ backgroundColor: subject.color }}>
                  <Card.Body className="p-4">
                    <div className="subject-icon mb-3">
                      <img 
                        src={subject.image} 
                        alt={subject.title} 
                        height="60"
                      />
                    </div>
                    <h3 className="h4 mb-3">{subject.title}</h3>
                    <p className="mb-4">{subject.description}</p>
                    <Link to={`/subjects/${subject.id}`} className="text-decoration-none d-flex align-items-center">
                      Learn more <FaArrowRight className="ms-2" />
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button as={Link} to="/subjects" variant="outline-primary">
              View All Subjects
            </Button>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section py-5">
        <Container>
          <h2 className="text-center mb-5">How It Works</h2>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="steps-container">
                <Row className="align-items-center mb-5">
                  <Col md={6} className="mb-4 mb-md-0">
                    <div className="step-number">1</div>
                    <h3 className="h4 mb-3">Take the Assessment</h3>
                    <p>
                      Our AI evaluates your child's current knowledge level and learning style through an engaging assessment.
                    </p>
                  </Col>
                  <Col md={6}>
                    <img 
                      src={placeholderImages.steps.step1} 
                      alt="Assessment" 
                      className="img-fluid rounded shadow"
                    />
                  </Col>
                </Row>
                <Row className="align-items-center mb-5 flex-md-row-reverse">
                  <Col md={6} className="mb-4 mb-md-0">
                    <div className="step-number">2</div>
                    <h3 className="h4 mb-3">Get a Personalized Plan</h3>
                    <p>
                      Based on the assessment, we create a customized learning plan targeting your child's specific needs.
                    </p>
                  </Col>
                  <Col md={6}>
                    <img 
                      src={placeholderImages.steps.step2} 
                      alt="Personalized Plan" 
                      className="img-fluid rounded shadow"
                    />
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col md={6} className="mb-4 mb-md-0">
                    <div className="step-number">3</div>
                    <h3 className="h4 mb-3">Learn and Improve</h3>
                    <p>
                      Your child completes interactive lessons and receives instant feedback, with the AI adapting as they progress.
                    </p>
                  </Col>
                  <Col md={6}>
                    <img 
                      src={placeholderImages.steps.step3}
                      alt="Learning" 
                      className="img-fluid rounded shadow"
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Carousel */}
      <section className="testimonials-section py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">What Parents Say</h2>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Carousel 
                indicators={true} 
                controls={true}
                interval={5000}
                className="testimonial-carousel"
              >
                {testimonials.map(testimonial => (
                  <Carousel.Item key={testimonial.id}>
                    <div className="testimonial-card bg-white p-4 p-md-5 rounded shadow-sm text-center">
                      <div className="testimonial-image mb-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="rounded-circle"
                          width="80"
                          height="80"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/80x80?text=User';
                          }}
                        />
                      </div>
                      <div className="testimonial-rating mb-3">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < testimonial.rating ? "text-warning" : "text-muted"} 
                          />
                        ))}
                      </div>
                      <div className="testimonial-quote mb-4">
                        <FaQuoteLeft className="text-primary mb-2" size={24} />
                        <p className="lead">{testimonial.quote}</p>
                      </div>
                      <div className="testimonial-author">
                        <h5 className="mb-1">{testimonial.name}</h5>
                        <p className="text-muted">{testimonial.role}</p>
                      </div>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
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
    </div>
  );
};

export default HomePage;









