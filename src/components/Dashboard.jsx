import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  BarElement
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [testResults, setTestResults] = useState(null);
  const [learningPath, setLearningPath] = useState([]);
  const [userProfile, setUserProfile] = useState({
    name: 'Student',
    email: 'student@example.com',
    learningStyle: 'visual',
    completedTests: 1,
    completedLessons: 3,
    totalStudyTime: '12h 30m'
  });
  const [progressData, setProgressData] = useState({
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Performance Score',
        data: [65, 72, 78, 82],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  });

  useEffect(() => {
    // Get test results from localStorage
    const storedResults = localStorage.getItem('testResults');
    if (storedResults) {
      setTestResults(JSON.parse(storedResults));
    }

    // Get learning path from localStorage
    const storedPath = localStorage.getItem('learningPath');
    if (storedPath) {
      setLearningPath(JSON.parse(storedPath));
    } else {
      // If no learning path exists, create a default one
      const defaultPath = [
        {
          subject: 'Mathematics',
          priority: 'high',
          modules: [
            { title: 'Algebra Fundamentals', progress: 30 },
            { title: 'Geometry Basics', progress: 0 }
          ]
        },
        {
          subject: 'Physics',
          priority: 'medium',
          modules: [
            { title: 'Mechanics', progress: 15 },
            { title: 'Thermodynamics', progress: 0 }
          ]
        }
      ];
      setLearningPath(defaultPath);
      localStorage.setItem('learningPath', JSON.stringify(defaultPath));
    }
  }, []);

  // Prepare chart data for subject performance
  const subjectPerformanceData = {
    labels: testResults ? Object.keys(testResults.subjectPerformance) : [],
    datasets: [
      {
        label: 'Subject Performance',
        data: testResults ? Object.values(testResults.subjectPerformance).map(data => data.percentage) : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare doughnut chart data for overall progress
  const overallProgressData = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
      {
        data: [30, 15, 55],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(220, 220, 220, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(220, 220, 220, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <div className="flex space-x-4">
          <Link 
            to="/diagnostic-test" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Take Diagnostic Test
          </Link>
          <Link 
            to="/learning-path" 
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            View Learning Path
          </Link>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mr-4">
            {userProfile.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{userProfile.name}</h2>
            <p className="text-gray-600">{userProfile.email}</p>
            <div className="mt-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mr-2">
                {userProfile.learningStyle.charAt(0).toUpperCase() + userProfile.learningStyle.slice(1)} Learner
              </span>
            </div>
          </div>
          <div className="ml-auto grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-gray-600 text-sm">Tests</p>
              <p className="text-xl font-semibold">{userProfile.completedTests}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Lessons</p>
              <p className="text-xl font-semibold">{userProfile.completedLessons}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Study Time</p>
              <p className="text-xl font-semibold">{userProfile.totalStudyTime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Test Results Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {testResults ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Latest Test Results</h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Score</p>
                <p className="text-2xl font-bold text-blue-600">{testResults.score}/{testResults.totalQuestions}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Percentage</p>
                <p className="text-2xl font-bold text-blue-600">{testResults.percentage.toFixed(1)}%</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-sm font-medium text-gray-800">
                  {new Date(testResults.completedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="h-64">
              <Bar 
                data={subjectPerformanceData} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: true,
                      text: 'Subject Performance'
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
            <div className="mt-4 text-center">
              <Link 
                to="/test-results" 
                className="text-blue-600 hover:underline"
              >
                View Detailed Results
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold mb-4">No Test Results Yet</h2>
            <p className="text-gray-600 mb-6">Take a diagnostic test to see your performance analysis</p>
            <Link 
              to="/diagnostic-test" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Take Test Now
            </Link>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Progress Overview</h2>
          <div className="h-64 flex items-center justify-center">
            <div className="w-3/4">
              <Doughnut 
                data={overallProgressData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    }
                  },
                  cutout: '70%'
                }}
              />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-medium mb-2">Performance Trend</h3>
            <Line 
              data={progressData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Learning Path Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Learning Path</h2>
        
        <div className="space-y-6">
          {learningPath.map((path, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div className={`p-3 ${
                path.priority === 'high' ? 'bg-red-500' :
                path.priority === 'medium' ? 'bg-yellow-500' :
                'bg-green-500'
              } text-white`}>
                <h3 className="font-semibold">{path.subject}</h3>
              </div>
              <div className="p-4">
                {path.modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="mb-3 last:mb-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{module.title}</span>
                      <span className="text-sm text-gray-600">{module.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                <div className="mt-3 text-right">
                  <Link 
                    to={`/subject/${path.subject.toLowerCase()}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Continue Learning
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Link 
            to="/learning-path" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Full Learning Path
          </Link>
        </div>
      </div>

      {/* Recommended Resources */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recommended Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testResults ? (
            // Generate recommendations based on test results
            Object.entries(testResults.subjectPerformance)
              .sort(([, a], [, b]) => a.percentage - b.percentage)
              .slice(0, 3)
              .map(([subject, data], index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-medium mb-2">{subject} Resources</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {data.percentage < 60 
                      ? `Strengthen your ${subject} fundamentals with these resources.`
                      : `Enhance your ${subject} knowledge with advanced materials.`}
                  </p>
                  <Link 
                    to={`/resources/${subject.toLowerCase()}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Resources
                  </Link>
                </div>
              ))
          ) : (
            // Default recommendations
            ['Mathematics', 'Physics', 'Chemistry'].map((subject, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-2">{subject} Resources</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Explore our curated {subject.toLowerCase()} resources for all levels.
                </p>
                <Link 
                  to={`/resources/${subject.toLowerCase()}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Resources
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;