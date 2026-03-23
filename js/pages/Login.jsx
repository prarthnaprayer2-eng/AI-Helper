const { React, useState } = window;
const { loginUser } = window.utils.auth;

export function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate a slight delay for better UX
    setTimeout(() => {
      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      const result = loginUser(email, password);
      
      if (result.success) {
        onLoginSuccess(result.user);
      } else {
        setError(result.error);
        setPassword('');
      }
      
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        animation: 'fadeIn 0.3s ease'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px'
          }}>🎓</div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: '800',
            color: 'var(--text1)',
            margin: '0 0 8px 0'
          }}>AI College Helper</h1>
          <p style={{
            color: 'var(--text2)',
            fontSize: '14px',
            margin: '0'
          }}>Welcome back! Please log in to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{
          background: 'var(--bg2)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Email Input */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '500',
              color: 'var(--text1)',
              marginBottom: '8px'
            }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="Enter your email"
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                background: 'var(--bg)',
                color: 'var(--text1)',
                boxSizing: 'border-box',
                transition: 'all 0.2s',
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'auto'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--blue)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)';
              }}
            />
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '500',
              color: 'var(--text1)',
              marginBottom: '8px'
            }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter your password"
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                background: 'var(--bg)',
                color: 'var(--text1)',
                boxSizing: 'border-box',
                transition: 'all 0.2s',
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'auto'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--blue)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)';
              }}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              background: '#fee2e2',
              border: '1px solid #fca5a5',
              color: '#dc2626',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '20px',
              animation: 'slideIn 0.2s ease'
            }}>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '11px 16px',
              background: loading ? 'var(--text3)' : 'var(--blue)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: loading ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.background = '#2563eb';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.target.style.background = 'var(--blue)';
            }}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {/* Demo Credentials */}
        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: 'var(--blue-bg)',
          borderRadius: '8px',
          fontSize: '13px',
          color: 'var(--text1)',
          border: '1px solid var(--border)'
        }}>
          <div style={{ fontWeight: '600', marginBottom: '8px', color: 'var(--blue)' }}>Demo Credentials</div>
          <div style={{ lineHeight: '1.6' }}>
            <div><strong>Email:</strong> aryan@college.com</div>
            <div><strong>Password:</strong> aryan123</div>
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text2)' }}>
              Or try: student@example.com / password123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
