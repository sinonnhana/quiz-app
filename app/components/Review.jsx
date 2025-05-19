import React from 'react';

const Review = ({ data, userAnswers, score, onRestart }) => {
    return (
        <div className="review-container">
            {/* 顶部栏 */}
            <div className="review-header">
                <h3>You scored {score} / {data.length}</h3>
                <button onClick={onRestart}>Restart</button>
            </div>

            {/* 每一道题的回顾 */}
            {data.map((item, index) => {
                const userChoice = userAnswers[index];
                const correct = item.correct;

                return (
                    <div key={index} className="review-question">
                        <p>Q{index + 1}: {item.question}</p>
                        <ul className="review-options">
                            {item.answers.map((ans, i) => {
                                const idx = i + 1;
                                const isUser = userChoice === idx;
                                const isCorrect = correct === idx;

                                let optionClass = 'review-option';
                                if (isCorrect) optionClass += ' correct';
                                if (isUser && !isCorrect) optionClass += ' user-wrong';
                                if (isUser) optionClass += ' user';

                                return (
                                    <li key={i} className={optionClass}>
                                        {ans}
                                        {isCorrect && <span className="badge badge-correct">Correct</span>}
                                        {isUser && !isCorrect && <span className="badge badge-wrong">Your choice</span>}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default Review;