import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Layout, CheckCircle2, ArrowRightCircle, 
  Search, RefreshCw, IndianRupee, Clock, PackageCheck, AlertCircle 
} from 'lucide-react';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');

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
    if (activeTab !== 'All') {
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

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'Pending').length,
    completed: orders.filter(o => o.status === 'Completed').length,
    earnings: orders.reduce((sum, o) => sum + o.totalPrice, 0)
  };

  return (
    <div style={{ minHeight: '100vh', padding: '120px 20px 60px 20px', background: 'var(--bg-dark)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Statistics Header */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px',
          marginBottom: '40px' 
        }}>
           <div className="glass-card" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ background: 'rgba(0, 229, 255, 0.1)', padding: '15px', borderRadius: '15px' }}>
                    <PackageCheck size={30} color="var(--primary)" />
                </div>
                <div>
                   <h4 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Orders</h4>
                   <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>{stats.total}</div>
                </div>
           </div>
           
           <div className="glass-card" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ background: 'rgba(255, 165, 0, 0.1)', padding: '15px', borderRadius: '15px' }}>
                    <Clock size={30} color="orange" />
                </div>
                <div>
                   <h4 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Pending</h4>
                   <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'orange' }}>{stats.pending}</div>
                </div>
           </div>

           <div className="glass-card" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ background: 'rgba(0, 255, 127, 0.1)', padding: '15px', borderRadius: '15px' }}>
                    <IndianRupee size={30} color="springgreen" />
                </div>
                <div>
                   <h4 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Earnings</h4>
                   <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'springgreen' }}>₹{stats.earnings}</div>
                </div>
           </div>
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
            <div style={{ display: 'flex', gap: '10px' }} className="glass-card">
               {['All', 'Pending', 'Printing', 'Completed'].map(tab => (
                   <button 
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     style={{
                        padding: '10px 20px',
                        background: activeTab === tab ? 'var(--primary)' : 'transparent',
                        border: 'none',
                        color: activeTab === tab ? 'black' : 'white',
                        borderRadius: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: '0.3s'
                     }}
                   >
                       {tab}
                   </button>
               ))}
            </div>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                    <input 
                       type="text" 
                       placeholder="Search name/phone..." 
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}
                       style={{
                          padding: '12px 15px 12px 45px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--glass-border)',
                          borderRadius: '12px',
                          color: 'white',
                          width: '250px'
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

        {/* Data Table */}
        <div className="glass-card" style={{ overflowX: 'auto', minHeight: '400px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ background: 'rgba(255, 255, 255, 0.05)', borderBottom: '1px solid var(--glass-border)' }}>
                        <th style={{ padding: '20px' }}>Customer</th>
                        <th style={{ padding: '20px' }}>Job Details</th>
                        <th style={{ padding: '20px' }}>Payment</th>
                        <th style={{ padding: '20px' }}>Status</th>
                        <th style={{ padding: '20px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '100px' }}>
                            <div className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Loading Dashboard...</div>
                        </td></tr>
                    ) : filteredOrders.length === 0 ? (
                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>
                            <AlertCircle size={40} style={{ margin: '0 auto 10px auto', display: 'block' }} />
                            No orders found matching your criteria.
                        </td></tr>
                    ) : filteredOrders.map((order) => (
                        <tr key={order._id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.02)', transition: '0.2s' }}>
                            <td style={{ padding: '20px' }}>
                                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{order.customerName}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{order.phoneNumber}</div>
                            </td>
                            <td style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                    <span>{order.copies} x {order.colorMode === 'BW' ? 'Black & White' : 'Color'}</span>
                                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Size: {order.pageSize} | {new Date(order.createdAt).toLocaleTimeString()}</span>
                                </div>
                            </td>
                            <td style={{ padding: '20px' }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--primary)' }}>₹{order.totalPrice}</div>
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
                                        order.status === 'Printing' ? 'var(--primary)' : 
                                        'springgreen',
                                    border: `1px solid ${
                                        order.status === 'Pending' ? 'orange' : 
                                        order.status === 'Printing' ? 'var(--primary)' : 
                                        'springgreen'
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
