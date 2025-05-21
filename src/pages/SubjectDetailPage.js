import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getSubjectImage } from '../utils/placeholderImages';
// import { preload, preloadModule } from 'react-dom';

// Sample subject data (in a real app, this would come from an API)
const subjectsData = {
  math: {
    id: 'math',
    title: 'Mathematics',
    description: 'Our mathematics curriculum builds strong foundations in number sense, algebra, geometry, and more through interactive and adaptive lessons tailored to your child\'s learning style.',
    icon: '📊',
    color: '#4A6FDE',
    image: getSubjectImage("math_detail"),
    relatedSubjects: ['english', 'naplan'],
    topics: [
      {
        id: 'number-algebra',
        title: 'Number and Algebra',
        description: 'Develop number sense and algebraic thinking through engaging activities.',
        lessons: 24,
        subtopics: [
          {
            id: 'number-sense',
            title: 'Number Sense',
            description: 'Understanding place value, ordering, and comparing numbers.',
            difficulty: 'Beginner to Advanced'
          },
          {
            id: 'operations',
            title: 'Operations',
            description: 'Addition, subtraction, multiplication, and division with whole numbers, fractions, and decimals.',
            difficulty: 'Beginner to Advanced'
          },
          {
            id: 'patterns-algebra',
            title: 'Patterns and Algebra',
            description: 'Recognizing patterns, using variables, and solving equations.',
            difficulty: 'Intermediate to Advanced'
          }
        ]
      },
      {
        id: 'measurement-geometry',
        title: 'Measurement and Geometry',
        description: 'Learn about shapes, measurements, and spatial reasoning.',
        lessons: 18,
        subtopics: [
          {
            id: 'units-measurement',
            title: 'Units of Measurement',
            description: 'Understanding and converting between different units of length, area, volume, and mass.',
            difficulty: 'Beginner to Intermediate'
          },
          {
            id: 'shape',
            title: 'Shape',
            description: 'Properties of 2D and 3D shapes, angles, and geometric reasoning.',
            difficulty: 'Beginner to Advanced'
          },
          {
            id: 'location-transformation',
            title: 'Location and Transformation',
            description: 'Coordinates, symmetry, and transformations.',
            difficulty: 'Intermediate'
          }
        ]
      },
      {
        id: 'statistics-probability',
        title: 'Statistics and Probability',
        description: 'Collect, analyze, and interpret data to make informed decisions.',
        lessons: 12,
        subtopics: [
          {
            id: 'data-representation',
            title: 'Data Representation',
            description: 'Collecting, organizing, and displaying data using tables and graphs.',
            difficulty: 'Beginner to Intermediate'
          },
          {
            id: 'chance',
            title: 'Chance',
            description: 'Understanding probability concepts and calculating the likelihood of events.',
            difficulty: 'Intermediate to Advanced'
          }
        ]
      }
    ],
    testimonials: [
      {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Parent of Year 5 student',
        content: 'My son struggled with math for years. After just 3 months with this program, he\'s moved up two grade levels in his math abilities!',
        rating: 5
      },
      {
        id: 2,
        name: 'Michael Chen',
        role: 'Parent of Year 3 student',
        content: 'The way concepts are broken down makes it so much easier for my daughter to understand. She actually enjoys math now!',
        rating: 5
      }
    ]
  },
  english: {
    id: 'english',
    title: 'English',
    description: 'Develop reading comprehension, writing skills, and language mastery through our adaptive English curriculum designed to build confident communicators.',
    icon: '📚',
    color: '#FF8A47',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8',
    topics: [
      {
        id: 'reading-comprehension',
        title: 'Reading and Comprehension',
        description: 'Improve reading skills and understanding of various text types.',
        lessons: 20,
        subtopics: [
          {
            id: 'literal-comprehension',
            title: 'Literal Comprehension',
            description: 'Understanding explicit information in texts.',
            difficulty: 'Beginner to Intermediate'
          },
          {
            id: 'inferential-comprehension',
            title: 'Inferential Comprehension',
            description: 'Making inferences and drawing conclusions from texts.',
            difficulty: 'Intermediate to Advanced'
          },
          {
            id: 'vocabulary',
            title: 'Vocabulary',
            description: 'Building word knowledge and understanding word relationships.',
            difficulty: 'Beginner to Advanced'
          }
        ]
      },
      {
        id: 'writing',
        title: 'Writing',
        description: 'Develop writing skills across different text types and purposes.',
        lessons: 22,
        subtopics: [
          {
            id: 'text-types',
            title: 'Text Types',
            description: 'Writing narratives, persuasive texts, and informative texts.',
            difficulty: 'Beginner to Advanced'
          },
          {
            id: 'grammar-punctuation',
            title: 'Grammar and Punctuation',
            description: 'Using correct grammar and punctuation in writing.',
            difficulty: 'Beginner to Advanced'
          },
          {
            id: 'spelling',
            title: 'Spelling',
            description: 'Developing spelling strategies and understanding spelling patterns.',
            difficulty: 'Beginner to Advanced'
          }
        ]
      },
      {
        id: 'speaking-listening',
        title: 'Speaking and Listening',
        description: 'Build effective communication skills for various contexts.',
        lessons: 15,
        subtopics: [
          {
            id: 'oral-comprehension',
            title: 'Oral Comprehension',
            description: 'Understanding spoken language in different contexts.',
            difficulty: 'Beginner to Intermediate'
          },
          {
            id: 'expression',
            title: 'Expression',
            description: 'Communicating ideas and information clearly and confidently.',
            difficulty: 'Beginner to Advanced'
          }
        ]
      }
    ],
    testimonials: [
      {
        id: 1,
        name: 'David Wilson',
        role: 'Parent of Year 4 student',
        content: 'My daughter\'s writing has improved dramatically. Her teacher even commented on the positive change in her last report!',
        rating: 5
      },
      {
        id: 2,
        name: 'Lisa Patel',
        role: 'Parent of Year 6 student',
        content: 'The reading comprehension modules have really helped my son prepare for high school. He\'s much more confident with complex texts now.',
        rating: 4
      }
    ]
  },
  naplan: {
    id: 'naplan',
    title: 'NAPLAN Preparation',
    description: 'Our NAPLAN preparation helps students build confidence and skills for national assessments through targeted practice and personalized feedback.',
    icon: '✏️',
    color: '#2DCB70',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173',
    topics: [
      {
        id: 'practice-tests',
        title: 'Practice Tests',
        description: 'Familiarize with test format and question types through realistic practice tests.',
        lessons: 16,
        subtopics: [
          {
            id: 'reading',
            title: 'Reading',
            description: 'Practice tests focusing on reading comprehension skills tested in NAPLAN.',
            difficulty: 'Intermediate'
          },
          {
            id: 'writing',
            title: 'Writing',
            description: 'Practice tests for narrative and persuasive writing tasks.',
            difficulty: 'Intermediate'
          },
          {
            id: 'language-conventions',
            title: 'Language Conventions',
            description: 'Practice tests for spelling, grammar, and punctuation.',
            difficulty: 'Intermediate'
          },
          {
            id: 'numeracy',
            title: 'Numeracy',
            description: 'Practice tests for mathematical concepts and problem-solving.',
            difficulty: 'Intermediate'
          }
        ]
      },
      {
        id: 'test-taking-strategies',
        title: 'Test-Taking Strategies',
        description: 'Learn effective approaches to different question types and test sections.',
        lessons: 8,
        subtopics: [
          {
            id: 'multiple-choice',
            title: 'Multiple Choice Strategies',
            description: 'Techniques for approaching multiple choice questions efficiently.',
            difficulty: 'Beginner to Intermediate'
          },
          {
            id: 'writing-response',
            title: 'Writing Response Strategies',
            description: 'Planning and structuring written responses effectively.',
            difficulty: 'Intermediate'
          },
          {
            id: 'time-management',
            title: 'Time Management',
            description: 'Strategies for managing time during the test.',
            difficulty: 'Beginner to Intermediate'
          }
        ]
      },
      {
        id: 'content-review',
        title: 'Content Review',
        description: 'Review key concepts and skills tested in NAPLAN.',
        lessons: 12,
        subtopics: [
          {
            id: 'language-conventions-review',
            title: 'Language Conventions Review',
            description: 'Review of spelling, grammar, and punctuation concepts.',
            difficulty: 'Beginner to Advanced'
          },
          {
            id: 'reading-strategies',
            title: 'Reading Strategies',
            description: 'Review of key reading comprehension strategies.',
            difficulty: 'Beginner to Advanced'
          },
          {
            id: 'numeracy-skills',
            title: 'Numeracy Skills',
            description: 'Review of key mathematical concepts and problem-solving strategies.',
            difficulty: 'Beginner to Advanced'
          }
        ]
      }
    ],
    testimonials: [
      {
        id: 1,
        name: 'James Taylor',
        role: 'Parent of Year 5 student',
        content: 'The NAPLAN prep modules really helped reduce my son\'s anxiety about the tests. He felt much more prepared and confident.',
        rating: 5
      },
      {
        id: 2,
        name: 'Anita Sharma',
        role: 'Parent of Year 3 student',
        content: 'The practice tests were very similar to the actual NAPLAN tests. My daughter knew exactly what to expect and performed really well.',
        rating: 5
      }
    ]
  }
};

