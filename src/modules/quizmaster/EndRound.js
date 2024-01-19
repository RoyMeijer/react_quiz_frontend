import React from 'react';
import {notify} from 'react-notify-toast';
import {Redirect} from 'react-router-dom';
import quizService from "../../providers/quiz-event-service";

export class EndRound extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
        this.nextRound = this.nextRound.bind(this);
        this.endQuiz = this.endQuiz.bind(this);
    }

    componentDidMount() {

        const endRound = quizService.endRound(this.props.quiz._id, this.props.roundId);
        endRound.then((data) => {
            if (!data.error) {
                this.props.resetQuestionProgress();
            } else {
                notify.show('Something went wrong');
            }
        });
    }

    endQuiz() {
        notify.show('quiz ended');
        this.props.connection.emit('EndQuiz');
    }

    nextRound() {
        notify.show('next round started');
        this.props.resetQuestionProgress();
        this.setState({
            redirect: true
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/quizmaster/categories'/>;
        }

        return (
            <div>
                <button onClick={this.endQuiz} type="button" className="btn menu-button">
                    End Quiz
                </button>
                <button onClick={this.nextRound} type="button" className="btn menu-button">
                    Next Round
                </button>
            </div>
        );
    }
}