import React from 'react';
import { Mail, Phone, MapPin, Camera, Globe, Send } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="contact" style={{ padding: '80px 20px', background: '#FFFFFF', borderTop: '2px solid #000000' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }} className="footer-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <h3 style={{ fontSize: '1.8rem', margin: 0, fontWeight: 900, color: '#000000' }}>Dolphin Xerox</h3>
                    <p style={{ color: '#555555', lineHeight: '1.6', fontSize: '1rem', fontWeight: 500 }}>
                        Elevating documentation standards with high-speed, professional, and elite printing services.
                    </p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '10px', boxShadow: '0 4px 0 #DAB91B' }}><Camera size={20} color="#000000" /></div>
                        <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '10px', boxShadow: '0 4px 0 #DAB91B' }}><Globe size={20} color="#000000" /></div>
                        <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '10px', boxShadow: '0 4px 0 #DAB91B' }}><Send size={20} color="#000000" /></div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#000000', marginBottom: '5px' }}>QUICK NAV</h4>
                    <a href="#" style={{ color: '#555555', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Home Page</a>
                    <a href="#services" style={{ color: '#555555', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Our Services</a>
                    <a href="#upload" style={{ color: '#555555', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Order System</a>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#000000', marginBottom: '10px' }}>GET IN TOUCH</h4>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#444444', fontWeight: 600, fontSize: '0.95rem', marginBottom: '8px' }}>
                        <MapPin size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>Freesia Complex, PT Rajan Rd, Narimedu, Madurai, Tamil Nadu 625002</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#444444', fontWeight: 600, fontSize: '0.95rem', marginBottom: '8px' }}>
                        <Phone size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                        <span style={{ letterSpacing: '0.5px' }}>+91 84384 99443</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#444444', fontWeight: 600, fontSize: '0.95rem' }}>
                        <Mail size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                        <span>contact@dolphinxerox.com</span>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '60px', color: '#888888', borderTop: '1px solid #EEEEEE', paddingTop: '20px' }}>
                <p style={{ fontSize: '0.85rem' }}>© 2026 Dolphin Xerox Enterprise. All Rights Reserved.</p>
            </div>
            
            <style>{`
              @media (max-width: 768px) {
                footer { padding: 60px 20px; }
                .footer-grid { 
                  display: flex !important; 
                  flex-direction: column !important; 
                  gap: 35px !important;
                }
                h3 { font-size: 2.2rem !important; }
                span { line-height: 1.4; }
              }
            `}</style>
        </footer>
    );
};

export default Footer;
