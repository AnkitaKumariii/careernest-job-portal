import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import JobCard from '../components/JobCard';
import '../styles/Home.css';

const Home = () => {
    // Dummy data for featured jobs
    const featuredJobs = [
        { id: 1, title: 'Senior Frontend Engineer', company: 'Google', location: 'Mountain View, CA', type: 'Full-time', salary: '$180k - $250k', isNew: true },
        { id: 2, title: 'Product Designer', company: 'Apple', location: 'Cupertino, CA', type: 'Contract', salary: '$140k - $180k', isNew: true },
        { id: 3, title: 'Backend Developer', company: 'Amazon', location: 'Seattle, WA', type: 'Full-time', salary: '$160k - $200k', isNew: false },
        { id: 4, title: 'Machine Learning Engineer', company: 'Meta', location: 'Menlo Park, CA', type: 'Full-time', salary: '$200k - $300k', isNew: false },
        { id: 5, title: 'DevOps Engineer', company: 'Microsoft', location: 'Redmond, WA', type: 'Full-time', salary: '$150k - $190k', isNew: true },
        { id: 8, title: 'Automation Engineer', company: 'Tesla', location: 'Austin, TX', type: 'Full-time', salary: '$130k - $160k', isNew: true },
    ];

    const [keyword, setKeyword] = React.useState('');
    const [locationInput, setLocationInput] = React.useState('');
    const [backendStatus, setBackendStatus] = React.useState('Checking backend...');

    const navigate = useNavigate();

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (keyword) params.append('keyword', keyword);
        if (locationInput) params.append('location', locationInput);
        navigate(`/jobs?${params.toString()}`);
    };

    React.useEffect(() => {
        fetch('https://careernest-job-portal.onrender.com/api/test')
            .then(res => res.json())
            .then(data => setBackendStatus(data.message))
            .catch(() => setBackendStatus('Backend not connected'));
    }, []);

    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="container">
                    <div style={{ padding: '10px', backgroundColor: '#333', color: '#fff', marginBottom: '20px', borderRadius: '4px', display: 'inline-block' }}>
                        Backend Status: <strong>{backendStatus}</strong>
                    </div>
                    <h1 className="hero-headline">
                        Find Your Dream <span className="text-gradient">Career Nest</span>
                    </h1>
                    <p className="hero-subheadline">
                        Discover thousands of job opportunities with top companies.
                        Your future starts here.
                    </p>

                    <div className="hero-search-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Job title, keywords, or company..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="City, state, or zip code"
                            style={{ borderLeft: '1px solid var(--border-color)' }}
                            value={locationInput}
                            onChange={(e) => setLocationInput(e.target.value)}
                        />
                        <button className="btn btn-primary" style={{ borderRadius: 0 }} onClick={handleSearch}>Search Jobs</button>
                    </div>
                </div>
            </section>

            <section className="featured-jobs-section container">
                <h2 className="section-title">Featured Opportunities</h2>
                <div className="featured-jobs-grid">
                    {featuredJobs.map(job => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '48px' }}>
                    <Link to="/jobs" className="btn btn-outline" style={{ display: 'inline-block', fontSize: '1.1rem', padding: '12px 32px' }}>
                        View All Jobs
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
