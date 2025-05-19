import React, { useState } from 'react';
import { logoutUser } from '../utils/userManager';
import CreateAssignment from './CreateAssignment';  // 引入

const TeacherDashboard = ({ teacher }) => {
    const [creating, setCreating] = useState(false);

    const handleLogout = () => {
        logoutUser();
        window.location.reload();
    };

    if (creating) {
        return <CreateAssignment onBack={() => setCreating(false)} />;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>👩‍🏫 Hello! {teacher.username}</h2>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <div className="dashboard-section teacher">
                <h3>➕ Create Assignment</h3>
                <p>Build new quizzes and share them with all students.</p>
                <button className="fancy-btn" onClick={() => setCreating(true)}>Create New Assignment</button>
            </div>

            <div className="dashboard-section teacher">
                <h3>📊 Assignment Overview</h3>
                <p>View all submissions from students and analyze performance.</p>
                <button className="fancy-btn">View Submissions</button>
            </div>
        </div>
    );
};

export default TeacherDashboard;