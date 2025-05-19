// userManager.js - 用户管理工具（本地 localStorage 实现）

const USERS_KEY = 'quizAppUsers';
const CURRENT_USER_KEY = 'quizAppCurrentUser';

//  预设用户列表（包含学生和老师）
const PRESET_USERS = [
    {
        username: 'alice',
        password: '1234',
        role: 'teacher',
        history: [],
        submissions: [],
        wrongQuestions: [],
        favorites: []
    },
    {
        username: 'bob',
        password: '1234',
        role: 'student',
        history: [],
        submissions: [],
        wrongQuestions: [],
        favorites: []
    },
    {
        username: 'carol',
        password: '1234',
        role: 'student',
        history: [],
        submissions: [],
        wrongQuestions: [],
        favorites: []
    }
];

//  初始化默认用户，只执行一次（在 app.jsx 中调用）
export function initDefaultUsers() {
    if (!localStorage.getItem(USERS_KEY)) {
        localStorage.setItem(USERS_KEY, JSON.stringify(PRESET_USERS));
    }
}

//  获取所有用户（数组）
export function getAllUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

//  保存所有用户（更新 localStorage）
export function saveAllUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

//  登录函数
export function loginUser(username, password) {
    const users = getAllUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return { success: false, message: 'Invalid username or password.' };
    }
    localStorage.setItem(CURRENT_USER_KEY, username);
    return { success: true };
}

//  登出函数
export function logoutUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
}

//  获取当前登录用户名
export function getCurrentUser() {
    return localStorage.getItem(CURRENT_USER_KEY);
}

//  获取当前用户完整对象
export function getCurrentUserObject() {
    const username = getCurrentUser();
    if (!username) return null;
    const users = getAllUsers();
    return users.find(u => u.username === username);
}

//  保存一次答题结果（用于学生完成作业）
export function saveResultToUser(score, total, assignmentId, answers) {
    const username = getCurrentUser();
    if (!username) return;

    const users = getAllUsers();
    const index = users.findIndex(u => u.username === username);
    if (index === -1) return;

    users[index].submissions.push({
        assignmentId,
        score,
        total,
        answers,
        completedAt: new Date().toISOString()
    });

    saveAllUsers(users);
}