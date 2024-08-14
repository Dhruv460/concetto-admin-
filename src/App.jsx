import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashbboard.jsx';
import CreateEvent from './components/CreateEvent.jsx';
import EditEvent from './components/EditEvent.jsx';
import EventList from './components/EventList.jsx'
import DeleteEvent from './components/DeleteEvent.jsx';
function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flexGrow: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreateEvent />} />
            {/* <Route path="/edit/:id" element={<EditEvent />} /> */}
            <Route path="/events" element={<EventList />} />
                    <Route path="/events/edit/:eventId" element={<EditEvent />} />
        <Route path="/events/delete/:eventId" element={<DeleteEvent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
