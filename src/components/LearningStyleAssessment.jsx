import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LearningStyleAssessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  
  const questions = [
    {
      id: 1,
      text: "When learning something new, I prefer to:",
      options: [
        { value: "visual", text: "See diagrams, charts, or demonstrations" },
        { value: "auditory", text: "Listen to explanations and discussions" },
        { value: "reading", text: "Read detailed explanations and instructions" },
        { value: "kinesthetic", text: "Try it out hands-on and learn by doing" }
      ]
    },
    {
      id: 2,
      text: "When trying to remember information, I most easily recall:",
      options: [
        { value: "visual", text: "Images, diagrams, and visual patterns" },
        { value: "auditory", text: "Things I've heard or discussions I've had" },
        { value: "reading", text: "Notes I've written or text I've read" },
        { value: "kinesthetic", text: "Activities I've performed or experiences I've had" }
      ]
    },
    {
      id: 3,
      text: "When solving a problem, I tend to:",
      options: [
        { value: "visual", text: "Visualize the problem and possible solutions" },
        { value: "auditory", text: "Talk through the problem and solutions out loud" },
        { value: "reading", text: "Write down the problem and analyze it step by step" },
        { value: "kinesthetic", text: "Use a trial-and-error approach and physical models" }
      ]
    },
    {
      id: 4,
      text: "I find it easiest to follow:",
      options: [
        { value: "visual", text: "Visual instructions with diagrams and pictures" },
        { value: "auditory", text: "Verbal instructions and explanations" },
        { value: "reading", text: "Written instructions and text-based guides" },
        { value: "kinesthetic", text: "Demonstrations that I can then practice" }
      ]
    },
    {
      id: 5,
      text: "When explaining something to someone else, I tend to:",
      options: [
        { value: "visual", text: "Draw diagrams or use visual aids" },
        { value: "auditory", text: "Explain verbally with emphasis on how it sounds" },
        { value: "reading", text: "Write out explanations or provide written materials" },
        { value: "kinesthetic", text: "Demonstrate and have them try it themselves" }
      ]
    },
    {
      id: 6,
      text: "During my free time, I prefer to:",
      options: [
        { value: "visual", text: "Watch videos or look at images/art" },
        { value: "auditory", text: "Listen to podcasts, music, or audiobooks" },
        { value: "reading", text: "Read books, articles, or blogs" },
        { value: "kinesthetic", text: "Do physical activities or hands-on hobbies" }
      ]
    },
    {
      id: 7,
      text: "When I'm trying to concentrate, I am most distracted by:",
      options: [
        { value: "visual", text: "Visual disorder or movement in my environment" },
        { value: "auditory", text: "Sounds and noises around me" },
        { value: "reading", text: "Disorganized text or unclear instructions" },
        { value: "kinesthetic", text: "Physical discomfort or inability to move" }
      ]
    },
    {
      id: 8,
      text: "When memorizing information, I prefer to:",
      options: [
        { value: "visual", text: "Create mental images or use color-coding" },
        { value: "auditory", text: "Repeat information out loud or create rhymes" },
        { value: "reading", text: "Write information down multiple times" },
        { value: "kinesthetic", text: "Associate information with movements or actions" }
      ]
    },
    {
      id: 9,
      text: "I learn best when:",
      options: [
        { value: "visual", text: "I can see what the teacher is explaining" },
        { value: "auditory", text: "I can listen to the explanation" },
        { value: "reading", text: "I can read about the topic at my own pace" },
        { value: "kinesthetic", text: "I can actively participate and try things out" }
      ]
    },
    {
      id: 10,
      text: "When giving directions to someone, I typically:",
      options: [
        { value: "visual", text: "Draw a map or show pictures" },
        { value: "auditory", text: "Explain verbally with emphasis on landmarks" },
        { value: "reading", text: "Write down detailed step-by-step instructions" },
        { value: "kinesthetic", text: "Walk with them or physically point in directions" }
      ]
    }
  ];

  const handleAnswer = (questionId, learningStyle) => {
    setAnswers({
      ...answers,
      [questionId]: learningStyle
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    // Count occurrences of each learning style
    const counts = {
      visual: 0,
      auditory: 0,
      reading: 0,
      kinesthetic: 0
    };

    Object.values(answers).forEach(style => {
      counts[style]++;
    });

    // Find the dominant learning style
    let dominantStyle = 'visual'; // Default
    let maxCount = 0;

    Object.entries(counts).forEach(([style, count]) => {
      if (count > maxCount) {
        maxCount = count;
        dominantStyle = style;
      }
    });

    // Calculate percentages
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    const percentages = {};
    
    Object.entries(counts).forEach(([style, count]) => {
      percentages[style] = Math.round((count / total) * 100);
    });

    // Store results
    const results = {
      dominantStyle,
      counts,
      percentages,
      completedAt: new Date().toISOString()
    };

    localStorage.setItem('learningStyleResults', JSON.stringify(results));
    
    // Update user profile with learning style
    const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
    userProfile.learningStyle = dominantStyle;
    localStorage.setItem('userProfile', JSON.stringify(userProfile));

    // Navigate to results page
    navigate('/learning-style-results');
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Learning Style Assessment</h1>
      
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right text-sm text-gray-600 mt-1">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl mb-4">{currentQ.text}</h2>
        
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <div 
              key={index}
              className={`p-4 border rounded-md cursor-pointer hover:bg-gray-50 ${
                answers[currentQ.id] === option.value ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onClick={() => handleAnswer(currentQ.id, option.value)}
            >
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
        
        <button 
          onClick={nextQuestion}
          disabled={!answers[currentQ.id]}
          className={`px-4 py-2 rounded ${
            !answers[currentQ.id]
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {currentQuestion < questions.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  );
};

export default LearningStyleAssessment;