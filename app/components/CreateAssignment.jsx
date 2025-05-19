// app/components/CreateAssignment.jsx

import React, { useState } from 'react';
import { addAssignment } from '../utils/assignmentManager';

const CreateAssignment = ({ onBack }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctIndex, setCorrectIndex] = useState(0);

    const handleOptionChange = (value, idx) => {
        const newOptions = [...options];
        newOptions[idx] = value;
        setOptions(newOptions);
    };

    const handleAddQuestion = () => {
        if (!currentQuestion || options.some(opt => opt === '')) {
            alert("Please complete the question and all options.");
            return;
        }

        const newQuestion = {
            question: currentQuestion,
            answers: options,
            correct: correctIndex + 1  // 使用 1-based 索引
        };

        setQuestions([...questions, newQuestion]);
        setCurrentQuestion('');
        setOptions(['', '', '', '']);
        setCorrectIndex(0);
    };

    const handleSaveAssignment = () => {
        if (questions.length === 0) {
            alert("No questions added yet!");
            return;
        }

        const assignment = {
            id: Date.now(),
            title: `Assignment ${Date.now()}`,
            questions
        };

        addAssignment(assignment);
        alert("Assignment saved!");
        setQuestions([]);

        if (onBack) {
            onBack();  // 保存完成后返回
        }
    };

    return (
        <div className="create-assignment-container">
            <h2>Create Assignment</h2>
            <button onClick={onBack} className="logout-btn" style={{marginBottom: 20}}>
                ← Back
            </button>
            <label>Question</label>
            <textarea
                value={currentQuestion}
                onChange={e => setCurrentQuestion(e.target.value)}
                style={{width: '100%', marginBottom: 10}}
            />

            <label>Options</label>
            {options.map((opt, idx) => (
                <div key={idx} style={{marginBottom: 6}}>
                    <input
                        type="text"
                        value={opt}
                        onChange={e => handleOptionChange(e.target.value, idx)}
                        style={{width: '80%'}}
                    />
                    <label style={{marginLeft: 10}}>
                        <input
                            type="radio"
                            name="correct"
                            checked={correctIndex === idx}
                            onChange={() => setCorrectIndex(idx)}
                        /> Correct
                    </label>
                </div>
            ))}

            <button onClick={handleAddQuestion} style={{marginTop: 10}}>Add Question</button>

            <hr/>
            <h4>{questions.length} Questions added</h4>
            <button className="fancy-btn" onClick={handleSaveAssignment}>Save Assignment</button>
        </div>
    );
};

export default CreateAssignment;