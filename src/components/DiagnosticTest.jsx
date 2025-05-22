import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DiagnosticTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  
  const subjects = [
    { id: 'math', name: 'Mathematics' },
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'biology', name: 'Biology' },
    { id: 'computer_science', name: 'Computer Science' }
  ];
  
  // Mock questions - in a real app, these would come from an API
  const mockQuestions = {
    math: [
      {
        id: 1,
        text: "Solve for x: 2x + 5 = 13",
        options: [
          { id: 'a', text: "x = 4" },
          { id: 'b', text: "x = 5" },
          { id: 'c', text: "x = 6" },
          { id: 'd', text: "x = 7" }
        ],
        correctAnswer: 'a',
        difficulty: 'easy',
        topic: 'algebra'
      },
      {
        id: 2,
        text: "What is the area of a circle with radius 5 units?",
        options: [
          { id: 'a', text: "25π square units" },
          { id: 'b', text: "10π square units" },
          { id: 'c', text: "5π square units" },
          { id: 'd', text: "15π square units" }
        ],
        correctAnswer: 'a',
        difficulty: 'medium',
        topic: 'geometry'
      },
      {
        id: 3,
        text: "If f(x) = 2x² - 3x + 1, what is f(2)?",
        options: [
          { id: 'a', text: "3" },
          { id: 'b', text: "5" },
          { id: 'c', text: "7" },
          { id: 'd', text: "9" }
        ],
        correctAnswer: 'b',
        difficulty: 'medium',
        topic: 'functions'
      },
      {
        id: 4,
        text: "Simplify: (3x² - 2x + 5) - (x² + 3x - 2)",
        options: [
          { id: 'a', text: "2x² - 5x + 7" },
          { id: 'b', text: "2x² - 5x + 3" },
          { id: 'c', text: "4x² - 5x + 3" },
          { id: 'd', text: "4x² - 5x + 7" }
        ],
        correctAnswer: 'a',
        difficulty: 'hard',
        topic: 'algebra'
      },
      {
        id: 5,
        text: "What is the derivative of f(x) = x³ - 4x² + 2x - 7?",
        options: [
          { id: 'a', text: "f'(x) = 3x² - 8x + 2" },
          { id: 'b', text: "f'(x) = 3x² - 4x + 2" },
          { id: 'c', text: "f'(x) = 3x² - 8x - 7" },
          { id: 'd', text: "f'(x) = x² - 8x + 2" }
        ],
        correctAnswer: 'a',
        difficulty: 'hard',
        topic: 'calculus'
      }
    ],
    physics: [
      {
        id: 1,
        text: "What is Newton's First Law of Motion?",
        options: [
          { id: 'a', text: "Force equals mass times acceleration" },
          { id: 'b', text: "For every action, there is an equal and opposite reaction" },
          { id: 'c', text: "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force" },
          { id: 'd', text: "Energy cannot be created or destroyed, only transformed" }
        ],
        correctAnswer: 'c',
        difficulty: 'easy',
        topic: 'mechanics'
      },
      {
        id: 2,
        text: "What is the formula for kinetic energy?",
        options: [
          { id: 'a', text: "KE = mgh" },
          { id: 'b', text: "KE = 1/2 mv²" },
          { id: 'c', text: "KE = Fd" },
          { id: 'd', text: "KE = P/t" }
        ],
        correctAnswer: 'b',
        difficulty: 'medium',
        topic: 'energy'
      },
      // More physics questions...
    ],
    chemistry: [
      // Chemistry questions...
    ],
    biology: [
      // Biology questions...
    ],
    computer_science: [
      // Computer Science questions...
    ]
  };
  
  useEffect(() => {
    // In a real app, fetch questions from an API
    setLoading(false);
  }, []);
  
  const startTest = () => {
    if (!selectedSubject) {
      alert('Please select a subject to begin the test');
      return;
    }
    
    setQuestions(mockQuestions[selectedSubject]);
    setTestStarted(true);
    setTimeLeft(30 * 60); // 30 minutes in seconds
  };
  
  useEffect(() => {
    if (!timeLeft || !testStarted) return;
    
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      
      if (timeLeft <= 1) {
        clearInterval(timer);
        finishTest();
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, testStarted]);
  
  const handleAnswer = (questionId, answerId) => {
    setAnswers({
      ...answers,
      [questionId]: answerId
    });
  };
  
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const finishTest = () => {
    // Calculate results
    let score = 0;
    const questionResults = {};
    const topicPerformance = {};
    
    questions.forEach(question => {
      const isCorrect = answers[question.id] === question.correctAnswer;
      if (isCorrect) score++;
      
      questionResults[question.id] = {
        question: question.text,
        userAnswer: answers[question.id] || null,
        correctAnswer: question.correctAnswer,
        isCorrect,
        topic: question.topic,
        difficulty: question.difficulty
      };
      
      // Track performance by topic
      if (!topicPerformance[question.topic]) {
        topicPerformance[question.topic] = {
          total: 0,
          correct: 0
        };
      }
      
      topicPerformance[question.topic].total++;
      if (isCorrect) topicPerformance[question.topic].correct++;
    });
    
    // Calculate percentages for each topic
    const subjectPerformance = {};
    Object.entries(topicPerformance).forEach(([topic, data]) => {
      subjectPerformance[topic] = {
        ...data,
        percentage: (data.correct / data.total) * 100
      };
    });
    
    const results = {
      subject: selectedSubject,
      score,
      totalQuestions: questions.length,
      percentage: (score / questions.length) * 100,
      questionResults,
      subjectPerformance,
      completedAt: new Date().toISOString()
    };
    
    // Store results
    localStorage.setItem('testResults', JSON.stringify(results));
    
    // Generate learning path based on results
    generateLearningPath(results);
    
    // Navigate to results page
    navigate('/test-results');
  };
  
  const generateLearningPath = (results) => {
    // Create a learning path based on test results
    const learningPath = [];
    
    // Sort topics by performance (worst first)
    const sortedTopics = Object.entries(results.subjectPerformance)
      .sort(([, a], [, b]) => a.percentage - b.percentage)
      .map(([topic]) => topic);
    
    // Create a learning path entry for the tested subject
    const subjectEntry = {
      subject: subjects.find(s => s.id === results.subject).name,
      priority: 'high',
      modules: []
    };
    
    // Add modules for each topic, prioritizing areas of weakness
    sortedTopics.forEach((topic, index) => {
      const performance = results.subjectPerformance[topic];
      const priority = performance.percentage < 60 ? 'high' : 
                      performance.percentage < 80 ? 'medium' : 'low';
      
      subjectEntry.modules.push({
        title: topic.charAt(0).toUpperCase() + topic.slice(1),
        priority,
        progress: 0,
        performance: performance.percentage
      });
    });
    
    learningPath.push(subjectEntry);
    
    // Store the learning path
    localStorage.setItem('learningPath', JSON.stringify(learningPath));
  };
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading test...</div>;
  }
  
  if (!testStarted) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Diagnostic Assessment</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Before You Begin</h2>
          <p className="mb-4">
            This diagnostic test will help us understand your current knowledge level and create a 
            personalized learning path for you. The test will take approximately 30 minutes to complete.
          </p>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Select a Subject</label>
            <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Subject --</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
          </div>
          
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <ul className="list-disc pl-5 space-y-1 mb-6">
            <li>You will have 30 minutes to complete the test</li>
            <li>You can navigate between questions using the Previous and Next buttons</li>
            <li>Your progress will be saved as you go</li>
            <li>Click Submit when you're finished or when time runs out</li>
          </ul>
          
          <button 
            onClick={startTest}
            disabled={!selectedSubject}
            className={`w-full py-2 rounded ${
              !selectedSubject 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }
  
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Diagnostic Test: {subjects.find(s => s.id === selectedSubject).name}</h1>
        <div className="text-xl font-mono bg-gray-100 px-3 py-1 rounded">
          {formatTime(timeLeft)}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl mb-4">{currentQ.text}</h2>
        
        <div className="space-y-3">
          {currentQ.options.map((option) => (
            <div 
              key={option.id}
              className={`p-4 border rounded-md cursor-pointer hover:bg-gray-50 ${
                answers[currentQ.id] === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onClick={() => handleAnswer(currentQ.id, option.id)}
            >
              <span className="font-medium mr-2">{option.id.toUpperCase()}.</span>
              {option.text}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <button 
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className={`px-4 py-2 rounded ${
            currentQuestion === 0 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Previous
        </button>
        
        {currentQuestion < questions.length - 1 ? (
          <button 
            onClick={nextQuestion}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button 
            onClick={finishTest}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Test
          </button>
        )}
      </div>
      
      <div className="mt-8">
        <h3 className="font-medium mb-2">Question Navigator</h3>
        <div className="flex flex-wrap gap-2">
          {questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestion(index)}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index === currentQuestion
                  ? 'bg-blue-600 text-white'
                  : answers[q.id]
                    ? 'bg-green-100 text-green-800 border border-green-500'
                    : 'bg-gray-200 text-gray-800'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiagnosticTest;