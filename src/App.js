import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import LearningStyleAssessment from './components/LearningStyleAssessment';
import LearningStyleResults from './components/LearningStyleResults';
import DiagnosticTest from './components/DiagnosticTest';
import TestResults from './components/TestResults';
import LearningPath from './components/LearningPath';
import LearningContent from './components/LearningContent';
import Profile from './components/Profile';
import Pricing from './components/Pricing'; 
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learning-style-assessment" element={<LearningStyleAssessment />} />
            <Route path="/learning-style-results" element={<LearningStyleResults />} />
            <Route path="/diagnostic-test" element={<DiagnosticTest />} />
            <Route path="/test-results" element={<TestResults />} />
            <Route path="/learning-path" element={<LearningPath />} />
            <Route path="/learning-content/:subject/:module" element={<LearningContent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} /> {/* Add this route inside Routes */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


