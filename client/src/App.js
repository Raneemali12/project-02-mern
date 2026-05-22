import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './pages/MainPage'; 
import RegisterPage from './pages/RegisterPage'; 
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <Header /> 
      
      <Routes>
         <Route path="/home" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
         <Route path="/" element={<LoginPage />} />
        { <Route path="/login" element={<LoginPage />} /> }
         <Route path="/about" element={<AboutPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;