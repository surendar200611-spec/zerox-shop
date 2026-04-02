import React, { useState } from 'react';
import { Lock, User, LogIn } from 'lucide-react';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'dolphin123') {
      onLogin(true);
    } else {
      setError('Invalid credentials. Access denied.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
    }}>
      <div className="glass-card" style={{ padding: '50px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <div style={{
          background: 'rgba(0, 229, 255, 0.1)',
          width: '70px',
          height: '70px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px auto',
        }}>
          <Lock size={35} color="var(--primary)" />
        </div>
        
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }} className="text-gradient">Admin Login</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Dolphin Xerox Management Portal</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <User size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '15px 15px 15px 45px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                color: 'white',
              }}
            />
          </div>
          
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '15px 15px 15px 45px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                color: 'white',
              }}
            />
          </div>
          
          {error && <p style={{ color: 'red', fontSize: '0.8rem', margin: 0 }}>{error}</p>}
          
          <button className="button-3d" type="submit" style={{ padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <LogIn size={20} /> Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
