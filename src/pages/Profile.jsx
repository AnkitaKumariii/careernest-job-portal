import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);

    const [profile, setProfile] = useState({
        name: "Guest User",
        role: "Job Seeker",
        email: "",
        location: "Planet Earth",
        bio: "Ready to explore new opportunities in the galaxy.",
        skills: "Communication, Teamwork",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guest"
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setProfile(prev => ({
                ...prev,
                name: user.name || prev.name,
                email: user.email || prev.email,
                avatar: user.picture || prev.avatar,
                // These fields might not be in the basic Google user object, so keep defaults or extend schema later
            }));
        }
    }, []);

    const [editForm, setEditForm] = useState(profile);

    // Sync editForm when profile changes (e.g. after loading from localStorage)
    useEffect(() => {
        setEditForm(profile);
    }, [profile]);

    const handleEditToggle = () => {
        if (isEditing) {
            // Cancel mode - reset form
            setEditForm(profile);
        }
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setProfile(editForm);
        setIsEditing(false);
        // Here you would typically send data to backend
        alert("Profile Updated Successfully!");
    };

    return (
        <div className="container profile-page">
            <div className="profile-header-card">
                <div className="profile-avatar-container">
                    <div className="profile-avatar">
                        <img src={profile.avatar} alt="Profile Avatar" />
                    </div>
                </div>

                <div className="profile-info">
                    {isEditing ? (
                        <div className="edit-mode-header">
                            <div className="edit-form-group">
                                <label className="edit-label">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="edit-input"
                                    value={editForm.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="edit-form-group">
                                <label className="edit-label">Professional Role</label>
                                <input
                                    type="text"
                                    name="role"
                                    className="edit-input"
                                    value={editForm.role}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="edit-form-group">
                                <label className="edit-label">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    className="edit-input"
                                    value={editForm.location}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            <h1 className="profile-name">{profile.name}</h1>
                            <p className="profile-role">{profile.role}</p>
                            <p className="profile-location">📍 {profile.location}</p>
                            <div className="profile-badges">
                                <span className="badge">Open to Work</span>
                                <span className="badge">Remote Ready</span>
                            </div>
                        </>
                    )}
                </div>

                <div className="profile-actions">
                    {isEditing ? (
                        <>
                            <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
                            <button className="btn btn-outline" onClick={handleEditToggle}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-primary" onClick={handleEditToggle}>Edit Profile</button>
                            <button className="btn btn-outline">Share Profile</button>
                        </>
                    )}
                </div>
            </div>

            <div className="profile-content-grid">
                <div className="profile-section full-width">
                    <h3 className="section-title">About Me</h3>
                    {isEditing ? (
                        <textarea
                            name="bio"
                            className="edit-textarea"
                            value={editForm.bio}
                            onChange={handleChange}
                        />
                    ) : (
                        <p className="profile-bio">{profile.bio}</p>
                    )}
                </div>

                <div className="profile-section full-width">
                    <h3 className="section-title">Skills</h3>
                    {isEditing ? (
                        <div className="edit-form-group">
                            <label className="edit-label">Skills (comma separated)</label>
                            <input
                                type="text"
                                name="skills"
                                className="edit-input"
                                value={editForm.skills}
                                onChange={handleChange}
                                placeholder="e.g. React, Node.js, Design"
                            />
                        </div>
                    ) : (
                        <div className="skills-grid">
                            {profile.skills.split(',').map((skill, index) => (
                                <span key={index} className="skill-tag">{skill.trim()}</span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
