import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    educationLevel: '',
    interests: []
  });
  
  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('userProfile');
    
    if (!storedUser) {
      // If no user data, create default profile
      const defaultUser = {
        name: 'Student',
        email: 'student@example.com',
        educationLevel: 'High School',
        interests: ['Mathematics', 'Science'],
        learningStyle: 'visual',
        completedTests: 0,
        completedLessons: 0,
        totalStudyTime: '0h 0m',
        joinedDate: new Date().toISOString()
      };
      
      setUser(defaultUser);
      localStorage.setItem('userProfile', JSON.stringify(defaultUser));
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
        educationLevel: user.educationLevel || '',
        interests: user.interests || []
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleInterestChange = (interest) => {
    const updatedInterests = formData.interests.includes(interest)
      ? formData.interests.filter(item => item !== interest)
      : [...formData.interests, interest];
    
    setFormData({
      ...formData,
      interests: updatedInterests
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // Update user data
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      educationLevel: formData.educationLevel,
      interests: formData.interests
    };
    
    // In a real app, you would send this to an API
    setUser(updatedUser);
    localStorage.setItem('userProfile', JSON.stringify(updatedUser));
    
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading profile...</div>;
  }

  const availableInterests = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 
    'Computer Science', 'Literature', 'History', 'Geography',
    'Art', 'Music', 'Languages', 'Economics'
  ];

  const educationLevels = [
    'Elementary School', 'Middle School', 'High School', 
    'College/University', 'Graduate School', 'Professional'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {!isEditing ? (
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold mr-4">
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500 mt-1">Member since {formatDate(user.joinedDate)}</p>
              </div>
              <button 
                onClick={() => setIsEditing(true)}
                className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Learning Information</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="mb-3">
                    <p className="text-sm text-gray-600">Education Level</p>
                    <p className="font-medium">{user.educationLevel}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-gray-600">Learning Style</p>
                    <p className="font-medium">{user.learningStyle.charAt(0).toUpperCase() + user.learningStyle.slice(1)} Learner</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Interests</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {user.interests.map((interest, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Learning Statistics</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Completed Tests</p>
                      <p className="text-2xl font-semibold">{user.completedTests}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Completed Lessons</p>
                      <p className="text-2xl font-semibold">{user.completedLessons}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Total Study Time</p>
                      <p className="text-2xl font-semibold">{user.totalStudyTime}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Learning Streak</p>
                      <p className="text-2xl font-semibold">0 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => navigate('/learning-style-assessment')}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Retake Learning Style Assessment
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Education Level</label>
                    <select
                      name="educationLevel"
                      value={formData.educationLevel}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Education Level</option>
                      {educationLevels.map((level, index) => (
                        <option key={index} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">New Password (optional)</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={!formData.password}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Interests</label>
                    <div className="flex flex-wrap gap-2">
                      {availableInterests.map((interest, index) => (
                        <div 
                          key={index}
                          onClick={() => handleInterestChange(interest)}
                          className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                            formData.interests.includes(interest)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                          }`}
                        >
                          {interest}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      // Add this to the Profile component to display subscription information
      // Find the section where user information is displayed and add:
      
      {/* Subscription Information */}
      {user.subscription && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Subscription</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm">Plan</p>
              <p className="font-medium">{user.subscription.plan}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Price</p>
              <p className="font-medium">{user.subscription.price}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Start Date</p>
              <p className="font-medium">{new Date(user.subscription.startDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Renewal Date</p>
              <p className="font-medium">{new Date(user.subscription.endDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Manage Subscription
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;