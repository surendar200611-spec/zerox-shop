import { motion } from 'framer-motion';
import xeroxImg from '../assets/xerox.png';
import printerImg from '../assets/printer.png';
import scannerImg from '../assets/scanner.png';
import laminationImg from '../assets/lamination.png';
import bindingImg from '../assets/binding.png';
import designImg from '../assets/design.png';

const services = [
  { 
    title: 'Xerox', 
    desc: 'High-quality black & white copying for all your documents.', 
    image: xeroxImg,
    price: '₹2 /pg'
  },
  { 
    title: 'Printing', 
    desc: 'Vibrant color document printing from any device/cloud.', 
    image: printerImg,
    price: '₹10 /pg'
  },
  { 
    title: 'Scanning', 
    desc: 'Digitalize your documents into high-resolution PDFs.', 
    image: scannerImg,
    price: '₹5 /pg'
  },
  { 
    title: 'Lamination', 
    desc: 'Protect your certificates with premium matte quality.', 
    image: laminationImg,
    price: '₹30 /sheet'
  },
  { 
    title: 'Binding', 
    desc: 'Professional spiral and hard binding for reports.', 
    image: bindingImg,
    price: '₹40 /book'
  },
  { 
    title: 'Graphic Design', 
    desc: 'Professional logos, posters, and creative layouts.', 
    image: designImg,
    price: 'Starting ₹99'
  }
];

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section id="services" style={{ padding: '100px 20px', textAlign: 'center', background: '#FFFFFF', borderTop: '1px solid #EEEEEE' }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '15px', color: '#000000', fontWeight: 900 }} className="text-gradient">
          Premium Services
        </h2>
        <p style={{ color: '#444444', marginBottom: '60px', fontSize: '1.2rem', fontWeight: 500, maxWidth: '700px', margin: '0 auto 80px auto', opacity: 0.8 }}>
          Elite documentation and creative solutions tailored for your success.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          maxWidth: '1300px',
          margin: '0 auto',
        }}>
          {services.map((item, idx) => (
            <motion.div 
              key={idx} 
              variants={cardVariants}
              whileHover={{ y: -15, scale: 1.02 }}
              className="glass-card" 
              style={{
                padding: '50px 30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '25px',
                textAlign: 'center',
                background: 'white',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Image Container with Floating Anim */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: '180px',
                  height: '140px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img 
                   src={item.image} 
                   alt={item.title} 
                   style={{ 
                     maxWidth: '100%', 
                     maxHeight: '100%', 
                     objectFit: 'contain',
                     filter: 'drop-shadow(0 15px 15px rgba(0,0,0,0.15))' 
                   }} 
                />
              </motion.div>

              <div style={{ zIndex: 1 }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '10px', color: '#000000', fontWeight: 900 }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '20px', minHeight: '3em' }}>{item.desc}</p>
                
                <div style={{
                  display: 'inline-block',
                  fontWeight: 900,
                  color: '#000000',
                  fontSize: '1.2rem',
                  background: 'var(--primary)',
                  padding: '8px 25px',
                  borderRadius: '15px',
                  boxShadow: '0 5px 0 #DAB91B',
                  transform: 'rotate(-2deg)'
                }}>
                  {item.price}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 480px) {
          section { padding: 60px 15px; }
          .glass-card { padding: 40px 20px; }
        }
      `}</style>
    </section>
  );
};

export default Services;
