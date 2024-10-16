import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import './App.css';

const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');  
};

const PrivateRoute = ({ element: Component }) => {
    return isAuthenticated() ? Component : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Container>
                <Routes>
                    <Route path="/" element={isAuthenticated() ? <Navigate to="/home" /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                    <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
