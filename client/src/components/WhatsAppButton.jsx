import React from 'react';

const WhatsAppButton = () => {
    const whatsappNumber = "918438499443";
    const message = "Hello Dolphin Xerox, I would like to inquire about printing services.";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                zIndex: 2000,
                width: '65px',
                height: '65px',
                background: '#FFFFFF',
                border: '3px solid #25D366',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 5px 0 #25D366',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                textDecoration: 'none',
                overflow: 'hidden',
            }}
            className="whatsapp-btn"
        >
            <img 
                src="/whatsapp.jpg" 
                alt="WhatsApp Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            
            <style>{`
                .whatsapp-btn:hover {
                    transform: translateY(-8px) scale(1.1);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15), 0 5px 0 #25D366;
                }
                .whatsapp-btn:active {
                    transform: translateY(4px) scale(0.95);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1), 0 0px 0 #25D366;
                }
                @media (max-width: 768px) {
                    .whatsapp-btn { width: 55px; height: 55px; bottom: 20px; right: 20px; }
                }
            `}</style>
        </a>
    );
};

export default WhatsAppButton;
