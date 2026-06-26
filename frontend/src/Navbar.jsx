import React from 'react';
import { NavLink } from 'react-router-dom';
import { Globe, BookOpen } from 'lucide-react';

function Navbar() {
  return (
    <nav style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      padding: '16px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100,
      background: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      boxSizing: 'border-box'
    }}>
      <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Globe color="#38bdf8" /> Global Oil Market Simulator
      </div>
      <div style={{ display: 'flex', gap: '24px' }}>
        <NavLink 
          to="/" 
          style={({ isActive }) => ({
            color: isActive ? '#38bdf8' : '#cbd5e1',
            textDecoration: 'none',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: isActive ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          })}
        >
          <Globe size={18} /> Dashboard
        </NavLink>
        <NavLink 
          to="/explain" 
          style={({ isActive }) => ({
            color: isActive ? '#38bdf8' : '#cbd5e1',
            textDecoration: 'none',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: isActive ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          })}
        >
          <BookOpen size={18} /> Explanation Mode
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
