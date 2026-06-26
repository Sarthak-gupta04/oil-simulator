import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Presentation from './Presentation';
import Navbar from './Navbar';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', background: '#020617' }}>
      <Navbar />
      <div style={{ width: '100%', height: '100%', paddingTop: '72px', boxSizing: 'border-box' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/explain" element={<Presentation />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
