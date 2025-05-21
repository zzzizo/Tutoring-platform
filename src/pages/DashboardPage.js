import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getDocument } from '../services/firestoreService';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      
      try {
        const data = await getDocument('users', currentUser.uid);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [currentUser]);
  
  // Sample data for subjects and activities
  const subjects = [
    { id: 'math', name: 'Mathematics', progress: 65, nextLesson: 'Quadratic Equations' },
    { id: 'english', name: 'English', progress: 42, nextLesson: 'Essay Structure' },
    { id: 'science', name: 'Science', progress: 28, nextLesson: 'Cell Biology' }
  ];
  
  const recentActivity = [
    { id: 1, type: 'lesson', subject: 'Mathematics', title: 'Linear Equations', date: '2023-09-15', score: '90%' },
    { id: 2, type: 'quiz', subject: 'English', title: 'Grammar Quiz', date: '2023-09-14', score: '85%' },
    { id: 3, type: 'practice', subject: 'Science', title: 'Periodic Table', date: '2023-09-12', score: '75%' }
  ];
  
  return (
    <div className="dashboard-page py-5">
      <Container>
        <h1 className="mb-4">Welcome, {userData?.firstName || 'Student'}!</h1>
        
        <Row>
          <Col lg={8}>
            {/* User's Selected Subject */}
            {userData?.subject && (
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body>
                  <h2 className="h5 mb-3">Your Selected Subject</h2>
                  <Row className="align-items-center">
                    <Col xs={8}>
                      <h3 className="h6 mb-1">
                        {userData.subject === 'math' ? 'Mathematics' : 
                         userData.subject === 'english' ? 'English' :
                         userData.subject === 'science' ? 'Science' : 
                         userData.subject === 'naplan' ? 'NAPLAN Prep' : 
                         userData.subject}
                      </h3>
                      <p className="text-muted mb-2">Focus Area: {userData.focusArea}</p>
                      <ProgressBar 
                        now={45} 
                        variant="success" 
                        className="mb-2" 
                        style={{ height: '8px' }} 
                      />
                      <p className="small mb-0">45% Complete</p>
                    </Col>
                    <Col xs={4} className="text-end">
                      <Button 
                        as={Link} 
                        to={`/subjects/${userData.subject}`} 
                        variant="outline-primary"
                        size="sm"
                      >
                        Continue Learning
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
            
            {/* Recommended Subjects */}
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body>
                <h2 className="h5 mb-3">Recommended Subjects</h2>
                {subjects.map(subject => (
                  <Row key={subject.id} className="align-items-center mb-3">
                    <Col xs={8}>
                      <h3 className="h6 mb-1">{subject.name}</h3>
                      <p className="text-muted mb-2">Next: {subject.nextLesson}</p>
                      <ProgressBar 
                        now={subject.progress} 
                        variant="success" 
                        className="mb-2" 
                        style={{ height: '8px' }} 
                      />
                      <p className="small mb-0">{subject.progress}% Complete</p>
                    </Col>
                    <Col xs={4} className="text-end">
                      <Button 
                        as={Link} 
                        to={`/subjects/${subject.id}`} 
                        variant="outline-primary"
                        size="sm"
                      >
                        Continue
                      </Button>
                    </Col>
                  </Row>
                ))}
              </Card.Body>
            </Card>
            
            {/* Recent Activity */}
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body>
                <h2 className="h5 mb-3">Recent Activity</h2>
                {recentActivity.map(activity => (
                  <Row key={activity.id} className="mb-3">
                    <Col xs={9}>
                      <h3 className="h6 mb-1">{activity.title}</h3>
                      <p className="text-muted mb-0">
                        {activity.subject} • {activity.type} • {activity.date}
                      </p>
                    </Col>
                    <Col xs={3} className="text-end">
                      <span className="badge bg-success">{activity.score}</span>
                    </Col>
                  </Row>
                ))}
                <div className="text-center mt-3">
                  <Button variant="link" className="text-decoration-none">View All Activity</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={4}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body>
                <h2 className="h5 mb-3">Account Summary</h2>
                <p className="mb-1"><strong>Name:</strong> {userData?.firstName} {userData?.lastName}</p>
                <p className="mb-1"><strong>Email:</strong> {userData?.email}</p>
                <p className="mb-1"><strong>Age:</strong> {userData?.age}</p>
                <p className="mb-1"><strong>Subject:</strong> {
                  userData?.subject === 'math' ? 'Mathematics' : 
                  userData?.subject === 'english' ? 'English' :
                  userData?.subject === 'science' ? 'Science' : 
                  userData?.subject === 'naplan' ? 'NAPLAN Prep' : 
                  userData?.subject || 'Not selected'
                }</p>
                <p className="mb-3"><strong>Focus Area:</strong> {userData?.focusArea || 'Not selected'}</p>
                <div className="d-grid">
                  <Button as={Link} to="/account" variant="outline-secondary" size="sm">
                    Manage Account
                  </Button>
                </div>
              </Card.Body>
            </Card>
            
            {/* Upcoming Sessions */}
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body>
                <h2 className="h5 mb-3">Upcoming Sessions</h2>
                <div className="p-3 bg-light rounded mb-3">
                  <p className="mb-1 fw-bold">Mathematics - Algebra</p>
                  <p className="mb-1 small">Tomorrow, 4:00 PM</p>
                  <div className="d-grid mt-2">
                    <Button variant="outline-primary" size="sm">Join Session</Button>
                  </div>
                </div>
                <div className="p-3 bg-light rounded">
                  <p className="mb-1 fw-bold">English - Essay Writing</p>
                  <p className="mb-1 small">Friday, 5:30 PM</p>
                  <div className="d-grid mt-2">
                    <Button variant="outline-primary" size="sm">Join Session</Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardPage;
