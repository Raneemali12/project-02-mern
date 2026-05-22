import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://project-02-mern.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Registered successfully! Redirecting...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div style={{ backgroundColor: '#0b0c10', minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', color: 'white', fontFamily: "'Segoe UI', sans-serif" }}>
      
      <h2 style={{ color: '#66fcf1', fontSize: '2rem', letterSpacing: '3px', marginBottom: '30px' }}>REGISTER</h2>

      <form onSubmit={handleRegister}
        style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' }}>
        
        <input type="text" placeholder="Username" value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '12px 20px', backgroundColor: '#1f2833',
            border: '2px solid #45a29e', borderRadius: '25px',
            color: 'white', outline: 'none' }} />
        
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '12px 20px', backgroundColor: '#1f2833',
            border: '2px solid #45a29e', borderRadius: '25px',
            color: 'white', outline: 'none' }} />
        
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
        
        <button type="submit"
          style={{ padding: '12px 25px', backgroundColor: '#45a29e',
            color: '#0b0c10', border: 'none', borderRadius: '25px',
            fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;