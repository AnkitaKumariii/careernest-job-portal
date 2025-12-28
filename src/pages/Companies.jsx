import React from 'react';
import CompanyCard from '../components/CompanyCard';
import { getCompanies } from '../services/api';
import '../styles/Companies.css';

const Companies = () => {
    const [companiesList, setCompaniesList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchCompanies = async () => {
            try {
                setLoading(true);
                const response = await getCompanies();
                setCompaniesList(response.data);
            } catch (err) {
                setError('Failed to load companies.');
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    if (loading) return <div className="container" style={{ padding: '40px 0', textAlign: 'center' }}>Loading companies...</div>;
    if (error) return <div className="container" style={{ padding: '40px 0', textAlign: 'center', color: 'red' }}>{error}</div>;

    return (
        <div className="container companies-page">
            <div className="companies-header">
                <h1>Top Companies Hiring Now</h1>
                <p>Explore opportunities from industry leaders around the globe.</p>
            </div>

            <div className="companies-grid">
                {companiesList.map(company => (
                    <CompanyCard key={company.id} company={company} />
                ))}
            </div>
        </div>
    );
};

export default Companies;
