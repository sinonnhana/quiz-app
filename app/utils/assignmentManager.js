// app/utils/assignmentManager.js

const ASSIGNMENTS_KEY = 'quiz_assignments';


export function getVisibleAssignmentsForStudent() {
    const allAssignments = getAssignments();
    const dismissed = JSON.parse(localStorage.getItem("dismissedAssignments") || "[]");
    return allAssignments.filter(a => !dismissed.includes(a.id));
}

export function dismissAssignment(id) {
    const dismissed = JSON.parse(localStorage.getItem("dismissedAssignments") || "[]");
    if (!dismissed.includes(id)) {
        dismissed.push(id);
        localStorage.setItem("dismissedAssignments", JSON.stringify(dismissed));
    }
}

// 获取所有作业
export function getAllAssignments() {
    const raw = localStorage.getItem(ASSIGNMENTS_KEY);
    return raw ? JSON.parse(raw) : [];
}

// 存储 assignment 到 localStorage
export const addAssignment = (assignment) => {
    const existing = JSON.parse(localStorage.getItem('assignments') || '[]');
    existing.push(assignment);
    localStorage.setItem('assignments', JSON.stringify(existing));
};

// 获取所有 assignment
export const getAssignments = () => {
    return JSON.parse(localStorage.getItem('assignments') || '[]');
};

// 清除所有作业（调试用）
export function clearAssignments() {
    localStorage.removeItem(ASSIGNMENTS_KEY);
}