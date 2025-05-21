import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import SubjectsPage from './pages/SubjectsPage';
import SubjectDetailPage from './pages/SubjectDetailPage';
import TestNowPage from './pages/TestNowPage';
import NotFoundPage from './pages/NotFoundPage';
import FirebaseTest from './components/FirebaseTest';

// Import Bootstrap CSS first
import 'bootstrap/dist/css/bootstrap.min.css';
// Then import your custom styles
import './assets/css/styles.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container d-flex flex-column min-vh-100">
          <Header />
          <main className="main-content flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/firebase-test" element={<FirebaseTest />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              } />
              <Route path="/subjects" element={
                <PrivateRoute>
                  <SubjectsPage />
                </PrivateRoute>
              } />
              <Route path="/subjects/:subjectId" element={
                <PrivateRoute>
                  <SubjectDetailPage />
                </PrivateRoute>
              } />
              <Route path="/test-now" element={<TestNowPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


