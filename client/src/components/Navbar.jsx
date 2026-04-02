import React from 'react';

const Navbar = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav style={{
            position: 'fixed',
            top: '15px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '94%',
            maxWidth: '1200px',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 20px',
            background: 'var(--bg-beige)',
            border: '2px solid var(--secondary)',
            boxShadow: '0 6px 0 var(--secondary)',
            borderRadius: '16px',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                    src="/logo.jpg" 
                    alt="Dolphin Xerox Logo" 
                    style={{ width: '45px', height: '45px', borderRadius: '10px', objectFit: 'cover', border: '2px solid var(--secondary)' }} 
                />
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--secondary)', letterSpacing: '-1px' }}>
                    Dolphin Xerox
                </span>
            </div>
            
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <button 
                  onClick={() => scrollToSection('upload')} 
                  className="button-3d" 
                  style={{ fontSize: '0.75rem', padding: '8px 16px' }}
                >
                    Order Now
                </button>
            </div>

            <style>{`
              @media (max-width: 480px) {
                nav { padding: 6px 12px; width: 96%; }
                span { display: none; }
                img { width: 40px; height: 40px; }
              }
            `}</style>
        </nav>
    );
};

export default Navbar;
