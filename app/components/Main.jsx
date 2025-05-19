// app/components/Main.jsx
import React from 'react';
import Answers from 'Answers';
import Popup from 'Popup';
import Footer from 'Footer';
import Review from 'Review';

class Main extends React.Component {
    constructor(props) {
        super(props);
        const data = props.data || [];

        this.state = {
            nr: 0,
            total: data.length,
            showButton: false,
            questionAnswered: false,
            score: 0,
            displayPopup: 'flex',
            answers: [],
            timeLeft: 20,
            timer: null,
            reviewMode: false,
            userAnswers: [],
        };

        this.nextQuestion = this.nextQuestion.bind(this);
        this.handleShowButton = this.handleShowButton.bind(this);
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
    }

    pushData(nr) {
        const data = this.props.data;
        this.setState({
            question: data[nr].question,
            answers: [...data[nr].answers],
            correct: data[nr].correct,
            nr: this.state.nr + 1
        });

        clearInterval(this.state.timer);
        const timer = setInterval(() => {
            this.setState(prevState => {
                if (prevState.timeLeft <= 1) {
                    clearInterval(this.state.timer);
                    if (!this.state.questionAnswered) {
                        this.setState({
                            questionAnswered: true,
                            showButton: false
                        });
                        setTimeout(this.nextQuestion, 1000);
                    }
                    return { timeLeft: 0 };
                }
                return { timeLeft: prevState.timeLeft - 1 };
            });
        }, 1000);

        this.setState({ timer, timeLeft: 20 });
    }

    nextQuestion() {
        clearInterval(this.state.timer);
        const { nr, total } = this.state;
        if (nr === total) {
            this.setState({ reviewMode: true });
        } else {
            this.pushData(nr);
            this.setState({
                showButton: false,
                questionAnswered: false
            });
        }
    }

    handleShowButton(selectedAnswer) {
        clearInterval(this.state.timer);
        this.setState(prevState => ({
            showButton: true,
            questionAnswered: true,
            userAnswers: [...prevState.userAnswers, selectedAnswer]
        }));
    }

    handleStartQuiz() {
        this.setState({
            displayPopup: 'none',
            nr: 0,
            score: 0,
            showButton: false,
            questionAnswered: false,
            reviewMode: false,
            userAnswers: [],
            timeLeft: 20
        }, () => {
            this.pushData(0);
        });
    }

    handleIncreaseScore() {
        this.setState(prevState => ({
            score: prevState.score + 1
        }));
    }

    render() {
        const data = this.props.data || [];
        const { nr, total, question, answers, correct, showButton, questionAnswered, displayPopup, score } = this.state;

        if (this.state.reviewMode) {
            return (
                <Review
                    data={data}
                    userAnswers={this.state.userAnswers}
                    score={this.state.score}
                    onRestart={this.handleStartQuiz}
                    onExit={this.props.onBack}  // ✅ 新增
                />
            );
        }

        return (
            <div className="container">
                <Popup style={{ display: displayPopup }} score={score} total={total} startQuiz={this.handleStartQuiz} />
                <div className="row">
                    <div className="col-lg-10 col-lg-offset-1">
                        <div id="question">
                            <h4>Question {nr}/{total}</h4>
                            <p>{question}</p>
                            <p className={this.state.timeLeft <= 5 ? 'timer danger' : 'timer'}>
                                <strong>Time Left: {this.state.timeLeft}s</strong>
                            </p>
                        </div>
                        <Answers answers={answers} correct={correct} showButton={this.handleShowButton} isAnswered={questionAnswered} increaseScore={this.handleIncreaseScore} />
                        <div id="submit">
                            {showButton ? <button className="fancy-btn" onClick={this.nextQuestion}>{nr === total ? 'Finish quiz' : 'Next question'}</button> : null}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Main;