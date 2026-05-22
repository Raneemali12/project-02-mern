import React, { useState, useEffect } from 'react';
import './MainPage.css';

const MainPage = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [showForm, setShowForm] = useState(false);
    const [newMovie, setNewMovie] = useState({ title: '', description: '', year: '', rating: '' });
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const fetchMovies = () => {
        fetch('http://localhost:5000/api/items', { credentials: 'include' })
        .then(res => res.json())
        .then(data => setMovies(Array.isArray(data) ? data : []))
        .catch(err => console.log(err));
    };

    useEffect(() => { fetchMovies(); }, []);

    const handleAdd = async () => {
        await fetch('http://localhost:5000/api/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(newMovie)
        });
        setNewMovie({ title: '', description: '', year: '', rating: '' });
        setShowForm(false);
        fetchMovies();
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/items/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        fetchMovies();
    };

    const handleEdit = (id, title, description) => {
        setEditId(id);
        setEditTitle(title);
        setEditDescription(description);
    };

    const handleUpdate = async () => {
        await fetch(`http://localhost:5000/api/items/${editId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ title: editTitle, description: editDescription })
        });
        setEditId(null);
        fetchMovies();
    };

    const handleLogout = async () => {
        await fetch('http://localhost:5000/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });
        window.location.href = '/';
    };

    const filteredMovies = movies
        .filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'rating') return b.rating - a.rating;
            if (sortBy === 'oldest') return a.year - b.year;
            return b.year - a.year;
        });

    return (
        <div className="main-container">
            <header className="page-header">
                <h1>CineVerse</h1>
                <div className="controls">
                    <input type="text" placeholder="ابحث عن فيلم..." className="search-input"
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    <select className="search-input" value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{ marginLeft: '10px', padding: '0 10px' }}>
                        <option value="newest">الأحدث</option>
                        <option value="oldest">الأقدم</option>
                        <option value="rating">الأعلى تقييماً</option>
                    </select>
                    <button className="search-button" onClick={() => setShowForm(!showForm)}>+ Add Movie</button>
                    <button className="search-button" onClick={handleLogout} style={{marginLeft:'10px', backgroundColor:'#e74c3c'}}>Logout</button>
                </div>
            </header>

            {showForm && (
                <div style={{ padding: '20px', backgroundColor: '#1f2833', margin: '20px', borderRadius: '10px' }}>
                    <input placeholder="Title" value={newMovie.title}
                        onChange={(e) => setNewMovie({...newMovie, title: e.target.value})}
                        style={{ margin: '5px', padding: '8px', width: '200px' }} />
                    <input placeholder="Description" value={newMovie.description}
                        onChange={(e) => setNewMovie({...newMovie, description: e.target.value})}
                        style={{ margin: '5px', padding: '8px', width: '200px' }} />
                    <input placeholder="Year" value={newMovie.year}
                        onChange={(e) => setNewMovie({...newMovie, year: e.target.value})}
                        style={{ margin: '5px', padding: '8px', width: '100px' }} />
                    <input placeholder="Rating" value={newMovie.rating}
                        onChange={(e) => setNewMovie({...newMovie, rating: e.target.value})}
                        style={{ margin: '5px', padding: '8px', width: '100px' }} />
                    <button onClick={handleAdd} style={{ margin: '5px', padding: '8px 20px', backgroundColor: '#45a29e', border: 'none', cursor: 'pointer' }}>Add</button>
                </div>
            )}

            {editId && (
                <div style={{ padding: '20px', backgroundColor: '#1f2833', margin: '20px', borderRadius: '10px' }}>
                    <input value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        style={{ margin: '5px', padding: '8px', width: '200px' }} />
                    <input value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        style={{ margin: '5px', padding: '8px', width: '200px' }} />
                    <button onClick={handleUpdate} style={{ margin: '5px', padding: '8px 20px', backgroundColor: '#45a29e', border: 'none', cursor: 'pointer' }}>Save</button>
                    <button onClick={() => setEditId(null)} style={{ margin: '5px', padding