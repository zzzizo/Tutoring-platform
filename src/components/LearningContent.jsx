import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const LearningContent = () => {
  const { subject, module } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('learn');
  const [userNotes, setUserNotes] = useState('');
  const [showAITutor, setShowAITutor] = useState(false);
  // Remove the unused variables
  // const [aiMessage, setAiMessage] = useState('');
  const [userQuestion, setUserQuestion] = useState('');
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    // In a real app, fetch content from an API
    setTimeout(() => {
      // Mock content
      setContent({
        title: module.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        subject: subject.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        sections: [
          {
            id: 1,
            title: 'Introduction',
            content: `This module covers the fundamentals of ${module.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} in ${subject.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}.`
          },
          {
            id: 2,
            title: 'Key Concepts',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.'
          },
          {
            id: 3,
            title: 'Examples',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.'
          },
          {
            id: 4,
            title: 'Practice Problems',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.'
          }
        ],
        quiz: [
          {
            id: 1,
            question: 'What is the main purpose of this module?',
            options: [
              'To introduce advanced concepts',
              'To cover fundamentals',
              'To provide historical context',
              'To compare different approaches'
            ],
            correctAnswer: 1
          },
          {
            id: 2,
            question: 'Which of the following is NOT covered in this module?',
            options: [
              'Introduction',
              'Key Concepts',
              'Historical Development',
              'Practice Problems'
            ],
            correctAnswer: 2
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [subject, module]);

  const handleAskQuestion = () => {
    if (!userQuestion.trim()) return;
    
    // Add user question to conversation
    setConversation([...conversation, { role: 'user', content: userQuestion }]);
    
    // In a real app, this would call an AI API
    setTimeout(() => {
      const response = `I'd be happy to help with your question about ${userQuestion}. This is a simulated AI response that would provide a detailed explanation based on your learning style and current progress.`;
      setConversation([...conversation, { role: 'user', content: userQuestion }, { role: 'ai', content: response }]);
      setUserQuestion('');
    }, 1000);
  };

  const saveNotes = () => {
    // In a real app, save notes to backend
    alert('Notes saved successfully!');
  };

  const markAsComplete = () => {
    // In a real app, update progress in backend
    alert('Module marked as complete!');
    navigate('/learning-path');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading content...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{content.title}</h1>
            <p className="text-gray-600">{content.subject}</p>
          </div>
          <button 
            onClick={() => navigate('/learning-path')}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Back to Learning Path
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-3/4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="flex border-b">
              <button 
                onClick={() => setActiveTab('learn')}
                className={`px-4 py-3 font-medium ${activeTab === 'learn' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Learn
              </button>
              <button 
                onClick={() => setActiveTab('practice')}
                className={`px-4 py-3 font-medium ${activeTab === 'practice' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Practice
              </button>
              <button 
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-3 font-medium ${activeTab === 'notes' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Notes
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'learn' && (
                <div className="space-y-6">
                  {content.sections.map(section => (
                    <div key={section.id}>
                      <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                      <p className="text-gray-700">{section.content}</p>
                    </div>
                  ))}
                  
                  <div className="flex justify-end mt-6">
                    <button 
                      onClick={markAsComplete}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Mark as Complete
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'practice' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-3">Practice Quiz</h2>
                  
                  {content.quiz.map(question => (
                    <div key={question.id} className="border rounded-md p-4">
                      <h3 className="font-medium mb-3">{question.question}</h3>
                      <div className="space-y-2">
                        {question.options.map((option, index) => (
                          <div key={index} className="flex items-center">
                            <input 
                              type="radio" 
                              id={`q${question.id}-o${index}`} 
                              name={`question-${question.id}`} 
                              className="mr-2"
                            />
                            <label htmlFor={`q${question.id}-o${index}`}>{option}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-end mt-6">
                    <button 
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Check Answers
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'notes' && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Your Notes</h2>
                  <textarea
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    className="w-full h-64 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Take notes here..."
                  ></textarea>
                  
                  <div className="flex justify-end mt-4">
                    <button 
                      onClick={saveNotes}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Save Notes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <button 
              onClick={() => setShowAITutor(!showAITutor)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
            >
              <span className="mr-2">AI Tutor</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {showAITutor && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 text-white p-3">
                <h3 className="font-medium">AI Tutor Chat</h3>
              </div>
              
              <div className="h-64 overflow-y-auto p-3 bg-gray-50">
                {conversation.length === 0 ? (
                  <div className="text-center text-gray-500 mt-10">
                    <p>Ask me anything about this topic!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {conversation.map((msg, index) => (
                      <div 
                        key={index} 
                        className={`p-2 rounded-lg max-w-3/4 ${
                          msg.role === 'user' 
                            ? 'bg-blue-100 ml-auto' 
                            : 'bg-white border'
                        }`}
                      >
                        {msg.content}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-3 border-t">
                <div className="flex">
                  <input
                    type="text"
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ask a question..."
                  />
                  <button 
                    onClick={handleAskQuestion}
                    className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningContent;