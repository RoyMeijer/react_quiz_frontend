import React from 'react';
import roundService from '../../providers/quiz-round-service';
import {notify} from 'react-notify-toast';
import {Redirect} from 'react-router-dom';

export class ChooseQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_question: '',
            questions: [],
            redirect: false
        };
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.stopQuestion = this.stopQuestion.bind(this);
    }

    componentDidMount() {
        this.refreshQuestions();
    }

    refreshQuestions() {
        let response = roundService.getQuestions(this.props.quiz._id, this.props.round);
        response.then(response => {
            return response.result.json();
        })
            .then(data => {
                this.setState({questions: data.questions});
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        let response = roundService.saveQuestion(this.props.quiz._id, this.props.round, this.state.selected_question);
        response.then((response, err) => {
            return response.result.json();
        }).then((data) => {
            this.props.connection.emit('SendQuestion');
            notify.show("question send to participants");
        }).catch((err) => {
            console.log(err);
        });
    }

    handleQuestionChange(event) {
        this.state.questions.find((question, i) => {
            if (question.question == event.target.value) {
                this.setState({selected_question: this.state.questions[i]});
                return true; // stop searching
            }
        });
    }

    stopQuestion(event) {
        event.preventDefault();
        this.setState({redirect: true});
        this.props.connection.emit('CloseQuestion', {
            round_id: this.props.round,
            questionProgress: this.props.questionProgress
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/quizmaster/answers'/>;
        }

        return (
            <div className="container">
                <h1>Selecteer een vraag</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="col-md-6 col-md-offset-3">
                        <select id="select" value={this.state.value} onChange={this.handleQuestionChange}>
                            <option> -- selecteer een optie --</option>
                            {
                                this.state.questions.map((item, idx) => {
                                    return (<option name="question" value={item.question} key={idx}>{item.question}</option>);
                                })
                            }
                        </select>
                    </div>
                    <div className="col-md-2 col-md-offset-4">
                        <button className="btn menu-button" id="start" name="start">start</button>
                    </div>
                </form>
                <div className="col-md-2">
                    <button className="btn menu-button" onClick={this.stopQuestion}>Stop</button>
                </div>
            </div>
        );
    }
}
