import React from 'react';
import Main from './Main';

const TakeAssignment = ({ assignment, onBack, onComplete }) => {
    return (
        <Main
            data={assignment.questions}
            onBack={onBack}           // ✅ 你必须传这个 onBack
            onComplete={onComplete}  // 可选：作业完成后通知父组件
        />
    );
};

export default TakeAssignment;