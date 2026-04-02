import React from 'react';
import { MapPin, Phone } from 'lucide-react';

const Navbar = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Top Contact Strip - Hidden on very small screens, shown as integrated below */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '32px',
                background: '#000000',
                zIndex: 1001,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 20px',
                gap: '20px',
                color: 'var(--primary)',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.5px'
            }} className="top-strip">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={12} color="var(--primary)" />
                    <span>Madurai, TN</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={12} color="var(--primary)" />
                    <span>+91 84384 99443</span>
                </div>
            </div>

            <nav style={{
                position: 'fixed',
                top: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '94%',
                maxWidth: '1200px',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 20px',
                background: 'var(--bg-beige)',
                border: '2px solid var(--secondary)',
                boxShadow: '0 6px 0 var(--secondary)',
                borderRadius: '16px',
            }} className="main-nav">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img 
                        src="/logo.jpg" 
                        alt="Logo" 
                        style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', border: '2px solid var(--secondary)' }} 
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--secondary)', letterSpacing: '-0.5px', lineHeight: 1 }}>
                            Dolphin Xerox
                        </span>
                        <span className="mobile-phone" style={{ fontSize: '0.7rem', fontWeight: 800, color: '#666', marginTop: '2px', display: 'none' }}>
                             +91 84384 99443
                        </span>
                    </div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button 
                      onClick={() => scrollToSection('upload')} 
                      className="button-3d" 
                      style={{ fontSize: '0.7rem', padding: '10px 18px' }}
                    >
                        Order
                    </button>
                </div>

                <style>{`
                  @media (max-width: 480px) {
                    .top-strip { display: none !important; }
                    .main-nav { top: 15px !important; width: 96% !important; padding: 8px 12px !important; }
                    .main-nav span:first-child { font-size: 1rem !important; }
                    .mobile-phone { display: block !important; }
                  }
                `}</style>
            </nav>
        </>
    );
};

export default Navbar;
