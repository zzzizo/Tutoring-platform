import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { preload } from 'react-dom';
import { placeholderImages } from '../utils/placeholderImages';

const SubjectCard = ({ subject }) => {
  const { id, title, description, icon, color } = subject;
  
  // Get the appropriate placeholder image based on subject id
  const getSubjectImage = (subjectId) => {
    switch(subjectId) {
      case 'math':
        return placeholderImages.subjectMath;
      case 'english':
        return placeholderImages.subjectEnglish;
      case 'science':
        return placeholderImages.subjectScience;
      default:
        return placeholderImages.subjectMath; // Default placeholder
    }
  };
  
  // Preload the subject detail image when hovering over the card
  const handleMouseEnter = () => {
    // In a real app, you would preload actual images
    // For now, we're just demonstrating the preload API
    preload(`/assets/subjects/${id}-detail.jpg`, { as: "image" });
  };
  
  return (
    <Card 
      className="h-100 shadow-sm hover-shadow transition-all" 
      onMouseEnter={handleMouseEnter}
    >
      <Card.Body className="d-flex flex-column">
        <div 
          className="subject-icon mb-3" 
          style={{ backgroundColor: color + '20' }} // 20 is hex for 12% opacity
        >
          {icon}
        </div>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="text-muted mb-4">{description}</Card.Text>
        <div className="mt-auto">
          <Button 
            as={Link} 
            to={`/subjects/${id}`} 
            variant="outline-primary" 
            className="w-100"
          >
            Learn More
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SubjectCard;






