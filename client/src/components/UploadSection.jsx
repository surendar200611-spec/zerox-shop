import React, { useState, useEffect } from 'react';
import gpayLogo from '../assets/gpay.png';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, X } from 'lucide-react';

const UploadSection = () => {
    const [files, setFiles] = useState([]);
    const [filePreviews, setFilePreviews] = useState([]);
    const [copies, setCopies] = useState(1);
    const [colorMode, setColorMode] = useState('BW');
    const [pageSize, setPageSize] = useState('A4');
    const [totalPrice, setTotalPrice] = useState(0);
    const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        // Price calculation: (Price per File) * (Number of Files) * Copies
        if (pageSize !== 'A4' || files.length === 0) {
            setTotalPrice(0);
            return;
        }
        let basePrice = colorMode === 'BW' ? 2 : 10;
        setTotalPrice(basePrice * files.length * copies);
    }, [copies, colorMode, pageSize, files]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 0) {
            setFiles(prev => [...prev, ...selectedFiles]);
            
            const newPreviews = selectedFiles.map(file => {
                if (file.type.startsWith('image/')) {
                    return URL.createObjectURL(file);
                }
                return null;
            });
            setFilePreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeFile = (index, e) => {
        e.stopPropagation();
        setFiles(prev => prev.filter((_, i) => i !== index));
        setFilePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (files.length === 0 || !customerName || !phone) {
            alert('Please fill all fields and select at least one file.');
            return;
        }
        setStatus('uploading');
        try {
            const formData = new FormData();
            formData.append('customerName', customerName);
            formData.append('phoneNumber', phone);
            formData.append('copies', copies);
            formData.append('colorMode', colorMode);
            formData.append('pageSize', pageSize);
            formData.append('totalPrice', totalPrice);

            // Append each file
            files.forEach(file => {
                formData.append('files', file);
            });

            await axios.post('http://localhost:5000/api/orders', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            setStatus('success');
            setFiles([]);
            setFilePreviews([]);
            setTimeout(() => setStatus('idle'), 3000);
        } catch (err) {
            console.error('Submission failed:', err);
            setStatus('error');
        }
    };

    return (
        <section id="upload" style={{ padding: '80px 20px', background: 'var(--bg-beige)' }}>
            <div style={{
                maxWidth: '1000px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '30px',
            }} className="glass-card main-container">
                <div style={{ padding: '50px 40px', borderRight: '1px solid #EEEEEE' }} className="form-column">
                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ fontSize: '2.5rem', margin: '0 0 5px 0', color: '#000000', fontWeight: 900, letterSpacing: '-1px' }}>
                            Upload & Print
                        </h3>
                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600 }}>
                            Securely process your documents in seconds.
                        </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        
                        {/* Professional Inputs */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ position: 'relative' }}>
                                <input 
                                    type="text" 
                                    placeholder="Full Name" 
                                    value={customerName} 
                                    onChange={(e) => setCustomerName(e.target.value)} 
                                    style={{ 
                                        width: '100%', 
                                        padding: '15px 20px', 
                                        background: '#F8F9FA', 
                                        border: '2px solid transparent', 
                                        borderRadius: '15px', 
                                        color: '#000000', 
                                        fontWeight: 700,
                                        fontSize: '0.95rem',
                                        transition: 'all 0.3s ease',
                                        outline: 'none',
                                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                                    }} 
                                    onFocus={(e) => e.target.style.border = '2px solid var(--primary)'}
                                    onBlur={(e) => e.target.style.border = '2px solid transparent'}
                                />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <input 
                                    type="text" 
                                    placeholder="Phone Number (e.g. +91 84384 99443)" 
                                    value={phone} 
                                    onChange={(e) => setPhone(e.target.value)} 
                                    style={{ 
                                        width: '100%', 
                                        padding: '15px 20px', 
                                        background: '#F8F9FA', 
                                        border: '2px solid transparent', 
                                        borderRadius: '15px', 
                                        color: '#000000', 
                                        fontWeight: 700,
                                        fontSize: '0.95rem',
                                        transition: 'all 0.3s ease',
                                        outline: 'none',
                                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                                    }} 
                                    onFocus={(e) => e.target.style.border = '2px solid var(--primary)'}
                                    onBlur={(e) => e.target.style.border = '2px solid transparent'}
                                />
                            </div>
                        </div>
                        
                        {/* Professional Drop Zone for Multiple Files */}
                        <motion.div 
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          style={{ 
                            position: 'relative',
                            padding: '30px 20px', 
                            border: '2px dashed rgba(0, 0, 0, 0.2)', 
                            borderRadius: '20px', 
                            textAlign: 'center', 
                            cursor: 'pointer', 
                            background: 'white',
                            boxShadow: 'var(--shadow-matte)',
                            transition: 'border-color 0.3s ease'
                          }} 
                          onClick={() => document.getElementById('file-input').click()}
                        >
                            <input 
                              type="file" 
                              id="file-input" 
                              style={{ display: 'none' }} 
                              onChange={handleFileChange} 
                              accept=".pdf,.doc,.docx,.jpg,.png" 
                              multiple 
                            />
                            
                            <div style={{ 
                                background: 'var(--primary-glow)', 
                                width: '50px', 
                                height: '50px', 
                                borderRadius: '50%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                margin: '0 auto 10px auto'
                            }}>
                                <Upload size={24} color="#000000" />
                            </div>
                            <p style={{ margin: 0, fontWeight: 900, color: '#000000', fontSize: '0.9rem', textTransform: 'uppercase' }}>Add Documents</p>
                            <p style={{ margin: '3px 0 0 0', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Click to select multiple files</p>
                        </motion.div>

                        {/* File Selection List */}
                        <AnimatePresence>
                            {files.length > 0 && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  style={{ 
                                    background: 'rgba(0,0,0,0.02)', 
                                    borderRadius: '15px', 
                                    padding: '10px',
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px'
                                  }}
                                >
                                    {files.map((f, index) => (
                                        <motion.div 
                                          key={index}
                                          initial={{ x: -20, opacity: 0 }}
                                          animate={{ x: 0, opacity: 1 }}
                                          style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            background: 'white', 
                                            padding: '8px 12px', 
                                            borderRadius: '10px',
                                            justifyContent: 'space-between',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                                          }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                                                {filePreviews[index] ? (
                                                    <img src={filePreviews[index]} alt="preview" style={{ width: '30px', height: '30px', borderRadius: '5px', objectFit: 'cover' }} />
                                                ) : (
                                                    <FileText size={20} color="var(--primary)" />
                                                )}
                                                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'black', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {f.name}
                                                </span>
                                            </div>
                                            <button 
                                              onClick={(e) => removeFile(index, e)}
                                              style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '5px' }}
                                            >
                                                <X size={16} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                             <div style={{ flex: 1, minWidth: '80px' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#444444' }}>SIZE</label>
                                <select value={pageSize} onChange={(e) => setPageSize(e.target.value)} style={{ width: '100%', padding: '10px', background: '#FFFFFF', border: '1px solid #DDDDDD', borderRadius: '10px', color: '#000000', fontWeight: 600 }}>
                                    <option value="A4">A4</option>
                                    <option value="A3">A3</option>
                                    <option value="A2">A2</option>
                                    <option value="A1">A1</option>
                                    <option value="A0">A0</option>
                                </select>
                            </div>
                            <div style={{ flex: 1, minWidth: '80px' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#444444' }}>COPIES</label>
                                <input type="number" min="1" value={copies} onChange={(e) => setCopies(parseInt(e.target.value))} style={{ width: '100%', padding: '10px', background: '#FFFFFF', border: '1px solid #DDDDDD', borderRadius: '10px', color: '#000000', fontWeight: 600 }} />
                            </div>
                            <div style={{ flex: 1, minWidth: '80px' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#444444' }}>MODE</label>
                                <select value={colorMode} onChange={(e) => setColorMode(e.target.value)} style={{ width: '100%', padding: '10px', background: '#FFFFFF', border: '1px solid #DDDDDD', borderRadius: '10px', color: '#000000', fontWeight: 600 }}>
                                    <option value="BW">B&W</option>
                                    <option value="Color">Color</option>
                                </select>
                            </div>
                        </div>
                        <button className="button-3d" type="submit" style={{ padding: '15px', marginTop: '10px' }} disabled={status === 'uploading'}>
                           {status === 'uploading' ? 'PROCESSING...' : 'SUBMIT ORDER'}
                        </button>
                        {status === 'success' && <div style={{ color: 'green', textAlign: 'center', fontWeight: 800, marginTop: '10px' }}>✓ ORDER PLACED!</div>}
                    </form>
                </div>
                <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '30px' }} className="price-column">
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="glass-card" style={{ 
                        padding: '50px 30px', 
                        textAlign: 'center', 
                        width: '100%',
                        background: 'linear-gradient(145deg, var(--primary), #e6c31c)',
                        border: '3px solid #000000',
                        boxShadow: '8px 12px 0 rgba(0,0,0,0.1), 0 8px 0 #000000',
                        borderRadius: '25px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '15px'
                    }}>
                        <div style={{ background: 'rgba(0,0,0,0.1)', padding: '15px', borderRadius: '50%', marginBottom: '5px' }}>
                            <FileText size={32} color="#000000" />
                        </div>
                        <h4 style={{ color: '#000000', margin: 0, fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>
                            Estimated Total
                        </h4>
                        <div style={{ 
                            fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', 
                            fontWeight: 900, 
                            lineHeight: 1,
                            color: '#000000',
                            filter: 'drop-shadow(0 5px 0 rgba(255,255,255,0.4))',
                            letterSpacing: '-2px'
                        }}>
                             ₹{totalPrice}
                        </div>
                        <p style={{ margin: 0, color: 'rgba(0,0,0,0.7)', fontSize: '0.85rem', fontWeight: 700, maxWidth: '200px' }}>
                             *Auto-pricing applies to A4 size only.
                        </p>
                    </motion.div>
                    
                    {/* Professional GPay Badge */}
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '15px', 
                        background: '#FFFFFF', 
                        padding: '15px 25px', 
                        borderRadius: '20px', 
                        border: '2px solid #EEEEEE',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                        width: '100%',
                        maxWidth: '350px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', borderRadius: '10px', background: '#FFFFFF', padding: '5px' }}>
                            <img src={gpayLogo} alt="Google Pay" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Pay via Google Pay</div>
                            <div style={{ color: '#000000', fontSize: '1.2rem', fontWeight: 900, marginTop: '2px' }}>+91 90000 00000</div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
              @media (max-width: 768px) {
                .main-container { grid-template-columns: 1fr; }
                .form-column { border-right: none; border-bottom: 1px solid #EEEEEE; padding: 30px 20px; }
                .price-column { padding: 30px 20px; }
                section { padding: 50px 15px; }
              }
            `}</style>
        </section>
    );
};

export default UploadSection;
