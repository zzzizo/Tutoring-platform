import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LearningPath = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile from localStorage
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    }
    setLoading(false);
  }, []);

  // Sample learning path data - in a real app, this would be generated based on user's assessment results
  const learningPathData = {
    mathematics: [
      {
        id: 'algebra-basics',
        title: 'Algebra Basics',
        description: 'Learn the fundamentals of algebra including variables, expressions, and equations.',
        progress: 0,
        modules: [
          { id: 'variables', title: 'Variables and Constants', completed: false },
          { id: 'expressions', title: 'Algebraic Expressions', completed: false },
          { id: 'equations', title: 'Solving Simple Equations', completed: false }
        ]
      },
      {
        id: 'geometry-basics',
        title: 'Geometry Basics',
        description: 'Explore the fundamental concepts of geometry including shapes, angles, and measurements.',
        progress: 0,
        modules: [
          { id: 'shapes', title: 'Basic Shapes and Properties', completed: false },
          { id: 'angles', title: 'Angles and Their Relationships', completed: false },
          { id: 'measurements', title: 'Perimeter, Area, and Volume', completed: false }
        ]
      }
    ],
    science: [
      {
        id: 'physics-mechanics',
        title: 'Physics: Mechanics',
        description: 'Study the principles of motion, forces, and energy in physical systems.',
        progress: 0,
        modules: [
          { id: 'motion', title: 'Motion and Velocity', completed: false },
          { id: 'forces', title: 'Forces and Newton\'s Laws', completed: false },
          { id: 'energy', title: 'Energy and Work', completed: false }
        ]
      },
      {
        id: 'chemistry-basics',
        title: 'Chemistry Basics',
        description: 'Learn about atoms, elements, compounds, and basic chemical reactions.',
        progress: 0,
        modules: [
          { id: 'atoms', title: 'Atoms and Elements', completed: false },
          { id: 'compounds', title: 'Compounds and Molecules', completed: false },
          { id: 'reactions', title: 'Chemical Reactions', completed: false }
        ]
      }
    ]
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Ensure userProfile exists before accessing its properties
  if (!userProfile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Please complete your profile and assessments to view your personalized learning path.
              </p>
              <div className="mt-4">
                <Link to="/learning-style-assessment" className="text-sm font-medium text-yellow-700 hover:text-yellow-600">
                  Take Learning Style Assessment <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get user's interests or default to mathematics if not available
  const interests = userProfile.interests || ['mathematics'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Learning Path</h1>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Your learning path is personalized based on your learning style ({userProfile.learningStyle || 'visual'}) and assessment results.
            </p>
          </div>
        </div>
      </div>
      
      {interests.map((subject, index) => {
        // Check if the subject exists in our learning path data
        const subjectData = learningPathData[subject.toLowerCase()];
        
        // Skip if we don't have data for this subject
        if (!subjectData) return null;
        
        return (
          <div key={index} className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 capitalize">{subject}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subjectData.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 mb-2">Modules:</h4>
                    <ul className="space-y-2 mb-4">
                      {course.modules.map((module) => (
                        <li key={module.id} className="flex items-center">
                          <span className={`w-5 h-5 mr-2 rounded-full flex items-center justify-center ${module.completed ? 'bg-green-500' : 'bg-gray-200'}`}>
                            {module.completed && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                              </svg>
                            )}
                          </span>
                          <span className={module.completed ? 'line-through text-gray-500' : ''}>{module.title}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link
                      to={`/learning-content/${subject.toLowerCase()}/${course.id}`}
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      {course.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LearningPath;