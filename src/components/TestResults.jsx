import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const TestResults = () => {
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResults = localStorage.getItem('testResults');
    
    if (!storedResults) {
      navigate('/diagnostic-test');
      return;
    }
    
    setResults(JSON.parse(storedResults));
  }, [navigate]);

  if (!results) {
    return <div className="flex justify-center items-center h-screen">Loading results...</div>;
  }

  // Prepare chart data for topic performance
  const topicPerformanceData = {
    labels: Object.keys(results.subjectPerformance),
    datasets: [
      {
        label: 'Performance by Topic',
        data: Object.values(results.subjectPerformance).map(data => data.percentage),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare radar chart data
  const radarData = {
    labels: Object.keys(results.subjectPerformance),
    datasets: [
      {
        label: 'Your Performance',
        data: Object.values(results.subjectPerformance).map(data => data.percentage),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
      },
      {
        label: 'Target Performance',
        data: Object.keys(results.subjectPerformance).map(() => 100),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  // Get subject name
  const getSubjectName = (subjectId) => {
    const subjects = {
      math: 'Mathematics',
      physics: 'Physics',
      chemistry: 'Chemistry',
      biology: 'Biology',
      computer_science: 'Computer Science'
    };
    return subjects[subjectId] || subjectId;
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Diagnostic Test Results</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">{getSubjectName(results.subject)} Assessment</h2>
            <p className="text-gray-600">
              Completed on {new Date(results.completedAt).toLocaleDateString()} at {new Date(results.completedAt).toLocaleTimeString()}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="text-4xl font-bold text-blue-600 mr-2">{results.percentage.toFixed(1)}%</div>
            <div className="text-gray-600">
              <div>{results.score} correct</div>
              <div>out of {results.totalQuestions} questions</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="font-semibold text-lg mb-4">Performance by Topic</h3>
            <div className="h-64">
              <Bar 
                data={topicPerformanceData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      title: {
                        display: true,
                        text: 'Percentage (%)'
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Skill Radar</h3>
            <div className="h-64">
              <Radar 
                data={radarData}
                options={{
                  responsive: true,
                  scales: {
                    r: {
                      angleLines: {
                        display: true
                      },
                      suggestedMin: 0,
                      suggestedMax: 100
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-4">Areas for Improvement</h3>
          <div className="space-y-4">
            {Object.entries(results.subjectPerformance)
              .sort(([, a], [, b]) => a.percentage - b.percentage)
              .slice(0, 3)
              .map(([topic, data]) => (
                <div key={topic} className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{topic.charAt(0).toUpperCase() + topic.slice(1)}</h4>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      data.percentage < 60 ? 'bg-red-100 text-red-800' :
                      data.percentage < 80 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {data.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {data.percentage < 60 
                      ? `You need significant improvement in ${topic}. Focus on mastering the fundamentals.` 
                      : data.percentage < 80 
                        ? `You have a basic understanding of ${topic}, but need more practice to strengthen your skills.`
                        : `You're doing well in ${topic}. Continue to challenge yourself with advanced concepts.`
                    }
                  </p>
                </div>
              ))}
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <button 
            onClick={() => navigate('/learning-path')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Learning Path
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestResults;