import React, { useState, useEffect } from 'react';
import { logoutUser } from '../utils/userManager';
import { getVisibleAssignmentsForStudent, dismissAssignment } from '../utils/assignmentManager';
import TakeAssignment from './TakeAssignment';

const StudentDashboard = ({ student }) => {
    const [assignments, setAssignments] = useState([]);
    const [activeAssignment, setActiveAssignment] = useState(null);

    useEffect(() => {
        setAssignments(getVisibleAssignmentsForStudent());
    }, []);

    const handleLogout = () => {
        logoutUser();
        window.location.reload();
    };

    const handleDismiss = (id) => {
        dismissAssignment(id);
        setAssignments(assignments.filter(a => a.id !== id));
    };

    const handleComplete = (assignmentId, score) => {
        alert(`Assignment complete! Score: ${score}`);
        setActiveAssignment(null);
    };

    if (activeAssignment) {
        return <TakeAssignment assignment={activeAssignment} onBack={() => setActiveAssignment(null)} onComplete={handleComplete} />;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>👨‍🎓 Welcome, {student.username}</h2>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <div className="dashboard-section student">
                <h3>📘 My Assignments</h3>
                {assignments.length === 0 ? (
                    <p>No assignments found.</p>
                ) : (
                    <ul>
                        {assignments.map((a) => (
                            <li key={a.id} style={{ marginBottom: 10 }}>
                                {a.title}
                                <button className="fancy-btn" style={{ marginLeft: 10 }} onClick={() => setActiveAssignment(a)}>Start</button>
                                <button
                                    className="dismay-btn"
                                    style={{ marginLeft: 10, padding: '2px 6px' }}
                                    onClick={() => handleDismiss(a.id)}
                                >❌</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;