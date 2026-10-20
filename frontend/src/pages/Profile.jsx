import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const formatDateTime = (value) => new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
const formatAmount = (value) => Number(value || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchMyOrders = async () => {
      try {
        const res = await fetch('/api/orders/myorders', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          // Token obsolete or 401: clear and bounce
          if (res.status === 401) {
             logout();
             navigate('/login');
          }
          setOrders([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, [user, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const containerStyle = { maxWidth: '1000px', margin: '40px auto', padding: '30px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid rgba(15,23,42,0.08)', color: '#0F172A' };
  const badgeStyle = { background: 'rgba(37,99,235,0.1)', color: '#2563EB', padding: '6px 12px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold', display: 'inline-block' };

  if (!user) return null;

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(15,23,42,0.12)', paddingBottom: '30px', marginBottom: '30px' }}>
        <div>
          <h2 style={{ color: '#0F172A', fontSize: '2.2rem', marginBottom: '10px' }}>My Profile</h2>
          <p style={{ color: '#64748B', fontSize: '1.2rem', marginBottom: '5px' }}><strong>Name:</strong> {user.name}</p>
          <p style={{ color: '#64748B', fontSize: '1.2rem', marginBottom: '5px' }}><strong>Email:</strong> {user.email}</p>
          {user.createdAt && <p style={{ color: '#64748B', fontSize: '1rem', marginBottom: '15px' }}><strong>Member since:</strong> {formatDateTime(user.createdAt)}</p>}
          <span style={badgeStyle}>Account Type: {user.role.toUpperCase()}</span>
        </div>
        <button onClick={handleLogout} className="btn" style={{ background: '#ef4444', boxShadow: 'none' }}>Logout</button>
      </div>

      <h3 style={{ color: '#2563EB', marginBottom: '20px', fontSize: '1.5rem' }}>Order History</h3>
      {loading ? (
        <p style={{ color: '#64748B' }}>Fetching your orders...</p>
      ) : orders.length === 0 ? (
        <div style={{ background: '#F8FAFC', padding: '30px', borderRadius: '8px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
          <p style={{ color: '#64748B', marginBottom: '15px' }}>You haven't placed any orders yet.</p>
          <Link to="/shop" className="btn">Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {orders.map(order => (
            <div key={order._id} style={{ background: '#F8FAFC', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              <div>
                <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '5px' }}>Order ID: <span style={{ color: '#0F172A' }}>{order._id}</span></p>
                <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '5px' }}>Placed On: <span style={{ color: '#0F172A' }}>{formatDateTime(order.createdAt)}</span></p>
                <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: order.status === 'Delivered' ? '5px' : 0 }}>Total: <strong style={{ color: '#16A34A' }}><span aria-hidden="true">&#8377;</span>{formatAmount(order.totalAmount)}</strong></p>
                {order.status === 'Delivered' && <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Delivered On: <span style={{ color: '#0F172A' }}>{order.deliveredAt ? formatDateTime(order.deliveredAt) : 'Not recorded'}</span></p>}
              </div>
              <div>
                <span style={{ 
                  background: order.status === 'Delivered' ? 'rgba(22,163,74,0.1)' : order.status === 'Shipped' ? 'rgba(59,130,246,0.1)' : 'rgba(245,158,11,0.1)', 
                  color: order.status === 'Delivered' ? '#16A34A' : order.status === 'Shipped' ? '#2563EB' : '#f59e0b',
                  padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' 
                }}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
