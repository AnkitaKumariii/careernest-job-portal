import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import api, { loginUser } from '../services/api';
import '../styles/Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [status, setStatus] = useState({ loading: false, error: null });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: null });
        try {
            const response = await loginUser(formData);
            console.log('Login successful', response.data);
            alert('Login successful! Redirecting...');
            navigate('/');
        } catch (err) {
            setStatus({ loading: false, error: 'Login failed. Please check your credentials.' });
        } finally {
            setStatus(prev => ({ ...prev, loading: false }));
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            setStatus({ loading: true, error: null });
            const { credential } = credentialResponse;

            const res = await api.post('/auth/google', { token: credential });

            console.log('Google Login Success:', res.data);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            // Dispatch custom event to notify Navbar
            window.dispatchEvent(new Event('storage'));

            alert(`Welcome ${res.data.user.name}!`);
            navigate('/');
        } catch (err) {
            console.error('Google Login Error:', err);
            setStatus({ loading: false, error: 'Google Login failed.' });
        } finally {
            setStatus(prev => ({ ...prev, loading: false }));
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Welcome Back</h2>
            {status.error && <div style={{ color: 'red', marginBottom: '10px' }}>{status.error}</div>}

            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                        console.log('Login Failed');
                        setStatus({ loading: false, error: 'Google Login Failed' });
                    }}
                    theme="filled_black"
                    shape="pill"
                />
            </div>

            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                — OR —
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-input"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status.loading}>
                    {status.loading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>
            <div className="auth-footer">
                Don't have an account? <Link to="/register">Register here</Link>
            </div>
        </div>
    );
};

export default Login;
