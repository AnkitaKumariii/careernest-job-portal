import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/JobCard.css';

const JobCard = ({ job }) => {
    const cardRef = React.useRef(null);
    const [rotation, setRotation] = React.useState({ x: 0, y: 0 });
    const [glare, setGlare] = React.useState({ x: 50, y: 50, opacity: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Calculate mouse position relative to card center
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        // Max rotation: 10 degrees
        const rotX = yPct * -20;
        const rotY = xPct * 20;

        setRotation({ x: rotX, y: rotY });

        // Glare calculation
        setGlare({
            x: (mouseX / width) * 100,
            y: (mouseY / height) * 100,
            opacity: 1
        });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setGlare(prev => ({ ...prev, opacity: 0 }));
    };

    return (
        <div
            className="job-card-wrapper"
            style={{ perspective: '1000px' }}
        >
            <div
                className="job-card"
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                }}
            >
                {/* Glare Overlay */}
                <div
                    className="card-glare"
                    style={{
                        background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.15), transparent 40%)`,
                        opacity: glare.opacity,
                    }}
                />

                <div className="job-card-header">
                    <h3 className="job-title">{job.title}</h3>
                    {job.isNew && <span className="job-type-tag">New</span>}
                </div>

                <div className="job-company">{job.company}</div>

                <div className="job-meta">
                    <div className="job-meta-item">
                        <span>📍 {job.location}</span>
                    </div>
                    <div className="job-meta-item">
                        <span>💼 {job.type}</span>
                    </div>
                    <div className="job-meta-item">
                        <span>💰 {job.salary}</span>
                    </div>
                </div>

                <div className="job-card-footer">
                    <Link to={`/jobs/${job.id}`} className="btn btn-outline" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
