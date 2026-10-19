import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: '#F8FAFC',
      borderTop: '1px solid rgba(15, 23, 42, 0.08)',
      padding: '40px 20px',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div>
          <h3 style={{ color: '#2563EB', marginBottom: '10px' }}>QuickCart</h3>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Premium E-Commerce Platform.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/about" style={{ color: '#64748B', fontSize: '0.9rem' }}>About Us</Link>
          <Link to="/return" style={{ color: '#64748B', fontSize: '0.9rem' }}>Return Policy</Link>
          <Link to="/disclaimer" style={{ color: '#64748B', fontSize: '0.9rem' }}>Disclaimer</Link>
        </div>
        
        <div style={{ color: '#64748B', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} QuickCart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
