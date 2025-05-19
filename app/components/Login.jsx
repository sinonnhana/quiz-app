import React, { useState } from 'react';
import { getAllUsers, loginUser } from '../utils/userManager';

const Login = ({ onLoginSuccess }) => {
    const users = getAllUsers();
    const [username, setUsername] = useState((users.length > 0 ? users[0].username : ''));
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        const result = loginUser(username, password);
        if (result.success) {
            onLoginSuccess(); // 通知 app.jsx 登录成功
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>

            <label>Username</label>
            <select value={username} onChange={e => setUsername(e.target.value)}>
                {users.map((user, i) => (
                    <option key={i} value={user.username}>
                        {user.username} ({user.role})
                    </option>
                ))}
            </select>

            <label>Password</label>
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
            />

            {error && <p>{error}</p>}

            <button onClick={handleSubmit}>Login</button>
        </div>
    );
};

export default Login;