import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CompanyCard.css';

const CompanyCard = ({ company }) => {
    return (
        <div className="company-card">
            <div className="company-logo-placeholder" style={{ background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {company.logo ? (
                    <img src={company.logo} alt={company.name} style={{ width: '70%', height: '70%', objectFit: 'contain' }} />
                ) : (
                    <span style={{ fontSize: '1.5rem', color: '#333' }}>{company.name.charAt(0)}</span>
                )}
            </div>
            <h3 className="company-name">{company.name}</h3>
            <p className="company-industry">{company.industry}</p>
            <div className="company-stats">
                {company.openJobs} Open Positions
            </div>
            <Link to={`/companies/${company.id}`} className="btn btn-outline" style={{ marginTop: '16px', fontSize: '0.9rem' }}>
                View Profile
            </Link>
        </div>
    );
};

export default CompanyCard;
