import React, { useState } from 'react';
import AdminDashboard from '../components/AdminDashboard';
import AdminLogin from '../components/AdminLogin';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <main style={{ minHeight: '100vh' }}>
            {isLoggedIn ? (
                <AdminDashboard />
            ) : (
                <AdminLogin onLogin={setIsLoggedIn} />
            )}
        </main>
    );
};

export default Admin;
