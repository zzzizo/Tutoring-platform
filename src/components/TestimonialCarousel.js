import React, { useState } from 'react';
import { Carousel, Card, Row, Col } from 'react-bootstrap';

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Parent of Alex, 10',
    quote: 'The personalized approach has made a huge difference for my son. His math scores have improved significantly, and he actually enjoys learning now!',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Parent of Lily, 8',
    quote: 'I was skeptical about AI tutoring at first, but the results speak for themselves. My daughter is more confident in her reading and writing skills.',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
  },
  {
    id: 3,
    name: 'Emma Wilson',
    role: 'Parent of James, 12',
    quote: 'The weekly progress reports are incredibly helpful. I can see exactly where my son is improving and where he needs more support.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  }
];

const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel 
      activeIndex={index} 
      onSelect={handleSelect}
      indicators={true}
      controls={true}
      interval={5000}
      className="testimonial-carousel"
      variant="dark"
    >
      {testimonials.map((testimonial) => (
        <Carousel.Item key={testimonial.id}>
          <Card className="border-0 bg-light">
            <Card.Body className="p-4 p-md-5">
              <Row className="align-items-center">
                <Col md={4} className="text-center mb-4 mb-md-0">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="testimonial-avatar rounded-circle mb-3"
                    width="120"
                    height="120"
                  />
                  <h4 className="mb-1">{testimonial.name}</h4>
                  <p className="text-muted">{testimonial.role}</p>
                </Col>
                <Col md={8}>
                  <blockquote className="blockquote mb-0">
                    <p className="mb-0 fs-5">
                      <i className="bi bi-quote me-2"></i>
                      {testimonial.quote}
                    </p>
                  </blockquote>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TestimonialCarousel;