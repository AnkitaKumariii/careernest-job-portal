import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import api, { registerUser } from '../services/api';
import '../styles/Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [status, setStatus] = useState({ loading: false, error: null });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setStatus({ loading: false, error: 'Passwords do not match' });
            return;
        }

        setStatus({ loading: true, error: null });
        try {
            const response = await registerUser(formData);
            console.log('Register successful', response.data);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            setStatus({ loading: false, error: 'Registration failed. Please try again.' });
        } finally {
            setStatus(prev => ({ ...prev, loading: false }));
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            setStatus({ loading: true, error: null });
            const { credential } = credentialResponse;

            const res = await api.post('/auth/google', { token: credential });

            console.log('Google Signup Success:', res.data);

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            window.dispatchEvent(new Event('storage')); // Update Navbar

            alert(`Welcome ${res.data.user.name}!`);
            navigate('/');
        } catch (err) {
            console.error('Google Signup Error:', err);
            const errMsg = err.response?.data || 'Google Signup failed. Check console.';
            setStatus({ loading: false, error: typeof errMsg === 'string' ? errMsg : 'Signup Failed' });
            alert('Google Signup Failed. Please check backend logs.');
        } finally {
            setStatus(prev => ({ ...prev, loading: false }));
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Create Account</h2>
            {status.error && <div style={{ color: 'red', marginBottom: '10px' }}>{status.error}</div>}

            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                        console.log('Signup Failed');
                        setStatus({ loading: false, error: 'Google Signup Failed' });
                    }}
                    text="signup_with"
                    theme="filled_black"
                    shape="pill"
                />
            </div>

            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                — OR —
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className="form-input"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                <div className="form-group">
                    <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="form-input"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status.loading}>
                    {status.loading ? 'Creating Account...' : 'Register'}
                </button>
            </form>
            <div className="auth-footer">
                Already have an account? <Link to="/login">Login here</Link>
            </div>
        </div>
    );
};

export default Register;
