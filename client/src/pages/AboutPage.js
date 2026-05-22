import React from 'react';

const AboutPage = () => {
  return (
    <div style={{ 
      backgroundColor: '#0b0c10', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '40px 20px'
    }}>
      <h2 style={{ 
        color: '#66fcf1', 
        fontSize: '2rem', 
        letterSpacing: '3px',
        marginBottom: '30px'
      }}>ABOUT</h2>

      <p style={{ 
        color: '#c5c6c7', 
        fontSize: '1rem', 
        lineHeight: '1.8',
        maxWidth: '600px',
        textAlign: 'center'
      }}>
        CineVerse is a front-end web application built with React.js.
        It displays a collection of movies with search and sort functionality.
        This project was built as part of a Web Applications Programming course.

        <strong><br />The work was arranged as follows:</strong><br />
         <strong>Sara Alaqaileh 2338978</strong><br />
        <strong>"Tasks: MainPages & data.json".</strong><br />
        <strong> Raneem Aljbour 2438601</strong><br />
        <strong>"Tasks: Header & Routers".</strong><br />
       <strong> Saja Al hashaykeh 2137603</strong><br />
        <strong>"Tasks: Login , about & Register".</strong><br />
       
      </p>

      <p style={{ marginTop: '20px', color: '#45a29e', fontWeight: 'bold' }}>
        Built with React | Data from local JSON
      </p>
    </div>
  );
};

export default AboutPage;