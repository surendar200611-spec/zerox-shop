import React from 'react';
import { Zap, Monitor, Layout } from 'lucide-react';

const Hero = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '100px 20px',
            textAlign: 'center',
            position: 'relative',
            background: 'radial-gradient(circle at top right, rgba(249, 212, 35, 0.03), transparent)',
        }}>
            <div style={{ maxWidth: '1000px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '25px' }}>
                <img 
                    src="/logo.jpg" 
                    alt="Dolphin Xerox Logo" 
                    style={{ width: '120px', height: '120px', borderRadius: '30px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)', border: '4px solid var(--secondary)' }} 
                    className="float-animation"
                />
                
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 16px',
                    borderRadius: '50px',
                    background: '#FFFFFF',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #EEEEEE',
                }}>
                   <Zap size={20} color="var(--primary)" />
                   <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#000000', letterSpacing: '1px' }}>ELITE PRINTING SYSTEM</span>
                </div>
                
                <h1 style={{
                    fontSize: 'clamp(3rem, 10vw, 5.5rem)',
                    margin: '0',
                    lineHeight: '1',
                    fontWeight: 900,
                    color: '#000000',
                    letterSpacing: '-2px',
                }}>
                    Dolphin Xerox <br /> <span style={{ color: '#DAB91B' }}>Fast & Smart</span>
                </h1>
                
                <p style={{
                    fontSize: 'clamp(1rem, 3vw, 1.3rem)',
                    color: '#444444',
                    maxWidth: '800px',
                    margin: '0 auto',
                    fontWeight: 500,
                    lineHeight: '1.6',
                }}>
                    The premium destination for all your printing needs. We combine the official Dolphin Xerox quality standards with modern 3D technology. 
                </p>
                
                <div style={{ display: 'flex', gap: '20px', marginTop: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <button 
                      className="button-3d" 
                      style={{ padding: '15px 35px', fontSize: '1rem' }}
                      onClick={() => scrollToSection('upload')}
                    >
                        Order Now
                    </button>
                    <button 
                      style={{
                        padding: '15px 35px',
                        fontSize: '1rem',
                        background: 'transparent',
                        border: '2px solid #000000',
                        color: '#000000',
                        borderRadius: '12px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 4px 0 #000000',
                      }}
                      onClick={() => scrollToSection('services')}
                    >
                        Our Services
                    </button>
                </div>
            </div>
            
            <div className="float-animation" style={{ position: 'absolute', top: '25%', right: '12%', opacity: 0.12 }}>
                <Monitor size={180} color="#000000" />
            </div>
            <div className="float-animation" style={{ position: 'absolute', bottom: '20%', left: '12%', opacity: 0.12, animationDelay: '1.5s' }}>
                <Layout size={140} color="#000000" />
            </div>

            <style>{`
              @media (max-width: 1024px) {
                .float-animation { display: none; }
                section { padding: 120px 20px 80px 20px; }
              }
              @media (max-width: 480px) {
                img { width: 80px; height: 80px; borderRadius: '20px'; }
              }
            `}</style>
        </section>
    );
};

export default Hero;
