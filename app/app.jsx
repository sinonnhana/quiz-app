import React from 'react';
import { render } from 'react-dom';
import Login from './components/Login';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import { getCurrentUser, getCurrentUserObject, initDefaultUsers } from './utils/userManager';
import './styles/app.css';

// 初始化默认用户
initDefaultUsers();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: !!getCurrentUser()
        };
        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
    }

    handleLoginSuccess() {
        this.setState({ loggedIn: true });
    }

    render() {
        if (!this.state.loggedIn) {
            return <Login onLoginSuccess={this.handleLoginSuccess} />;
        }

        const user = getCurrentUserObject();

        if (user.role === 'teacher') {
            return <TeacherDashboard teacher={user} />;
        } else {
            return <StudentDashboard student={user} />;
        }
    }
}

render(<App />, document.getElementById('react-container'));