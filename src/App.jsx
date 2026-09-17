import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingEcoAI from './components/FloatingEcoAI';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import WasteGuide from './pages/WasteGuide';
import Challenges from './pages/Challenges';
import EcoSort from './pages/EcoSort';
import EcoAI from './pages/EcoAI';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />

            <Route path="/waste-guide" element={
              <ProtectedRoute>
                <WasteGuide />
              </ProtectedRoute>
            } />

            <Route path="/challenges" element={
              <ProtectedRoute>
                <Challenges />
              </ProtectedRoute>
            } />

            <Route path="/ecosort" element={
              <ProtectedRoute>
                <EcoSort />
              </ProtectedRoute>
            } />

            <Route path="/ecoai" element={
              <ProtectedRoute>
                <EcoAI />
              </ProtectedRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </main>

        <Footer />
        <FloatingEcoAI />
      </div>
    </BrowserRouter>
  );
}
