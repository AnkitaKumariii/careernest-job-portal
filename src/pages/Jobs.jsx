import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import JobCard from '../components/JobCard';
import '../styles/Jobs.css';

const Jobs = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Static dummy job data
    const allJobs = [
        { id: 1, title: 'Senior Frontend Engineer', company: 'Google', location: 'Mountain View, CA', type: 'Full-time', salary: '$180k - $250k', isNew: true, level: 'Senior Level' },
        { id: 2, title: 'Product Designer', company: 'Apple', location: 'Cupertino, CA', type: 'Contract', salary: '$140k - $180k', isNew: true, level: 'Mid Level' },
        { id: 3, title: 'Backend Developer', company: 'Amazon', location: 'Seattle, WA', type: 'Full-time', salary: '$160k - $200k', isNew: false, level: 'Senior Level' },
        { id: 4, title: 'Machine Learning Engineer', company: 'Meta', location: 'Menlo Park, CA', type: 'Full-time', salary: '$200k - $300k', isNew: false, level: 'Senior Level' },
        { id: 5, title: 'DevOps Engineer', company: 'Microsoft', location: 'Redmond, WA', type: 'Full-time', salary: '$150k - $190k', isNew: true, level: 'Mid Level' },
        { id: 6, title: 'Content Strategist', company: 'Netflix', location: 'Los Gatos, CA', type: 'Part-time', salary: '$90k - $120k', isNew: false, level: 'Mid Level' },
        { id: 7, title: 'iOS Developer', company: 'Spotify', location: 'New York, NY', type: 'Full-time', salary: '$140k - $175k', isNew: false, level: 'Mid Level' },
        { id: 8, title: 'Automation Engineer', company: 'Tesla', location: 'Austin, TX', type: 'Full-time', salary: '$130k - $160k', isNew: true, level: 'Mid Level' },
        { id: 9, title: 'Data Scientist', company: 'Google', location: 'Remote', type: 'Full-time', salary: '$170k - $220k', isNew: false, level: 'Senior Level' },
    ];

    const [jobs, setJobs] = useState(allJobs);

    // Filter States
    const [filters, setFilters] = useState({
        type: { 'Full-time': true, 'Part-time': false, 'Contract': false, 'Internship': false },
        level: { 'Entry Level': false, 'Mid Level': true, 'Senior Level': false, 'Director': false },
        location: { 'Remote': true, 'On-site': false, 'Hybrid': false }
    });

    const handleCheckboxChange = (category, value) => {
        setFilters(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [value]: !prev[category][value]
            }
        }));
    };

    const handleClearFilters = () => {
        setFilters({
            type: { 'Full-time': false, 'Part-time': false, 'Contract': false, 'Internship': false },
            level: { 'Entry Level': false, 'Mid Level': false, 'Senior Level': false, 'Director': false },
            location: { 'Remote': false, 'On-site': false, 'Hybrid': false }
        });
        setSearchParams({});
        setJobs(allJobs); // Immediately reset list
    };

    const handleApplyFilters = () => {
        const activeTypes = Object.keys(filters.type).filter(key => filters.type[key]);
        const activeLevels = Object.keys(filters.level).filter(key => filters.level[key]);
        const activeLocations = Object.keys(filters.location).filter(key => filters.location[key]);

        // Basic Search Query
        const keyword = searchParams.get('keyword')?.toLowerCase() || '';
        const locationQuery = searchParams.get('location')?.toLowerCase() || '';

        const filtered = allJobs.filter(job => {
            // Logic: If no blocks selected in a category, show all. Else, match at least one.
            const typeMatch = activeTypes.length === 0 || activeTypes.includes(job.type);
            const levelMatch = activeLevels.length === 0 || activeLevels.includes(job.level);

            // Location Filter Check
            let locationFilterMatch = true;
            if (activeLocations.length > 0) {
                const isRemoteJob = job.location.toLowerCase().includes('remote');
                const wantsRemote = activeLocations.includes('Remote');
                const wantsOnSite = activeLocations.includes('On-site');

                if (wantsRemote && !wantsOnSite) locationFilterMatch = isRemoteJob;
                else if (!wantsRemote && wantsOnSite) locationFilterMatch = !isRemoteJob;
            }

            // Search Keyword Check
            const keywordMatch = !keyword ||
                job.title.toLowerCase().includes(keyword) ||
                job.company.toLowerCase().includes(keyword);

            // Search Location Check (from input, distinct from checkbox)
            const locationQueryMatch = !locationQuery ||
                job.location.toLowerCase().includes(locationQuery);

            return typeMatch && levelMatch && locationFilterMatch && keywordMatch && locationQueryMatch;
        });

        setJobs(filtered);
    };

    // Initial Filter Apply (runs when URL params or filters change)
    useEffect(() => {
        handleApplyFilters();
    }, [searchParams]); // Re-run when URL params change

    return (
        <div className="container jobs-page">
            <div className="jobs-layout">
                <aside className="filters-sidebar">
                    <div className="filter-group">
                        <h4 className="filter-title">Job Type</h4>
                        {Object.keys(filters.type).map(type => (
                            <label key={type} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={filters.type[type]}
                                    onChange={() => handleCheckboxChange('type', type)}
                                /> {type}
                            </label>
                        ))}
                    </div>

                    <div className="filter-group">
                        <h4 className="filter-title">Experience Level</h4>
                        {Object.keys(filters.level).map(level => (
                            <label key={level} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={filters.level[level]}
                                    onChange={() => handleCheckboxChange('level', level)}
                                /> {level}
                            </label>
                        ))}
                    </div>

                    <div className="filter-group">
                        <h4 className="filter-title">Location</h4>
                        {Object.keys(filters.location).map(loc => (
                            <label key={loc} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={filters.location[loc]}
                                    onChange={() => handleCheckboxChange('location', loc)}
                                /> {loc}
                            </label>
                        ))}
                    </div>

                    <button className="btn btn-primary" style={{ width: '100%', marginBottom: '10px' }} onClick={handleApplyFilters}>
                        Apply Filters
                    </button>
                    <button className="btn btn-outline" style={{ width: '100%' }} onClick={handleClearFilters}>
                        Clear Filters
                    </button>
                </aside>

                <section className="jobs-content">
                    <div className="jobs-header">
                        <h2 style={{ margin: 0 }}>All Jobs</h2>
                        <span className="jobs-count">Showing {jobs.length} jobs</span>
                    </div>

                    <div className="jobs-grid">
                        {jobs.length > 0 ? (
                            jobs.map(job => (
                                <JobCard key={job.id} job={job} />
                            ))
                        ) : (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                                <h3>No jobs match your filters.</h3>
                                <p>Try adjusting your search criteria.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Jobs;
