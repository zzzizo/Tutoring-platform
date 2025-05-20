import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  // This would normally come from an API
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    plan: 'Standard',
    subjects: [
      { id: 'math', name: 'Mathematics', progress: 65, nextLesson: 'Quadratic Equations' },
      { id: 'english', name: 'English', progress: 42, nextLesson: 'Essay Structure' },
      { id: 'science', name: 'Science', progress: 28, nextLesson: 'Cell Biology' }
    ],
    recentActivity: [
      { id: 1, type: 'lesson', subject: 'Mathematics', title: 'Linear Equations', date: '2023-09-15', score: '90%' },
      { id: 2, type: 'quiz', subject: 'English', title: 'Grammar Quiz', date: '2023-09-14', score: '85%' },
      { id: 3, type: 'practice', subject: 'Science', title: 'Periodic Table', date: '2023-09-12', score: '75%' }
    ]
  };

  return (
    <section className="dashboard-section py-5">
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="mb-0">Welcome back, {userData.name}!</h1>
            <p className="text-muted">Here's an overview of your learning progress</p>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col lg={8}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body>
                <h2 className="h5 mb-4">Your Subjects</h2>
                {userData.subjects.map(subject => (
                  <div key={subject.id} className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h3 className="h6 mb-0">{subject.name}</h3>
                      <span className="text-primary">{subject.progress}%</span>
                    </div>
                    <div className="progress mb-2" style={{ height: '10px' }}>
                      <div 
                        className="progress-bar" 
                        role="progressbar" 
                        style={{ width: `${subject.progress}%` }} 
                        aria-valuenow={subject.progress} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <small className="text-muted">Next: {subject.nextLesson}</small>
                      <Button 
                        as={Link} 
                        to={`/subjects/${subject.id}`} 
                        variant="link" 
                        className="p-0 text-decoration-none"
                        size="sm"
                      >
                        Continue Learning
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="text-center mt-4">
                  <Button as={Link} to="/subjects" variant="outline-primary">
                    Explore More Subjects
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={4}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body>
                <h2 className="h5 mb-3">Account Summary</h2>
                <p className="mb-1"><strong>Email:</strong> {userData.email}</p>
                <p className="mb-1"><strong>Current Plan:</strong> {userData.plan}</p>
                <p className="mb-3"><strong>Next Billing:</strong> October 15, 2023</p>
                <div className="d-grid">
                  <Button as={Link} to="/account" variant="outline-secondary" size="sm">
                    Manage Account
                  </Button>
                </div>
              </Card.Body>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h2 className="h5 mb-3">Need Help?</h2>
                <p className="mb-3">Our support team is available 24/7 to assist you with any questions.</p>
                <div className="d-grid">
                  <Button as={Link} to="/contact" variant="primary">
                    Contact Support
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col
            lg={8}
            className="mb-4"
          >
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h2 className="h5 mb-3">Recent Activity</h2>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="h6 mb-0">Recent Activity</h3>
                  <Button as={Link} to="/activity" variant="link" size="sm">
                    View All
                  </Button>
                </div>
                <div className="activity-list">
                  {userData.recentActivity.map(activity => (
                    <div key={activity.id} className="activity-item mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <div className="activity-icon me-3">
                          {activity.type === 'lesson' && <i className="bi bi-book-fill text-primary"></i>}
                          {activity.type === 'quiz' && <i className="bi bi-check-square-fill text-success"></i>}
                          {activity.type === 'practice' && <i className="bi bi-bricks-fill text-info"></i>}
                        </div>
                        <div>
                          <h4 className="h6 mb-1">{activity.title}</h4>
                          <p className="small text-muted mb-1">
                            {activity.subject} - {activity.date}
                          </p>
                          {activity.score && (
                            <div className="d-flex align-items-center">
                              <span className="badge bg-success me-2">{activity.score}</span>
                              <span className="text-muted">Score</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DashboardPage;
