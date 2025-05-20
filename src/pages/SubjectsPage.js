import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { getSubjectImage } from '../utils/placeholderImages';

const SubjectsPage = () => {
  // Subject data
  const subjects = [
    {
      id: "math",
      title: "Mathematics",
      description: "From basic arithmetic to advanced calculus, our AI adapts to your child's level.",
      img: "https://img.icons8.com/color/60/000000/math.png",
      color: "#E3F2FD"
    },
    {
      id: "english",
      title: "English",
      description: "Improve reading comprehension, writing skills, and grammar through personalized lessons.",
      img: "https://img.icons8.com/color/60/000000/literature.png",
      color: "#F3E5F5"
    },
    {
      id: "naplan",
      title: "NAPLAN Prep",
      description: "Targeted preparation for Australia's National Assessment Program tests.",
      img: "https://img.icons8.com/color/60/000000/exam.png",
      color: "#E8F5E9"
    },
    {
      id: "science",
      title: "Science",
      description: "Explore biology, chemistry, physics, and earth sciences through interactive experiments and lessons.",
      img: "https://img.icons8.com/color/60/000000/test-tube.png",
      color: "#FFF3E0"
    },
    {
      id: "history",
      title: "History",
      description: "Journey through time with engaging lessons on world history, civilizations, and important events.",
      color: "#FFEBEE"
    },
    {
      id: "geography",
      title: "Geography",
      description: "Discover the world's physical features, countries, cultures, and environmental challenges.",
      color: "#E0F2F1"
    }
  ];

  return (
    <div className="subjects-page">
      {/* Hero Section */}
      <section className="subjects-hero py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-3">Our Subjects</h1>
              <p className="lead mb-4">
                Explore our comprehensive range of subjects, each designed with personalized 
                learning paths powered by AI to help your child excel.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Subjects Grid */}
      <section className="subjects-grid py-5">
        <Container>
          <Row>
            {subjects.map(subject => (
              <Col key={subject.id} md={6} lg={4} className="mb-4">
                <Card className="h-100 border-0 shadow-sm" style={{ backgroundColor: subject.color }}>
                  <Card.Body className="p-4">
                    <div className="subject-icon mb-3">
                      <img 
                        src={getSubjectImage(subject.id)} 
                        alt={subject.title} 
                        height="60"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = subject.img;
                        }}
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
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="mb-4">Not sure where to start?</h2>
              <p className="lead mb-4">
                Take our free assessment to identify your child's strengths and areas for improvement.
                We'll recommend the best subjects and learning path.
              </p>
              <Link to="/test-now" className="btn btn-primary btn-lg">
                Take Free Assessment
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default SubjectsPage;


