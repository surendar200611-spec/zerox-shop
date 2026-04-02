import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  CheckCircle2, ArrowRightCircle, 
  Search, RefreshCw, Clock, PackageCheck, AlertCircle, FileText, ExternalLink,
  Trash2
} from 'lucide-react';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Active');

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [search, activeTab, orders]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
        const res = await axios.get('http://localhost:5000/api/orders');
        setOrders(res.data);
    } catch (err) {
        console.error('Fetch failed:', err);
    } finally {
        setLoading(false);
    }
  };

  const filterOrders = () => {
    let result = orders;
    
    // Filtering logic based on new tabs
    if (activeTab === 'Active') {
        result = result.filter(o => o.status !== 'Completed');
    } else if (activeTab === 'History') {
        result = result.filter(o => o.status === 'Completed');
    } else {
        result = result.filter(o => o.status === activeTab);
    }

    if (search) {
        result = result.filter(o => 
            o.customerName.toLowerCase().includes(search.toLowerCase()) || 
            o.phoneNumber.includes(search)
        );
    }
    setFilteredOrders(result);
  };

  const updateStatus = async (id, newStatus) => {
    try {
        await axios.patch(`http://localhost:5000/api/orders/${id}`, { status: newStatus });
        fetchOrders();
    } catch (err) {
        console.error('Update failed:', err);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Permanently delete this order record?')) return;
    try {
        await axios.delete(`http://localhost:5000/api/orders/${id}`);
        fetchOrders();
    } catch (err) {
        console.error('Delete failed:', err);
    }
  };

  const clearHistory = async () => {
    if (!window.confirm('This will permanently delete ALL completed orders. Continue?')) return;
    try {
        await axios.delete('http://localhost:5000/api/orders/bulk/completed');
        fetchOrders();
    } catch (err) {
        console.error('Bulk delete failed:', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '120px 20px 60px 20px', background: 'var(--bg-beige)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Simplified Header */}
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }} className="text-gradient">Print Queue</h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage your active print jobs and history.</p>
            </div>
            {activeTab === 'History' && (
                <button 
                  onClick={clearHistory}
                  className="button-3d"
                  style={{ padding: '10px 20px', fontSize: '0.8rem', background: '#ef4444', boxShadow: '0 4px 0 #991b1b' }}
                >
                    <Trash2 size={16} style={{ marginRight: '8px' }} /> Clear History
                </button>
            )}
        </div>

        {/* Action Bar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
            <div style={{ display: 'flex', gap: '5px', padding: '5px' }} className="glass-card">
               {['Active', 'Pending', 'Printing', 'History'].map(tab => (
                   <button 
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     style={{
                        padding: '10px 20px',
                        background: activeTab === tab ? 'var(--primary)' : 'transparent',
                        border: 'none',
                        color: activeTab === tab ? 'black' : 'var(--text-muted)',
                        borderRadius: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: '0.3s',
                        fontSize: '0.9rem'
                     }}
                   >
                       {tab}
                   </button>
               ))}
            </div>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, color: 'black' }} />
                    <input 
                       type="text" 
                       placeholder="Search name/phone..." 
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}
                       style={{
                          padding: '12px 15px 12px 45px',
                          background: 'white',
                          border: '1px solid var(--border-light)',
                          borderRadius: '12px',
                          color: 'black',
                          width: '250px',
                          boxShadow: 'var(--shadow-matte)'
                       }}
                    />
                </div>
                <button 
                   onClick={fetchOrders}
                   style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}
                >
                   <RefreshCw size={24} className={loading ? 'spin' : ''} />
                </button>
            </div>
        </div>

        {/* Print Data Table */}
        <div className="glass-card" style={{ overflowX: 'auto', minHeight: '400px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ background: 'rgba(0, 0, 0, 0.02)', borderBottom: '1px solid var(--border-light)' }}>
                        <th style={{ padding: '20px', color: 'var(--text-main)' }}>Customer Info</th>
                        <th style={{ padding: '20px', color: 'var(--text-main)' }}>File / Document</th>
                        <th style={{ padding: '20px', color: 'var(--text-main)' }}>Print Settings</th>
                        <th style={{ padding: '20px', color: 'var(--text-main)' }}>Current Status</th>
                        <th style={{ padding: '20px', color: 'var(--text-main)' }}>Commands</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '100px' }}>
                            <div className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Syncing Queue...</div>
                        </td></tr>
                    ) : filteredOrders.length === 0 ? (
                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>
                            <AlertCircle size={40} style={{ margin: '0 auto 10px auto', display: 'block' }} />
                            {activeTab === 'History' ? 'No completed orders yet.' : 'No active print jobs found.'}
                        </td></tr>
                    ) : filteredOrders.map((order) => (
                        <tr key={order._id} style={{ borderBottom: '1px solid var(--border-light)', transition: '0.2s' }}>
                            <td style={{ padding: '20px' }}>
                                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)' }}>{order.customerName}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{order.phoneNumber}</div>
                            </td>
                            <td style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {Array.isArray(order.fileName) ? (
                                        order.fileName.map((name, idx) => (
                                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ background: 'rgba(249, 212, 35, 0.1)', padding: '8px', borderRadius: '8px' }}>
                                                    <FileText size={18} color="var(--primary)" />
                                                </div>
                                                <div style={{ minWidth: 0 }}>
                                                    <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.85rem', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        {name}
                                                    </div>
                                                    <a href={order.fileUrl[idx]} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontSize: '0.75rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                                                        View <ExternalLink size={10} />
                                                    </a>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <div style={{ background: 'rgba(249, 212, 35, 0.1)', padding: '10px', borderRadius: '10px' }}>
                                                <FileText size={24} color="var(--primary)" />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600, color: 'var(--text-main)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.fileName || 'document.pdf'}</div>
                                                <a href={order.fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
                                                    View Document <ExternalLink size={12} />
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', color: 'var(--text-main)' }}>
                                    <span style={{ fontWeight: 800, color: 'var(--primary)' }}>{order.copies} COPIES</span>
                                    <span>{order.colorMode === 'BW' ? 'Black & White' : 'Color Mode'} | {order.pageSize}</span>
                                    <span style={{ fontSize: '0.75rem', opacity: 0.5, color: 'var(--text-muted)' }}>{new Date(order.createdAt).toLocaleString()}</span>
                                </div>
                            </td>
                            <td style={{ padding: '20px' }}>
                                <span style={{
                                    padding: '6px 15px',
                                    borderRadius: '25px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    background: 
                                        order.status === 'Pending' ? 'rgba(255, 165, 0, 0.1)' : 
                                        order.status === 'Printing' ? 'rgba(0, 229, 255, 0.1)' : 
                                        'rgba(0, 255, 127, 0.1)',
                                    color: 
                                        order.status === 'Pending' ? 'orange' : 
                                        order.status === 'Printing' ? '#00b4d8' : 
                                        '#2d6a4f',
                                    border: `1px solid ${
                                        order.status === 'Pending' ? 'orange' : 
                                        order.status === 'Printing' ? '#00b4d8' : 
                                        '#2d6a4f'
                                    }`
                                }}>
                                    {order.status}
                                </span>
                            </td>
                            <td style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    {order.status === 'Pending' && (
                                        <button onClick={() => updateStatus(order._id, 'Printing')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }} title="Move to printing">
                                            <ArrowRightCircle size={24} />
                                        </button>
                                    )}
                                    {order.status !== 'Completed' && (
                                        <button onClick={() => updateStatus(order._id, 'Completed')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'springgreen' }} title="Complete Job">
                                            <CheckCircle2 size={24} />
                                        </button>
                                    )}
                                    <button 
                                      onClick={() => deleteOrder(order._id)} 
                                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }} 
                                      title="Delete Permanently"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
      
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