const SubjectDetailPage = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Preload related subjects' images when the component mounts
  useEffect(() => {
    if (subject && subject.relatedSubjects) {
      // Manual preload related subjects' images
      subject.relatedSubjects.forEach(relatedId => {
        if (subjectsData[relatedId]) {
          const img = new Image();
          img.src = subjectsData[relatedId].image;
        }
      });
    }
  }, [subject]);

  // Preload topic content when user hovers over a topic
  const handleTopicHover = (topicId) => {
    // Manual preload topic-specific resources
    const img = new Image();
    img.src = `/assets/topics/${topicId}/topic-image.jpg`;
    
    // For CSS preloading
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = `/assets/topics/${topicId}/topic-styles.css`;
    link.as = 'style';
    document.head.appendChild(link);
  };

  useEffect(() => {
    // Simulate API call to fetch subject data
    setTimeout(() => {
      if (subjectsData[subjectId]) {
        setSubject(subjectsData[subjectId]);
        setLoading(false);
      } else {
        setError('Subject not found');
        setLoading(false);
      }
    }, 500);
  }, [subjectId]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (error || !subject) {
    return (
      <Container className="py-5 text-center">
        <h2>Subject Not Found</h2>
        <p>Sorry, we couldn\'t find the subject you\'re looking for.</p>
        <Button as={Link} to="/subjects" variant="primary">
          View All Subjects
        </Button>
      </Container>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section 
        className="subject-hero py-5" 
        style={{ 
          backgroundColor: `${subject.color}10`,
          borderBottom: `5px solid ${subject.color}`
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <div 
                className="subject-icon mb-3"
                style={{ 
                  backgroundColor: `${subject.color}20`, 
                  color: subject.color,
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px'
                }}
              >
                {subject.icon}
              </div>
              <h1 className="display-4 fw-bold mb-3">{subject.title}</h1>
              <p className="lead mb-4">{subject.description}</p>
              <div className="d-flex flex-wrap gap-3">
                <Button 
                  as={Link} 
                  to="/test-now" 
                  variant="primary" 
                  size="lg"
                  onMouseEnter={() => {
                    const script = document.createElement('link');
                    script.rel = 'preload';
                    script.href = '/assets/assessment-intro.js';
                    script.as = 'script';
                    document.head.appendChild(script);
                  }}
                >
                  Take Free Assessment
                </Button>
                <Button 
                  as={Link} 
                  to="/signup" 
                  variant="outline-primary" 
                  size="lg"
                  onMouseEnter={() => {
                    const link = document.createElement('link');
                    link.rel = 'preload';
                    link.href = '/assets/signup-form.css';
                    link.as = 'style';
                    document.head.appendChild(link);
                  }}
                >
                  Start Learning
                </Button>
              </div>
            </Col>
            <Col lg={5} className="mt-4 mt-lg-0">
              <img 
                src={subject.image} 
                alt={subject.title} 
                className="img-fluid rounded shadow-lg"
                style={{ maxHeight: '350px', objectFit: 'cover', width: '100%' }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Topics Section */}
      <section className="subject-topics py-5">
        <Container>
          <h2 className="text-center mb-5">What You\'ll Learn</h2>
          <Row>
            {subject.topics && subject.topics.map(topic => (
              <Col key={topic.id} md={6} lg={4} className="mb-4">
                <Card 
                  className="h-100 border-0 shadow-sm"
                  onMouseEnter={() => handleTopicHover(topic.id)}
                >
                  <Card.Body>
                    <h3 className="h5 mb-3">{topic.title}</h3>
                    <p className="mb-3">{topic.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-light text-dark">
                        {topic.lessons} Lessons
                      </span>
                      <Button 
                        variant="link" 
                        className="p-0"
                        onClick={() => alert(`Topic: ${topic.title}`)}
                      >
                        Learn More
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Related Subjects Section */}
      {subject.relatedSubjects && subject.relatedSubjects.length > 0 && (
        <section className="related-subjects py-5 bg-light">
          <Container>
            <h2 className="text-center mb-5">Related Subjects</h2>
            <Row>
              {subject.relatedSubjects.map(relatedId => {
                const relatedSubject = subjectsData[relatedId];
                return relatedSubject ? (
                  <Col key={relatedId} md={6} lg={4} className="mb-4">
                    <Card className="h-100 border-0 shadow-sm">
                      <Card.Body className="d-flex flex-column">
                        <div 
                          className="subject-icon mb-3 d-flex align-items-center justify-content-center"
                          style={{ 
                            backgroundColor: `${relatedSubject.color}20`, 
                            color: relatedSubject.color,
                            width: '50px',
                            height: '50px',
                            borderRadius: '10px',
                            fontSize: '20px'
                          }}
                        >
                          {relatedSubject.icon}
                        </div>
                        <Card.Title>{relatedSubject.title}</Card.Title>
                        <Card.Text className="flex-grow-1">
                          {relatedSubject.description.substring(0, 100)}...
                        </Card.Text>
                        <Button 
                          as={Link} 
                          to={`/subjects/${relatedSubject.id}`} 
                          variant="outline-primary" 
                          className="mt-3"
                        >
                          Explore
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ) : null;
              })}
            </Row>
          </Container>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="testimonials py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">What Parents Say</h2>
          
          <Row>
            {subject.testimonials.map(testimonial => (
              <Col key={testimonial.id} md={6} className="mb-4">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="d-flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i} 
                          className={`bi bi-star${i < testimonial.rating ? '-fill' : ''}`}
                          style={{ color: i < testimonial.rating ? '#FFD700' : '#e4e5e9' }}
                        ></i>
                      ))}
                    </div>
                    <p className="mb-3">{testimonial.content}</p>
                    <div className="d-flex align-items-center">
                      <div 
                        className="testimonial-avatar me-3"
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          backgroundColor: `${subject.color}30`,
                          color: subject.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '18px'
                        }}
                      >
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h5 className="h6 mb-0">{testimonial.name}</h5>
                        <small className="text-muted">{testimonial.role}</small>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5" style={{ backgroundColor: subject.color, color: 'white' }}>
        <Container className="text-center">
          <h2 className="mb-4">Ready to Start Learning?</h2>
          <p className="lead mb-4">Join thousands of students who are already improving their skills in {subject.title}.</p>
          <Button as={Link} to="/signup" variant="light" size="lg" className="me-3">
            Sign Up Now
          </Button>
          <Button as={Link} to="/test-now" variant="outline-light" size="lg">
            Take Free Assessment
          </Button>
        </Container>
      </section>
    </>
  );
};

export default SubjectDetailPage;






