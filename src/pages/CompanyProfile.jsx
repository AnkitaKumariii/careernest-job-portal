import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCompanyById } from '../services/api';
import '../styles/CompanyProfile.css';

const CompanyProfile = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await getCompanyById(id);
                setCompany(response.data);
            } catch (err) {
                setError('Failed to load company details.');
            } finally {
                setLoading(false);
            }
        };

        fetchCompany();
    }, [id]);

    if (loading) return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>Loading profile...</div>;
    if (error) return <div className="container" style={{ padding: '80px 0', textAlign: 'center', color: 'red' }}>{error}</div>;
    if (!company) return null;

    return (
        <div className="container company-profile-page">
            <Link to="/companies" className="back-link">← Back to Companies</Link>

            <div className="company-profile-header">
                <div className="company-profile-logo-container">
                    {company.logo ? (
                        <img src={company.logo} alt={company.name} className="company-profile-logo" />
                    ) : (
                        <div className="company-profile-placeholder">{company.name.charAt(0)}</div>
                    )}
                </div>
                <div className="company-profile-title">
                    <h1>{company.name}</h1>
                    <p className="industry-tag">{company.industry}</p>
                </div>
                <div className="company-profile-actions">
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Visit Website</a>
                </div>
            </div>

            <div className="company-profile-grid">
                <div className="company-main-info">
                    <section className="info-section">
                        <h3>About {company.name}</h3>
                        <p>{company.description}</p>
                    </section>

                    <section className="info-section">
                        <h3>Why Join Us?</h3>
                        <p>
                            At {company.name}, we believe in pushing boundaries. We offer a collaborative environment,
                            competitive compensation, and the opportunity to work on products used by millions.
                        </p>
                        <ul className="benefits-list">
                            <li>✨ Innovative Culture</li>
                            <li>🌍 Global Impact</li>
                            <li>📈 Growth Opportunities</li>
                            <li>🏥 Comprehensive Health</li>
                        </ul>
                    </section>
                </div>

                <aside className="company-sidebar">
                    <div className="sidebar-card">
                        <h4>At a Glance</h4>
                        <div className="stat-row">
                            <span className="stat-label">Headquarters</span>
                            <span className="stat-value">{company.headquarters}</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">Size</span>
                            <span className="stat-value">{company.size}</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">Founded</span>
                            <span className="stat-value">{company.founded}</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">Open Jobs</span>
                            <span className="stat-value highlight">{company.openJobs}</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default CompanyProfile;
