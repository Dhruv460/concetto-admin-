import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashbboard.jsx';
import CreateEvent from './components/CreateEvent.jsx';
import EditEvent from './components/EditEvent.jsx';
import EventList from './components/EventList.jsx'

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flexGrow: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/edit/:id" element={<EditEvent />} />
            <Route path="/events" element={<EventList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
