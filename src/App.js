import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar      from './components/Navbar';
import Onboarding  from './components/Onboarding';
import EventsList  from './components/EventsList';
import EventDetail from './components/EventDetail';
import CreateEvent from './components/CreateEvent';
import Calendar    from './components/Calendar';
import Profile     from './components/Profile';
import './index.css';

function AppRoutes() {
  const { state } = useApp();

  // Send unauthenticated users to onboarding
  if (!state.onboarded) {
    return (
      <Routes>
        <Route path="*" element={<Onboarding />} />
      </Routes>
    );
  }

  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/"              element={<Navigate to="/events" replace />} />
        <Route path="/events"        element={<EventsList />} />
        <Route path="/events/:id"    element={<EventDetail />} />
        <Route path="/calendar"      element={<Calendar />} />
        <Route path="/create"        element={<CreateEvent />} />
        <Route path="/profile"       element={<Profile />} />
        <Route path="*"              element={<Navigate to="/events" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
