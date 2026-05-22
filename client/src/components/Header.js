import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav style={{ padding: '20px', backgroundColor: '#1a1a1a', display: 'flex', justifyContent: 'center', gap: '20px' }}>
            
            <Link to="/home" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Home (Movies)</Link>
            
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
            <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
        </nav>
    );
};

export default Header;