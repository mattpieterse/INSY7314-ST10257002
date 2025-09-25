import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import PostList from './components/postList';
import Login from './components/login';
import CreatePost from './components/postCreate';
import EditPost from './components/postEdit';
import Register from './components/register';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
