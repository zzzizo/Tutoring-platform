import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Personalized Learning Powered by AI
              </h1>
              <p className="text-xl mb-8">
                Our AI-powered tutoring platform adapts to your learning style and helps you master any subject at your own pace.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/register"
                  className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 text-center"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/learning-style-assessment"
                  className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-blue-700 text-center"
                >
                  Take Learning Style Quiz
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://via.placeholder.com/600x400?text=AI+Tutoring+Platform"
                alt="AI Tutoring Platform"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How Our Platform Works</h2>
            <p className="mt-4 text-xl text-gray-600">
              We combine AI technology with proven learning methods to create a personalized experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Identify Your Learning Style</h3>
              <p className="text-gray-600">
                Take our assessment to discover whether you're a visual, auditory, reading/writing, or kinesthetic learner.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Assess Your Knowledge</h3>
              <p className="text-gray-600">
                Complete diagnostic tests to identify your strengths and areas for improvement in each subject.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Follow Your Learning Path</h3>
              <p className="text-gray-600">
                Get a personalized curriculum that adapts to your progress and presents content in your preferred learning style.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Students Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold mr-4">J</div>
                <div>
                  <h3 className="font-semibold">John D.</h3>
                  <p className="text-sm text-gray-600">Mathematics Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The AI tutor helped me understand calculus concepts that I had been struggling with for months. The personalized approach made all the difference."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold mr-4">S</div>
                <div>
                  <h3 className="font-semibold">Sarah M.</h3>
                  <p className="text-sm text-gray-600">Physics Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As a visual learner, I always struggled with traditional textbooks. This platform presents everything with diagrams and animations that make concepts click for me."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold mr-4">R</div>
                <div>
                  <h3 className="font-semibold">Robert K.</h3>
                  <p className="text-sm text-gray-600">Chemistry Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I improved my grades from C to A- in just two months using this platform. The AI tutor identified exactly where I was getting confused and helped me through it."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning Experience?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of students who are achieving their academic goals with our AI-powered tutoring platform.
          </p>
          <Link
            to="/register"
            className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </div>



      {/* Pricing CTA Section */}
      <div className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Ready to start learning?</h2>
            <p className="mt-4 text-xl text-gray-600">
              Choose a plan that works for you and begin your personalized learning journey today.
            </p>
            <div className="mt-8">
              <Link
                to="/pricing"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 inline-block"
              >
                View Pricing Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;