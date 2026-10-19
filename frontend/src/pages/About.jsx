import React from 'react';

const About = () => {
  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px',
    background: '#FFFFFF',
    borderRadius: '16px',
    border: '1px solid rgba(15, 23, 42, 0.08)',
    boxShadow: '0 10px 40px rgba(15,23,42,0.14)',
    textAlign: 'center'
  };

  const featureStyle = {
    flex: '1 1 200px',
    padding: '20px',
    background: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: '12px',
    textAlign: 'left'
  };

  return (
    <section style={containerStyle}>
      <img
        src="/QuickCartLogo.png"
        alt="QuickCart logo"
        style={{ width: '96px', height: '96px', borderRadius: '18px', objectFit: 'cover', marginBottom: '20px', boxShadow: '0 4px 20px rgba(37, 99, 235, 0.3)' }}
      />
      <h1 style={{ fontSize: '2.5rem', marginBottom: '12px', color: '#0F172A' }}>About QuickCart</h1>
      <p style={{ color: '#2563EB', fontSize: '1.25rem', fontWeight: '600', marginBottom: '20px' }}>
        Everyday shopping, made simple.
      </p>
      <p style={{ color: '#64748B', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '680px', margin: '0 auto 32px' }}>
        QuickCart is an easy-to-use online store built to help customers discover products, add them to a cart, and place orders with confidence. We focus on a clear, convenient shopping experience from browsing to checkout.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <article style={featureStyle}>
          <h2 style={{ color: '#0F172A', fontSize: '1.15rem', marginBottom: '8px' }}>Discover products</h2>
          <p style={{ color: '#64748B', lineHeight: '1.6', margin: 0 }}>
            Browse our product collection, search for what you need, and view product details before you buy.
          </p>
        </article>
        <article style={featureStyle}>
          <h2 style={{ color: '#0F172A', fontSize: '1.15rem', marginBottom: '8px' }}>Shop with ease</h2>
          <p style={{ color: '#64748B', lineHeight: '1.6', margin: 0 }}>
            Keep items in your cart, complete checkout securely, and review your orders from your profile.
          </p>
        </article>
        <article style={featureStyle}>
          <h2 style={{ color: '#0F172A', fontSize: '1.15rem', marginBottom: '8px' }}>Growing with you</h2>
          <p style={{ color: '#64748B', lineHeight: '1.6', margin: 0 }}>
            Our catalogue continues to grow, while store administrators can manage products, customers, and orders in one place.
          </p>
        </article>
      </div>

      <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: '1.7', margin: 0 }}>
        Thank you for choosing QuickCart. We are here to make online shopping feel quick, clear, and reliable.
      </p>
    </section>
  );
};

export default About;