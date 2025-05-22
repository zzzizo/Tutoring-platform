import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';

const LearningStyleResults = () => {
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResults = localStorage.getItem('learningStyleResults');
    
    if (!storedResults) {
      navigate('/learning-style-assessment');
      return;
    }
    
    setResults(JSON.parse(storedResults));
  }, [navigate]);

  if (!results) {
    return <div className="flex justify-center items-center h-screen">Loading results...</div>;
  }

  const chartData = {
    labels: [
      'Visual', 
      'Auditory', 
      'Reading/Writing', 
      'Kinesthetic'
    ],
    datasets: [
      {
        data: [
          results.percentages.visual,
          results.percentages.auditory,
          results.percentages.reading,
          results.percentages.kinesthetic
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const learningStyleInfo = {
    visual: {
      title: "Visual Learner",
      description: "You learn best through seeing and visualizing information. Visual learners benefit from diagrams, charts, pictures, and other visual aids.",
      strategies: [
        "Use color-coding and highlighting in your notes",
        "Create mind maps and diagrams to visualize concepts",
        "Watch video tutorials and demonstrations",
        "Use flashcards with images and symbols",
        "Visualize information in your mind"
      ]
    },
    auditory: {
      title: "Auditory Learner",
      description: "You learn best through listening and speaking. Auditory learners benefit from discussions, lectures, and verbal explanations.",
      strategies: [
        "Record lectures and listen to them again",
        "Participate in group discussions",
        "Read material aloud to yourself",
        "Use mnemonic devices and rhymes",
        "Explain concepts to others verbally"
      ]
    },
    reading: {
      title: "Reading/Writing Learner",
      description: "You learn best through reading and writing. Reading/writing learners benefit from text-based materials and written notes.",
      strategies: [
        "Take detailed notes during lectures",
        "Rewrite your notes to reinforce learning",
        "Create lists and outlines",
        "Read textbooks and reference materials",
        "Write summaries of key concepts"
      ]
    },
    kinesthetic: {
      title: "Kinesthetic Learner",
      description: "You learn best through physical activities and hands-on experiences. Kinesthetic learners benefit from practical applications and movement.",
      strategies: [
        "Use hands-on activities and experiments",
        "Take breaks to move around while studying",
        "Use physical objects to represent concepts",
        "Apply concepts to real-world situations",
        "Create models or role-play scenarios"
      ]
    }
  };

  const dominantStyle = results.dominantStyle;
  const styleInfo = learningStyleInfo[dominantStyle];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Learning Style Results</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">{styleInfo.title}</h2>
            <p className="text-gray-700 mb-6">{styleInfo.description}</p>
            
            <h3 className="font-semibold text-lg mb-2">Learning Strategies:</h3>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              {styleInfo.strategies.map((strategy, index) => (
                <li key={index} className="text-gray-700">{strategy}</li>
              ))}
            </ul>
            
            <div className="mt-6">
              <button 
                onClick={() => navigate('/learning-path')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update My Learning Path
              </button>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <div className="w-64 h-64 mb-4">
              <Doughnut 
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return `${context.label}: ${context.raw}%`;
                        }
                      }
                    }
                  },
                  cutout: '70%'
                }}
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Your Learning Style Breakdown</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(results.percentages).map(([style, percentage]) => (
                  <div key={style} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ 
                        backgroundColor: style === 'visual' ? 'rgba(54, 162, 235, 1)' :
                                        style === 'auditory' ? 'rgba(255, 99, 132, 1)' :
                                        style === 'reading' ? 'rgba(255, 206, 86, 1)' :
                                        'rgba(75, 192, 192, 1)'
                      }}
                    ></div>
                    <span className="text-sm">
                      {style.charAt(0).toUpperCase() + style.slice(1)}: {percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">What This Means For Your Learning</h2>
        <p className="text-gray-700 mb-4">
          Our AI tutor will now adapt its teaching methods to match your dominant learning style. 
          This means you'll receive content in formats that work best for your brain, making learning 
          more efficient and enjoyable.
        </p>
        
        <h3 className="font-semibold text-lg mb-2">Next Steps:</h3>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li className="text-gray-700">Take a diagnostic assessment to identify your knowledge gaps</li>
          <li className="text-gray-700">Review your personalized learning path</li>
          <li className="text-gray-700">Begin your learning journey with AI-optimized content</li>
        </ul>
        
        <div className="flex space-x-4 mt-6">
          <button 
            onClick={() => navigate('/diagnostic-test')}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Take Diagnostic Test
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningStyleResults;