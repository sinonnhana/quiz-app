import React from 'react';

class Answers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classNames: ['', '', '', '']
        };

        this.checkAnswer = this.checkAnswer.bind(this);
    }

    checkAnswer(e) {
        const { isAnswered, correct, increaseScore, showButton } = this.props;

        if (!isAnswered) {
            const answer = Number(e.currentTarget.dataset.id);
            const updatedClassNames = [...this.state.classNames];

            if (answer === correct) {
                updatedClassNames[answer - 1] = 'right';
                increaseScore();
            } else {
                updatedClassNames[answer - 1] = 'wrong';
            }

            this.setState({ classNames: updatedClassNames });
            showButton(answer);  // 通知 Main
        }
    }

    // ✅ 使用 componentDidUpdate 监测题目变化并重置按钮状态
    componentDidUpdate(prevProps) {
        if (prevProps.answers !== this.props.answers) {
            this.setState({ classNames: ['', '', '', ''] });
        }
    }

    render() {
        const { answers } = this.props;
        const { classNames } = this.state;

        return (
            <div id="answers">
                <ul>
                    <li onClick={this.checkAnswer} className={classNames[0]} data-id="1"><span>A</span> <p>{answers[0]}</p></li>
                    <li onClick={this.checkAnswer} className={classNames[1]} data-id="2"><span>B</span> <p>{answers[1]}</p></li>
                    <li onClick={this.checkAnswer} className={classNames[2]} data-id="3"><span>C</span> <p>{answers[2]}</p></li>
                    <li onClick={this.checkAnswer} className={classNames[3]} data-id="4"><span>D</span> <p>{answers[3]}</p></li>
                </ul>
            </div>
        );
    }
}

export default Answers;