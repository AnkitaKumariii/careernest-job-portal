import React from 'react';
import { useParams } from 'react-router-dom';
import { getJobById } from '../services/api';
import '../styles/JobDetails.css';

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [startApply, setStartApply] = React.useState(false);
    const [isApplied, setIsApplied] = React.useState(false);
    const [notification, setNotification] = React.useState(null);

    React.useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true);
                const response = await getJobById(id);
                setJob(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to load job details.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchJob();
        }
    }, [id]);

    const handleApply = () => {
        setStartApply(true);
        // Simulate network request
        setTimeout(() => {
            setStartApply(false);
            setIsApplied(true);
            setNotification('Application submitted successfully');

            // Clear notification after 3 seconds
            setTimeout(() => {
                setNotification(null);
            }, 3000);
        }, 1000);
    };

    if (loading) return <div className="container" style={{ padding: '40px 0', textAlign: 'center' }}>Loading job details...</div>;
    if (error) return <div className="container" style={{ padding: '40px 0', textAlign: 'center', color: 'red' }}>{error}</div>;
    if (!job) return <div className="container" style={{ padding: '40px 0', textAlign: 'center' }}>Job not found</div>;

    return (
        <div className="container job-details-page">
            {notification && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    backgroundColor: '#4caf50',
                    color: '#fff',
                    padding: '16px 24px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    zIndex: 1000,
                    animation: 'fadeIn 0.3s ease-in-out'
                }}>
                    {notification}
                </div>
            )}
            <div className="job-details-header">
                <h1 className="job-details-title">{job.title}</h1>
                <div className="job-details-company">{job.company}</div>

                <div className="job-details-meta">
                    <span>📍 {job.location}</span>
                    <span>💼 {job.type}</span>
                    <span>💰 {job.salary}</span>
                    <span>🕓 Posted {job.posted}</span>
                </div>

                <div className="job-details-actions">
                    <button
                        className="btn btn-primary"
                        onClick={handleApply}
                        disabled={isApplied || startApply}
                        style={{
                            backgroundColor: isApplied ? '#4caf50' : '',
                            cursor: (isApplied || startApply) ? 'not-allowed' : 'pointer',
                            opacity: (isApplied || startApply) ? 0.8 : 1
                        }}
                    >
                        {startApply ? 'Applying...' : isApplied ? 'Applied' : 'Apply Now'}
                    </button>
                    <button className="btn btn-outline" disabled={isApplied}>Save Job</button>
                </div>
            </div>

            <div className="job-description-section">
                <h2 className="section-head">Job Description</h2>
                <div className="job-description-content">
                    <p>{job.description}</p>

                    <h3>Requirements</h3>
                    <ul>
                        {job.requirements && job.requirements.map((req, idx) => <li key={idx}>{req}</li>)}
                    </ul>

                    <h3>Responsibilities</h3>
                    <ul>
                        {job.responsibilities && job.responsibilities.map((res, idx) => <li key={idx}>{res}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
